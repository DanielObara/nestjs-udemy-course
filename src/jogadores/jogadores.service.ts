import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

// Com essa notation sabemos que ele será agora uma provider 
@Injectable()
export class JogadoresService {
	constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

	async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
		const { email } = criaJogadorDto;

		const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

		if (jogadorEncontrado)
			throw new BadRequestException(`O jogador com o e-mail ${email} já foi utilizado`)

		const jogador = new this.jogadorModel(criaJogadorDto);

		return await jogador.save()

	}

	async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<Jogador> {
		
		const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com ${_id} não foi encontrado`)
		} 

		const atualizado =
			await this.jogadorModel.findOneAndUpdate({ _id: _id }, { $set: atualizarJogadorDto }).exec();

		return atualizado;	
	}

	async consultarTodosJogadores(): Promise<Jogador[]> {
		return await this.jogadorModel.find().exec();
	}

	async consultarJogadorPeloId(_id: string): Promise<Jogador> {
		const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com id não ${_id} localizado`)
		}
		return jogadorEncontrado;
	}

	async deletarJogador(_id: string): Promise<any> {
		const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com id não ${_id} localizado`)
		}
		
		return await this.jogadorModel.deleteOne({ _id }).exec();
	}

}
