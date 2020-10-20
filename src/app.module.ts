import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

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
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
