import { IsNotEmpty } from "class-validator";

export class AtualizarJogadorDto {
	@IsNotEmpty()
	readonly telefone: string;
	
	@IsNotEmpty()
	readonly nome: string;
}