import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchPublicContent = async () => {
            try {
                const response = await UserService.getPublicContent();
                setContent(response.data);
            } catch (error: any) {
                setContent(
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString()
                );
            }
        };

        fetchPublicContent();
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Home;
