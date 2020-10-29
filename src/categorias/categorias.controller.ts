import { CategoriasService } from './categorias.service';
import { Categoria } from './interfaces/categoria.interface';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
	constructor(private readonly categoriasService: CategoriasService){}
	
	@Post()
	@UsePipes(ValidationPipe)
	async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{
		return await this.categoriasService.criarCategoria(criarCategoriaDto)
	}
}
