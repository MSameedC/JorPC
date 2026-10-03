import { create } from 'zustand';
import type { CategoryKey, Part, CompatibilityStatus } from '../types/pc';

interface BuildState {
    // State variables
    activeSlot: CategoryKey;
    selectedParts: Partial<Record<CategoryKey, Part>>;
    compatibility: CompatibilityStatus;

    // Actions (Mutators)
    setActiveSlot: (slot: CategoryKey) => void;
    selectPart: (part: Part) => void;
    removePart: (category: CategoryKey) => void;
    getTotalPrice: () => number;
}

export const useBuildStore = create<BuildState>((set, get) => ({
    activeSlot: 'CPU',
    selectedParts: {},
    compatibility: {
        isValid: true,
        message: 'Select components to check compatibility',
        estimatedWattage: 0,
    },

    setActiveSlot: (slot) => set({ activeSlot: slot }),

    selectPart: (part) => {
        const updated = { ...get().selectedParts, [part.category]: part };

        // Calculate simple wattage (CPU TDP + GPU TDP + 80W base)
        const cpuTdp = updated.CPU?.specs.tdpWatts ?? 0;
        const gpuTdp = updated.GPU?.specs.tdpWatts ?? 0;
        const wattage = cpuTdp > 0 || gpuTdp > 0 ? cpuTdp + gpuTdp + 80 : 0;

        // Basic socket validation
        let isValid = true;
        let message = 'All chosen components are compatible';

        if (updated.CPU?.specs.socket && updated.Mobo?.specs.socket) {
            if (updated.CPU.specs.socket !== updated.Mobo.specs.socket) {
                isValid = false;
                message = `Socket Mismatch: ${updated.CPU.name} (${updated.CPU.specs.socket}) cannot fit ${updated.Mobo.name} (${updated.Mobo.specs.socket})`;
            }
        }

        set({
            selectedParts: updated,
            compatibility: {
                isValid,
                message,
                estimatedWattage: wattage,
            },
        });
    },

    removePart: (category) => {
        const next = { ...get().selectedParts };
        delete next[category];
        set({ selectedParts: next });
    },

    getTotalPrice: () => {
        return Object.values(get().selectedParts).reduce(
            (sum, part) => sum + (part?.pricePkr ?? 0),
            0
        );
    },
}));