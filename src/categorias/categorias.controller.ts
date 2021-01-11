import { CategoriasService } from './categorias.service';
import { Categoria } from './interfaces/categoria.interface';
import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarJogadorDto } from 'src/jogadores/dtos/atualizar-jogador.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
	constructor(private readonly categoriasService: CategoriasService) { }

	@Post()
	@UsePipes(ValidationPipe)
	async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
		return await this.categoriasService.criarCategoria(criarCategoriaDto)
	}

	@Get()
	async consultarCategorias(): Promise<Categoria[]> {
		return await this.categoriasService.consultarTodasCategorias();
	}

	@Get("/:categoria")
	async consultarCategoriaPorId(@Param("categoria") categoria: string): Promise<Categoria> {
		return await this.categoriasService.consultarCategoriaPorId(categoria);
	}

	@Put("/:categoria")
	async atualizarCategoria(
		@Body() atualizarCategoriaDto: AtualizarJogadorDto,
		@Param('categoria') categoria: string
	): Promise<void> {
		await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto)
	}
	
	@Post("/:categoria/jogadores/:idJogador")
	async atribuirCategoriaJogador(
		@Param() params: string[]): Promise<void> {
		console.log(`params: ${JSON.stringify(params)}`);
		
	}
}
