import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

interface UserService {
  getPublicContent(): Promise<any>;
  getUserBoard(): Promise<any>;
  getModeratorBoard(): Promise<any>;
  getAdminBoard(): Promise<any>;
}

const createUserService = (): UserService => {
  const getPublicContent = (): Promise<any> => {
    return axios.get(API_URL + 'all');
  };

  const getUserBoard = (): Promise<any> => {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  };

  const getModeratorBoard = (): Promise<any> => {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  };

  const getAdminBoard = (): Promise<any> => {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  };

  return {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
  };
};

export default createUserService();
