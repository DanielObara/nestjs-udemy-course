import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Injectable, Logger } from '@nestjs/common';
import * as uuid from "uuid";

// Com essa notation sabemos que ele será agora uma provider 
@Injectable()
export class JogadoresService {
	private jogadores: Jogador[] = []

	private readonly logger = new Logger(JogadoresService.name)

	async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
		const { email } = criaJogadorDto;
		const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

		jogadorEncontrado ? await this.atualizar(jogadorEncontrado, criaJogadorDto)
		 : 
		await this.criar(criaJogadorDto);
	}

	async consultarTodosJogadores(): Promise<Jogador[]> {
		return await this.jogadores;
	}

	private criar(criaJogadorDto: CriarJogadorDto): void {

		const { nome, telefone, email } = criaJogadorDto

		const jogador: Jogador = {
			_id: uuid.v1(),
			nome,
			telefone,
			email,
			ranking: 'A',
			posicaoRanking: 1,
			urlFotoJogador: 'www.google.com.br/foto.jpg'
		};
		this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)

		this.jogadores.push(jogador)
	}

	private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto) {
		const { nome } = criarJogadorDto;

		jogadorEncontrado.nome = nome;
		return jogadorEncontrado;
	}
}
