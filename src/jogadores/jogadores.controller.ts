import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Controller, Post, Body, Get, Query, Delete, Param } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
	constructor(private readonly jogadoresService: JogadoresService) { }

	@Post()
	async criarAtualizarJogador(
		@Body() criarJogadorDto: CriarJogadorDto): Promise<void> {
		await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
	}

	@Get()
	async consultarJogadores(
		@Query('email') email: string
	): Promise<Jogador[] | Jogador> {

		return email ?
			this.jogadoresService.consultarJogadorPeloEmail(email)
			:
			this.jogadoresService.consultarTodosJogadores();
	}
	
	@Delete()
	async deletarJogador(@Query("email") email: string): Promise<void>{
		await this.jogadoresService.deletarJogador(email)
	}
}
