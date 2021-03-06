import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasService } from './categorias/categorias.service';

@Module({
  imports: [
    MongooseModule
      .forRoot('mongodb+srv://admin:admin@cluster0.xlozl.mongodb.net/test?retryWrites=true&w=majority',
        { 
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }
      ),
    JogadoresModule,
    CategoriasModule],
})
export class AppModule { }
