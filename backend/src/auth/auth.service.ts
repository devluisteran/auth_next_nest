import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from 'src/shared/services/password.service';
import { LoginDto } from './dto/login.dto';

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

    async login(loginDto: LoginDto){
        const userFound = await this.usersService.findByEmail(loginDto.email);
        if(!userFound){
            throw new UnauthorizedException("El correo no es válido");
        }

        const validPassword = await this.passwordService.comparePassword(loginDto.password,userFound.password);

        if(!validPassword){
            throw new UnauthorizedException("Credenciales no válidas");
        }

        return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            role: userFound.role
        }
    }
}
