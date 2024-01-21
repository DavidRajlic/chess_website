import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import { profile } from "../api";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [user, setUser] = useState({});
    const [ranks, setRanks] = useState([{ rank: 0, date: "" }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await profile(location.state.username);
                const { message, user } = response;
                if (message === "Profile found") {
                    setUser(user);
                    setRanks(user.ranks);
                } else {
                    setMessage("Profile not found");
                }
            } catch (error) {
                setMessage(`Profile failed: ${error.message}`);
            }
        };
        fetchData();
    });

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: hasWhiteSpace(name)
                ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
                : `${name.split(" ")[0][0]}${name.split(" ")[0][1]}`,
        };
    }

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function hasWhiteSpace(s: string) {
        return s.indexOf(" ") >= 0;
    }

    const handleLogout = async () => {
        try {
            navigate("/");
            setMessage("Logout successful");
        } catch (error) {
            setMessage(`Logout failed: ${error.message}`);
        }
    };

    const handleBack = async () => {
        try {
            navigate("/welcome", {
                state: { username: location.state.username },
            });
            setMessage("Back successful");
        } catch (error) {
            setMessage(`Back failed: ${error.message}`);
        }
    };

    const handleUsernameChange = async () => {
        try {
            navigate("/change_username", {
                state: { username: location.state.username },
            });
            setMessage("Username change successful");
        } catch (error) {
            setMessage(`Username change failed: ${error.message}`);
        }
    };

    const handlePasswordChange = async () => {
        try {
            navigate("/change_password", {
                state: { username: location.state.username },
            });
            setMessage("Password change successful");
        } catch (error) {
            setMessage(`Password change failed: ${error.message}`);
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
                    <div className="avatar">
                        <Avatar {...stringAvatar(location.state.username)} />
                    </div>
                    <h2>{user.username}</h2>
                    <h2>Trenutni rank: {ranks[ranks.length - 1].rank}</h2>
                    <ResponsiveContainer width="100%" height="50%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={ranks}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="rank"
                                stroke="#B3B5BD"
                                fill="#5F8CDD"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                    <h2>Zmage: {user.wins}</h2>
                    <h2>Porazi: {user.losses}</h2>
                    <h2>Neodločeno: {user.draws}</h2>
                    <button onClick={handleBack}> Nazaj </button>
                    <button onClick={handleLogout}> Odjava </button>
                    <button onClick={handleUsernameChange}>
                        {" "}
                        Spremeni uporabniško ime{" "}
                    </button>
                    <button onClick={handlePasswordChange}>
                        {" "}
                        Spremeni geslo{" "}
                    </button>
                    <br />
                    <p>{message}</p>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default Profile;
