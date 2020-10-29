import { Categoria } from './interfaces/categoria.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
	constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) { }

	async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
		

	}
}
