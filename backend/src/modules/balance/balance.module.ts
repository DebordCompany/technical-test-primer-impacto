import { Module } from '@nestjs/common';
import { GetBalanceService } from './application/getBalance/getBalance.service';
import { GetBalanceController } from './infrastructure/controllers/getBalance.controller';

@Module({
  controllers: [GetBalanceController],
  providers: [GetBalanceService],
})
export class BalanceModule { }
