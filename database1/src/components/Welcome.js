import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../api";

function Welcome() {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState("");
    const username = location.state.username;

    const handleProfile = async () => {
        try {
            navigate("/profile", {
                state: { username: username },
            });
        } catch (error) {
            setMessage(`Profile failed: ${error.message}`);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
            setMessage("Logout successful");
        } catch (error) {
            setMessage(`Logout failed: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <br />
                <br />
                <br />
                <div className="col-md-3"></div>
                <div className="col-md-6 main">
                    <h1> Dobrodošli na Chess website {username}! </h1>
                    <br />
                    <button onClick={handleProfile}> Moj profil </button>
                    <button onClick={handleLogout}> Odjava </button>
                    <br />
                    <p>{message}</p>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default Welcome;
