import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(signupData);
            setMessage("Signup successful");
            navigate("/welcome", { state: { username: signupData.username } });
        } catch (error) {
            setMessage(`Signup failed: ${error.message}`);
        }
    };

    return (
        <div class="container">
            <div class="row">
                <br />
                <br />
                <br />
                <div class="col-md-3"></div>
                <div class="col-md-6 main">
                    <form onSubmit={handleSignup}>
                        <h1> Registracija </h1>
                        <input
                            type="text"
                            placeholder="Uporabniško ime"
                            value={signupData.username}
                            onChange={(e) =>
                                setSignupData({
                                    ...signupData,
                                    username: e.target.value,
                                })
                            }
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={signupData.password}
                            onChange={(e) =>
                                setSignupData({
                                    ...signupData,
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
                <div class="col-md-3"></div>
            </div>
        </div>
    );
}

export default Signup;
