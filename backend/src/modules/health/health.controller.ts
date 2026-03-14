import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@Controller('health')
@ApiTags('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthService
    ) { }
    @Get()
    @ApiOperation({ summary: 'Get health status of the system' })
    getHealth() {
        return this.healthService.getHealthStatus()
    }
}
