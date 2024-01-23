import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ChangeUsername from "./components/ChangeUsername";
import ChangePassword from "./components/ChangePassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/change_username"
                        element={<ChangeUsername />}
                    />
                    <Route
                        path="/change_password"
                        element={<ChangePassword />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
