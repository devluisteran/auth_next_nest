import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from 'src/shared/services/password.service';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly passwordService: PasswordService){

    }
    async register(registerDto: RegisterDto){
        const userFound = await this.usersService.findByEmailIncludingDeleted(registerDto.email);
        
        if(userFound){
            throw new BadRequestException("El correo ya está en uso");
        }
        const hashPassword = await this.passwordService.hashPassword(registerDto.password);
        registerDto.password = hashPassword;
        return await this.usersService.create(registerDto);
    }

    login(){

    }
}
