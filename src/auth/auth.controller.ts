import { Controller, Body, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    login(@Body() loginDto:LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('publica')
    rotaPublica(){
        return {
            mensagem: 'Esta é uma rota pública!'
        }
    }

    @UseGuards(AuthGuard)
    @Get('privada')
    rotaPrivada(@Req() req){
        return {
            mensagem: 'Token válido! Bem-vindo(a)',
            usuario: req.user
        }
    }
}
