export type EnergyData = {
    id: string;
    energy_type: string;
    group_id: string;
    value: string;
    percentage: number;
    datetime: string;
};

export type ApiRequestData = {
    startDate: string | null;
    endDate: string | null;
}