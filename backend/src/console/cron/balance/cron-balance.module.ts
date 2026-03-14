import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/modules/shared/domain/entities/balance.entity';
import { SaveReeDataService } from './application/save-ree-data/save-ree-data.service';

@Module({
    imports: [TypeOrmModule.forFeature([Balance])],
    providers: [SaveReeDataService],
    exports: [SaveReeDataService],
})
export class CronBalanceModule { }
