import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['energy_type', 'group_id', 'datetime'])
export class Balance {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    energy_type: string;

    @Column()
    group_id: string;

    @Column('decimal', { precision: 15, scale: 3 })
    value: number;

    @Column('float')
    percentage: number;

    @Column({ type: 'timestamp' })
    @Index()
    datetime: Date;

}