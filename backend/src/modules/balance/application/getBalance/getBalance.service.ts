import { Injectable } from '@nestjs/common';
import { EnvKeyEnum, getEnv } from '../../../shared/infrastructure/helpers/getEnv';
import { BalanceException } from '../../domain/exceptions/BalanceException';
import { GetBalanceDto } from './getBalance.dto';

@Injectable()
export class GetBalanceService {
    async getBalance(query: GetBalanceDto) {
        const { start_date, end_date, time_trunc } = query;
        console.log(`Fetching balance data with start_date: ${start_date}, end_date: ${end_date}, time_trunc: ${time_trunc}`);
        const url = getEnv(EnvKeyEnum.RCC_API)
        const response = await fetch(`${url}?start_date=${start_date}&end_date=${end_date}&time_trunc=${time_trunc}`);
        if (!response.ok) {
            // TODO: Handle specific status codes if needed
            throw BalanceException.failedToFetchBalanceData()
        }

        const data = await response.json();
        console.log(data)

        return { status: "success", data: data };
    }

}
