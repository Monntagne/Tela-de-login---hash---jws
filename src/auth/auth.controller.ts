import { Controller, Body, Post, Get, UseGuards, Req, Res, UnauthorizedException } from '@nestjs/common';
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
    @Post('session-login')
    async sessionLogin(@Body() loginDto: LoginDto, @Req() req){
        const usuario = await this.authService.loginComSession(loginDto)
        req.session.usuario = usuario
        return{
            mensagem:'login feito com sucesso',
            usuario
        }
    }

    @Get('session-area')
    sessionArea(@Req() req){
        if(!req.session.usuario){
            throw new UnauthorizedException('Sesão nao encontrada')
        }
        return{
            mensagem:'acessou área protegida',
            usuario: req.session.usuario
        }
    }





@Post('session-logout')
sessionLogout(@Req() req){
    req.session.destroy()
    return{
        mensagem:'Logout feito'
    }
}

}
