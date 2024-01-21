import axios from "axios";

const API_URL = "http://localhost:8080";

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const profile = async (username) => {
    try {
        const response = await axios.get(
            `${API_URL}/profile?username=${username}`
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const changeUsername = async (username, newUsername) => {
    try {
        const response = await axios.put(`${API_URL}/change_username`, {
            username,
            newUsername,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const changePassword = async (username, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/change_password`, {
            username,
            newPassword,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// export const logout = async () => {
//     try {
//         const response = await axios.post(`${API_URL}/logout`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };
