import { Injectable } from '@nestjs/common';
import { GetBalanceDto } from './get-balance.dto';
import { Between, Repository } from 'typeorm';
import { Balance } from 'src/modules/shared/domain/entities/balance.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetBalanceService {
    constructor(
        @InjectRepository(Balance)
        private readonly balanceRepository: Repository<Balance>
    ) { }
    async getBalance(query: GetBalanceDto) {
        const { start_date, end_date } = query;
        const startDataTransformed = new Date(`${start_date}T00:00:00`);
        const endDataTransformed = new Date(`${end_date}T23:59:59`);
        console.log(startDataTransformed, endDataTransformed);
        const data = await this.balanceRepository.find({
            where: {
                datetime: Between(startDataTransformed, endDataTransformed)
            },
            order: {
                datetime: 'ASC'
            }
        })
        console.log(data);
        return { status: "success", data: data };
    }
}