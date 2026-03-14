import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    getHealthStatus() {
        const timestamp = new Date().toISOString();
        return {
            status: 'success',
            timestamp
        }
    }
}
