import { Module } from '@nestjs/common';
import { GetBalanceService } from './application/getBalance/get-balance.service';
import { GetBalanceController } from './infrastructure/controllers/get-balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from '../shared/domain/entities/balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  controllers: [GetBalanceController],
  providers: [GetBalanceService],
})
export class BalanceModule { }
