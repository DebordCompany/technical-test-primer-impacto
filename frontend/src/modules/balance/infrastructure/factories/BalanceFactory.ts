import { GetReeDataUseCase } from "../../application/getReeData/GetReeDataUseCase";
import { ApiReaderRepository } from "../repositories/ApiReaderRepository";

export class BalanceFactory {
    public static getReeBalanceFactory() {
        const repository = new ApiReaderRepository()
        return new GetReeDataUseCase(repository)
    }
}