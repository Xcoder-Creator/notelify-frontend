import axios from "axios";

/**
 * The axios instance
 */
const api = axios.create({
    baseURL: "/api",
    withCredentials: true, // if you need cookies
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;