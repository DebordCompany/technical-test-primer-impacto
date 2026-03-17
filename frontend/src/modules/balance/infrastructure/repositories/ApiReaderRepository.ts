import { EnvKeyEnum, getEnv } from "../../../shared/infrastructure/helpers/getEnv";
import type { BalanceRepository } from "../../domain/repositories/BalanceRepository";
import type { ApiRequestData } from "../../domain/types/ReeTypes";

export class ApiReaderRepository implements BalanceRepository {
    public static getInstance(): ApiReaderRepository {
        return new ApiReaderRepository
    }

    async getReeData({ startDate, endDate }: ApiRequestData) {
        const url = `${getEnv(EnvKeyEnum.VITE_BACK_API)}/balance?start_date=${startDate}&end_date=${endDate}`;
        return await fetch(url);
    }
}