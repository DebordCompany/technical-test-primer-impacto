import { IsIn, IsString, Matches } from "class-validator";
import { TimeTruncEnum } from "../../domain/Enums/BalanceEnum";

export class GetBalanceDto {
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
        { message: 'start_date must be in the format YYYY-MM-DDTHH:mm' })
    start_date: string;
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
        { message: 'end_date must be in the format YYYY-MM-DDTHH:mm' })
    end_date: string;
    @IsString()
    @IsIn([TimeTruncEnum.DAY, TimeTruncEnum.WEEK, TimeTruncEnum.MONTH, TimeTruncEnum.YEAR],
        { message: 'time_trunc must be one of the following values: day, week, month, year' })
    time_trunc: string;
}