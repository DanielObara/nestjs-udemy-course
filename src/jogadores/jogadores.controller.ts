import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
	constructor(private readonly jogadoresService: JogadoresService) { }

	@Post()
	async criarAtualizarJogador(

		@Body() criarJogadorDto: CriarJogadorDto) {
		await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)

	}


}
