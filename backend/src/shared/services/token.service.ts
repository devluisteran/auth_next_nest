import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

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

    decodeToken(token: string){
        return jwt.decode(token);
    }
}