import axios from "../lib/axios";
import { RegisterPayload,ApiResponse, LoginPayload } from "../types/auth";


export const serviceAuth = {

    register: async (payload: RegisterPayload): Promise<ApiResponse<RegisterPayload>>=>{
        const response = await axios.post<ApiResponse<RegisterPayload>>("/auth/register",payload);

        return response.data;
    },
    login: async (payload: LoginPayload): Promise<ApiResponse<LoginPayload>>=>{
        const response = await axios.post<ApiResponse<LoginPayload>>("auth/login",payload);

        return response.data;
    },
    logout: () : void=>{
        serviceAuth.removeToken();
        if(typeof window !== "undefined"){
            window.location.href = "/auth/login"; 
        }
    },
    setToken: (token : string) : void=>{
        if(typeof window !== "undefined"){
            localStorage.setItem("token", token);

        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    removeToken: () : void =>{
        if(typeof window !== "undefined"){
            localStorage.removeItem("token");
        }

        delete axios.defaults.headers.common["Authorization"];
    },
    getToken: () : string | null =>{
        if(typeof window !== "undefined"){
            return localStorage.getItem("token");
        }

        return null;
    }

    

}