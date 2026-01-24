import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import path from "path";
import { Response } from "express";

@Injectable()
export class TokenService{

    private readonly jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

    generateToken(payload: any) {

        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }

    refreshToken(payload: any){
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }

    verifyToken(token: string){
        const secret = this.jwtSecret;

        try{
            const decoded = jwt.verify(token, secret);
            return decoded;
        }catch(error){
            return null;
        }
    }

    setTokenCookies(response: any, token: string){
        response.cookie('access_token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
            path:"/"
        });

        return response;
    }

    decodeToken(token: string){
        return jwt.decode(token);
    }
}