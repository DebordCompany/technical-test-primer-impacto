import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceController } from './get-balance.controller';
import { GetBalanceService } from '../../application/getBalance/get-balance.service';

describe('GetBalanceController', () => {
  let controller: GetBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetBalanceController],
      providers: [GetBalanceService],
    }).compile();

    controller = module.get<GetBalanceController>(GetBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
