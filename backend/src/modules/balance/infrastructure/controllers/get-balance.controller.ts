import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { GetBalanceService } from '../../application/getBalance/get-balance.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetBalanceDto } from '../../application/getBalance/get-balance.dto';

@Controller('balance')
@ApiTags('balance')
export class GetBalanceController {
  constructor(private readonly balanceService: GetBalanceService) { }

  @Get()
  @ApiOperation({ summary: 'Get balance data for a given date range' })
  async getBalance(
    @Query() query: GetBalanceDto
  ) {
    try {
      return await this.balanceService.getBalance(query);

    } catch (error) {
      throw new HttpException({
        status: "error",
        message: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
