import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthModule } from './modules/health/health.module';
import { SaveReeDataService } from './console/cron/balance/application/save-ree-data/save-ree-data.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvKeyEnum, getEnv } from './modules/shared/infrastructure/helpers/getEnv';
import { Balance } from './modules/shared/domain/entities/balance.entity';
import { BalanceModule } from './modules/balance/balance.module';
import { CronBalanceModule } from './console/cron/balance/cron-balance.module';
import { InitialChargeDataService } from './console/cron/balance/application/inital-charge-data/initial-charge-data.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnv(EnvKeyEnum.POSTGRES_HOST),
      port: 5432,
      username: getEnv(EnvKeyEnum.POSTGRES_USER),
      password: getEnv(EnvKeyEnum.POSTGRES_PASSWORD),
      database: getEnv(EnvKeyEnum.POSTGRES_DB),
      entities: [Balance],
      synchronize: true,

    }),
    TypeOrmModule.forFeature([Balance]),
    ScheduleModule.forRoot(),
    HealthModule,
    BalanceModule,
    CronBalanceModule
  ],
  controllers: [AppController],
  providers: [InitialChargeDataService]
})
export class AppModule { }
