import axios from "../lib/axios";
import { RegisterPayload,ApiResponse } from "../types/auth";


export const serviceAuth = {

    register: async (payload: RegisterPayload): Promise<ApiResponse<RegisterPayload>>=>{
        const response = await axios.post<ApiResponse<RegisterPayload>>("/auth/register",payload);

        return response.data;
    },

    

}