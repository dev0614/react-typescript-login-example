import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardModerator = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchModeratorBoard = async () => {
            try {
                const response = await UserService.getModeratorBoard();
                setContent(response.data);
            } catch (error: any) {
                setContent(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                );

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        };

        fetchModeratorBoard();
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default BoardModerator;
