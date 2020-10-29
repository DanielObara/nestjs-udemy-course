import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller';

describe('Categorias Controller', () => {
  let controller: CategoriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
