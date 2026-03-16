import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { GetBalanceService } from '../../application/getBalance/get-balance.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBalanceDto } from '../../application/getBalance/get-balance.dto';

@Controller('balance')
@ApiTags('balance')
export class GetBalanceController {
  constructor(private readonly balanceService: GetBalanceService) { }

  @Get()
  @ApiOperation({ summary: 'Get balance data for a given date range' })
  @ApiQuery({
    name: 'start_date',
    required: true,
    type: String,
    description: 'Fecha de inicio (YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'end_date',
    required: true,
    type: String,
    description: 'Fecha de fin (YYYY-MM-DD)',
    example: '2024-01-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Balance consultado correctamente',
    schema: {
      example: {
        status: 'success',
        data: [
          { id: 1, datetime: '2024-01-01T01:00:00', },
          { id: 2, datetime: '2024-01-02T01:00:00', },
        ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        status: "error",
        message: "Datos de entrada inválidos"
      }
    }
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: {
      example: {
        status: "error",
        message: "Error interno del servidor"
      }
    }
  })
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
