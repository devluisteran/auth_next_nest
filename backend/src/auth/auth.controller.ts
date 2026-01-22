import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    login() {
        
    }

    @Post('register')
    async register(@Body() registerDto : RegisterDto){
        const data = await this.authService.register(registerDto);
        return data;
    }
}
