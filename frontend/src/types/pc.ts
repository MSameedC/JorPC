export type CategoryKey =
    | 'Case'
    | 'Mobo'
    | 'CPU'
    | 'GPU'
    | 'Ram'
    | 'SSD'
    | 'Cooler'
    | 'Psu';

export const REQUIRED_CATEGORIES: CategoryKey[] = [
    'Case', 'Mobo', 'CPU', 'GPU', 'Ram', 'SSD', 'Cooler', 'Psu'
];

export interface Part {
    id: string;
    name: string;
    category: CategoryKey;
    pricePkr: number;
    specs: {
        socket?: string;
        formFactor?: string;
        memoryType?: string;
        tdpWatts?: number;
        wattage?: number;
        lengthMm?: number;
        maxGpuLengthMm?: number;
    };
}

export interface CompatibilityStatus {
    isValid: boolean;
    message: string;
    estimatedWattage: number;
}