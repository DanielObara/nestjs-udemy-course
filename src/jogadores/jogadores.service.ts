import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Com essa notation sabemos que ele será agora uma provider 
@Injectable()
export class JogadoresService {
	constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

	async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
		const { email } = criaJogadorDto;

		const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

		if (jogadorEncontrado)
			throw new BadRequestException(`O jogador com o e-mail ${email} já foi utilizado`)

		const jogador = new this.jogadorModel(criaJogadorDto);

		return await jogador.save()

	}

	async atualizarJogador(_id: string, criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
		
		const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com ${_id} não foi encontrado`)
		} 

		const atualizado =
			await this.jogadorModel.findOneAndUpdate({ email: criarJogadorDto.email }, { $set: criarJogadorDto }).exec();

		return atualizado;	
	}

	async consultarTodosJogadores(): Promise<Jogador[]> {
		return await this.jogadorModel.find().exec();
	}

	async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
		const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com e-mail não ${email} localizado`)
		}
		return jogadorEncontrado;
	}

	async deletarJogador(email: string): Promise<any> {
		return await this.jogadorModel.deleteOne({ email }).exec();
	}

}
