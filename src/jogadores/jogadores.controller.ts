import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
	constructor(private readonly jogadoresService: JogadoresService) { }

	@Post()
	@UsePipes(ValidationPipe)
	async criarJogador(
		@Body() criarJogadorDto: CriarJogadorDto): Promise<void> {
		await this.jogadoresService.criarJogador(criarJogadorDto)
	}

	@Put()
	@UsePipes(ValidationPipe)
	async atualizarJogador(
		@Body() criarJogadorDto: CriarJogadorDto,
		@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
		await this.jogadoresService.atualizarJogador(_id, criarJogadorDto)
	}

	@Get()
	async consultarJogadores(): Promise<Jogador[]> {
		return await this.jogadoresService.consultarTodosJogadores();
	}

	@Get('/:_id')
	async consultarJogadorePeloId(@Param('_id') _id: string): Promise<Jogador> {
		return await this.jogadoresService.consultarJogadorPeloId(_id)
	}

	@Delete('/:_id')
	async deletarJogador(@Param("_id", JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
		await this.jogadoresService.deletarJogador(_id)
	}
}
