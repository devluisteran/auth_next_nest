export interface RegisterPayload{
    name: string;
    email: string;
    password: string;
}

export interface ApiResponse<T>{
    data: T;
    message: string;
    success: boolean;
}