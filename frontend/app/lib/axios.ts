import axios from "axios";
let url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
url += "/api";
const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json"
    }
});


export default instance;