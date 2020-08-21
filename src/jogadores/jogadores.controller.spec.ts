import { Test, TestingModule } from '@nestjs/testing';
import { JogadoresController } from './jogadores.controller';

describe('Jogadores Controller', () => {
  let controller: JogadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JogadoresController],
    }).compile();

    controller = module.get<JogadoresController>(JogadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
