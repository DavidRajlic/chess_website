import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login() {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(loginData);
            setMessage("Login successful");
            navigate("/welcome", { state: { username: loginData.username } });
        } catch (error) {
            setMessage(`Login failed: ${error.message}`);
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
                    <form onSubmit={handleLogin}>
                        <h1> Prijava </h1>
                        <input
                            className="box"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Uporabniško ime"
                            value={loginData.username}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    username: e.target.value,
                                })
                            }
                        />
                        <br />
                        <input
                            className="box"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Geslo"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                })
                            }
                        />
                        <br />
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

export default Login;
