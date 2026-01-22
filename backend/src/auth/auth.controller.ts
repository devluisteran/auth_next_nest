import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto : RegisterDto){
        const data = await this.authService.register(registerDto);
        return data;
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(){
        return {message: "Perfil de usuario"};
    }
}
