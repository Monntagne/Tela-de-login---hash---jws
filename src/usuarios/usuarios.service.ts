import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsuariosService {
    constructor(private databaseService:DatabaseService) {}

    async criar(createUsuarioDto:CreateUsuarioDto) {
        const {nome, email, senha} = createUsuarioDto;
        const sql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES (?, ?, ?)
        `;
        await this.databaseService.query(sql, [
            nome,
            email,
            senha,
        ]);
        return {
            mensagem: "Usuário cadastrado com sucesso!"
        };
    }

}
