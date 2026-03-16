import { EnvKeyEnum, getEnv } from "../../../shared/infrastructure/helpers/getEnv";

export class ApiReaderRepository {
    public static getInstance(): ApiReaderRepository {
        return new ApiReaderRepository
    }

    async getReeData(startDate?: string | null, endDate?: string | null) {
        const url = `${getEnv(EnvKeyEnum.VITE_BACK_API)}/balance?start_date=${startDate}&end_date=${endDate}`;
        const raw = await fetch(url);
        const response = await raw.json();
        return response.data;
    }
}