import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthModule } from './modules/health/health.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [HealthModule, BalanceModule],
  controllers: [AppController],
})
export class AppModule { }
