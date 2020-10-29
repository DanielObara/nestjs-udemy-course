import { Evento } from './../interfaces/categoria.interface';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CriarCategoriaDto{
	
	@IsString()
	@IsNotEmpty()
	readonly categoria: string;
	
	@IsString()
	@IsNotEmpty()
	descricao: string;
	
	@IsArray()
	@ArrayMinSize(1)
	eventos: Array<Evento>
}