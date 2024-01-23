import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { changeUsername, logout } from "../api";

function ChangeUsername() {
    const [newUsername, setNewUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        try {
            await changeUsername(location.state.username, newUsername);
            setMessage("Changing username successful");
            await logout();
            navigate("/");
        } catch (error) {
            setMessage(`Changing username failed: ${error.message}`);
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
                    <form onSubmit={handleUsernameChange}>
                        <h2> Sprememba uporabniškega imena </h2>
                        <input
                            className="box"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Novo uporabniško ime"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <br />
                        <input
                            type="submit"
                            id="submitDetails"
                            name="submitDetails"
                            value="Pošlji"
                        />
                        <br />
                        {message && <p style={{ color: "red" }}>{message}</p>}
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default ChangeUsername;
