import { Module } from '@nestjs/common';
import { CategoriaSchema } from './interfaces/categoria.schema';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
	imports: [MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }])],
	controllers: [CategoriasController],
	providers: [CategoriasService]
})
export class CategoriasModule { }