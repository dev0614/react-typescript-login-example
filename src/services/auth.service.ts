import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

interface AuthService {
  login(username: string, password: string): Promise<any>;
  logout(): void;
  register(username: string, email: string, password: string): Promise<any>;
  getCurrentUser(): any;
}

const createAuthService = (): AuthService => {
  const login = async (username: string, password: string): Promise<any> => {
    const response = await axios
          .post(API_URL + "signin", {
              username,
              password
          });
      if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
  };

  const logout = (): void => {
    localStorage.removeItem("user");
  };

  const register = (username: string, email: string, password: string): Promise<any> => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  };

  const getCurrentUser = (): any => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  };

  return {
    login,
    logout,
    register,
    getCurrentUser
  };
};

export default createAuthService();
