export interface RegisterPayload{
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ApiResponse<T>{
    data: T;
    message: string;
    success: boolean;
}