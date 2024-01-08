import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardUser = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchUserBoard = async () => {
            try {
                const response = await UserService.getUserBoard();
                setContent(response.data);
            } catch (error: any) {
                setContent(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                );
            }
        };

        fetchUserBoard();
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default BoardUser;
