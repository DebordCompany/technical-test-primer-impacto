import { BalanceException } from "../../domain/exceptions/BalanceException";
import type { BalanceRepository } from "../../domain/repositories/BalanceRepository";
import type { GetReeDataDto } from "./GetReeDataDto";

export class GetReeDataUseCase {
    constructor(
        private readonly balanceRepository: BalanceRepository
    ) { }

    async execute(getReeDataDto: GetReeDataDto) {
        const response = await this.balanceRepository.getReeData({
            startDate: getReeDataDto.getStartDate(),
            endDate: getReeDataDto.getEndDate()
        })
        return await this.handleResponse(response);
    }

    async handleResponse(response: Response) {
        if (!response.ok) {
            throw BalanceException.genericError()
        }
        const data = await response.json();
        return data.data
    }
}