import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'src/modules/shared/domain/entities/balance.entity';
import { Dater } from 'src/modules/shared/infrastructure/helpers/Dater';
import { EnvKeyEnum, getEnv } from 'src/modules/shared/infrastructure/helpers/getEnv';
import { Repository } from 'typeorm';
import { EnergyRecord, ReeIncludedItem, ReeResponse } from '../../domain/types/ree-types';

@Injectable()
export class InitialChargeDataService {
    constructor(
        @InjectRepository(Balance)
        private readonly saveReeDataRepository: Repository<Balance>,
    ) { }

    async onModuleInit() {

        const needToLoadInitialData = await this.checkIfDataExists();
        if (needToLoadInitialData) return
        console.log("Loading initial data...");
        const rccData = await this.getLastYearRccData();
        await this.saveRccData(rccData);

    }
    private async getLastYearRccData(): Promise<ReeIncludedItem[]> {
        console.log("Fetching RCC data from API...");
        const now = Dater.formatToIso(new Date());
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const response = await fetch(`${getEnv(EnvKeyEnum.RCC_API)}?start_date=${Dater.formatToIso(oneYearAgo)
            }& end_date=${now}& time_trunc=day`);
        if (!response.ok) {
            console.error('Failed to fetch RCC data:', response.statusText);
        }
        const data = await response.json();
        console.log("finish fetching RCC data");

        return data.included
    }

    private async checkIfDataExists() {
        const totalData = await this.saveReeDataRepository.count()
        if (totalData > 0) {
            return true
        }
        return false
    }

    private async saveRccData(data: any) {
        const records: EnergyRecord[] = [];
        for (const item of data) {
            const groupId = item.id
            item.attributes.content.forEach(element => {
                const energyType = element.type
                element.attributes.values.forEach(eleme => {
                    records.push({
                        energy_type: energyType,
                        group_id: groupId,
                        value: eleme.value,
                        percentage: eleme.percentage,
                        datetime: eleme.datetime
                    })
                });
            });
        }

        await this.saveReeDataRepository.upsert(records, ["energy_type", "group_id", "datetime"]);
    }
}
