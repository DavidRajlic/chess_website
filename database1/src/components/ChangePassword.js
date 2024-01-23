import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { changePassword, logout } from "../api";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            await changePassword(location.state.username, newPassword);
            setMessage("Changing password successful");
            await logout();
            navigate("/");
        } catch (error) {
            setMessage(`Changing password failed: ${error.message}`);
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
                    <form onSubmit={handlePasswordChange}>
                        <h2> Sprememba uporabniškega gesla </h2>
                        <input
                            className="box"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Novo uporabniško geslo"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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

export default ChangePassword;
