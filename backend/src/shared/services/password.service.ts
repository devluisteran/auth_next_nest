import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";


@Injectable()
export class PasswordService{

    private readonly saltRounds = 10;

    async hashPassword(password: string){
        const hashPassword = await bcrypt.hash(password, this.saltRounds);

        return hashPassword;
    }

    async comparePassword(password: string, hashPassword: string){
        return  await bcrypt.compare(password,hashPassword);
    }
}