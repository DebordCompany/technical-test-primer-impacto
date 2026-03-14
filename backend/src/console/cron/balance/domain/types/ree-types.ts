export interface ReeResponse {
    included: ReeIncludedItem[];
}

export interface ReeIncludedItem {
    type: string;
    id: string;
    groupId: string | null;
    attributes: ReeAttributes;
}

export interface ReeAttributes {
    content: {
        title: string;
        description: string | null;
        color?: string;
        type?: string;
        lastUpdate: string; // En el JSON viene como 'last-update'
        values: ReeValue[];
        content?: ReeIncludedItem[]; // Nota: Algunos items tienen 'content' en lugar de 'values'
        total?: number;
        totalPercentage?: number; // En el JSON es 'total-percentage'

    }[]
}

export interface ReeValue {
    value: number;
    percentage: number;
    datetime: string; // ISO 8601
}
export interface EnergyRecord {
    energy_type: string;
    group_id?: string;
    value: number;
    percentage: number;
    datetime: Date;
}