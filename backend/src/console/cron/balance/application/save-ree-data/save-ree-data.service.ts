import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'src/modules/shared/domain/entities/balance.entity';
import { Dater } from 'src/modules/shared/infrastructure/helpers/Dater';
import { EnvKeyEnum, getEnv } from 'src/modules/shared/infrastructure/helpers/getEnv';
import { Repository } from 'typeorm';
import { EnergyRecord } from '../../domain/types/ree-types';

@Injectable()
export class SaveReeDataService {
    constructor(
        @InjectRepository(Balance)
        private readonly saveReeDataRepository: Repository<Balance>,
    ) { }
    @Interval(60 * 60 * 24 * 1000)
    async saveRccData() {
        const dataFromRee = await this.getLastDayFromRcc()
        await this.saveDataOnDatabase(dataFromRee)
    }
    private async getLastDayFromRcc() {
        console.log("Fetching RCC data from API...");
        const now = Dater.formatToIso(new Date());
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const response = await fetch(`${getEnv(EnvKeyEnum.RCC_API)}?start_date=${Dater.formatToIso(oneDayAgo)}&end_date=${now}&time_trunc=day`);
        if (!response.ok) {
            console.error('Failed to fetch RCC data:', response.statusText);
        }
        const data = await response.json();
        console.log("finish fetching RCC data");

        return data.included
    }

    private async saveDataOnDatabase(data: any) {
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
        console.log("Data saved on database");
    }
}
