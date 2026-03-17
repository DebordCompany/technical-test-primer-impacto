import type { ApiRequestData } from "../types/ReeTypes";

export interface BalanceRepository {
    getReeData(data: ApiRequestData): Promise<Response>;
}