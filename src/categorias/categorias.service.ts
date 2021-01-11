import { AtualizarJogadorDto } from './../jogadores/dtos/atualizar-jogador.dto';
import { Categoria } from './interfaces/categoria.interface';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Injectable()
export class CategoriasService {
	constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) { }

	async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {

		const { categoria } = criarCategoriaDto;
		const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

		if (categoriaEncontrada) throw new BadRequestException(`Categoria ${categoria} já cadastrada!`)

		const categoriaCriada = new this.categoriaModel(criarCategoriaDto)

		return await categoriaCriada.save();
	}

	async consultarTodasCategorias(): Promise<Categoria[]> {
		return await this.categoriaModel.find().exec()
	}

	async consultarCategoriaPorId(categoria: string): Promise<Categoria> {
		const categoriaEncontrada = await this.categoriaModel.findOne({categoria: categoria }).exec()
		
		if(!categoriaEncontrada){
			throw new NotFoundException(`Categoria ${categoria} não enconrtada`)
		}
		return categoriaEncontrada
	}
	
	async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarJogadorDto): Promise<void>{
		const categoriaEncontrada = await (await this.categoriaModel.findOne({categoria}).exec())
		
		 if(!categoriaEncontrada){
			 throw new NotFoundException(`Categoria ${categoria} não encontrada!`)
		 }
		 
		 await this.categoriaModel.findOneAndUpdate({categoria}, {$set: atualizarCategoriaDto}).exec()
	}
}
