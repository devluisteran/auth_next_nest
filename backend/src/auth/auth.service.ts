import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService){

    }
    async register(registerDto: RegisterDto){
        const userFound = await this.usersService.findByEmailIncludingDeleted(registerDto.email);
        
        if(userFound){
            throw new BadRequestException("El correo ya está en uso");
        }
        
        return await this.usersService.create(registerDto);
    }

    login(){

    }
}
