import { IsIn, IsString, Matches } from "class-validator";
import { TimeTruncEnum } from "../../domain/Enums/balance-enum";

export class GetBalanceDto {
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}/,
        { message: 'start_date must be in the format YYYY-MM-DDTHH:mm' })
    start_date: string;
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}/,
        { message: 'end_date must be in the format YYYY-MM-DDTHH:mm' })
    end_date: string;
}