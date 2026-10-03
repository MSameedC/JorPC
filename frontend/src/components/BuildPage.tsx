import React from 'react';
import { useBuildStore } from '../store/useBuildStore';
import type { CategoryKey, Part } from '../types/pc';

// Mock catalog items for demonstration
const MOCK_CATALOG: Record<CategoryKey, Part[]> = {
    CPU: [
        { id: 'c1', name: 'AMD Ryzen 5 7600', category: 'CPU', pricePkr: 56000, specs: { socket: 'AM5', tdpWatts: 65 } },
        { id: 'c2', name: 'Intel Core i5-13400', category: 'CPU', pricePkr: 61000, specs: { socket: 'LGA1700', tdpWatts: 65 } },
    ],
    Mobo: [
        { id: 'm1', name: 'MSI PRO B650M-A WiFi', category: 'Mobo', pricePkr: 48000, specs: { socket: 'AM5' } },
        { id: 'm2', name: 'ASUS Prime B760M-A', category: 'Mobo', pricePkr: 44000, specs: { socket: 'LGA1700' } },
    ],
    GPU: [
        { id: 'g1', name: 'Palit RTX 4060 Dual 8GB', category: 'GPU', pricePkr: 98000, specs: { tdpWatts: 115, lengthMm: 242 } },
    ],
    Case: [
        { id: 'cs1', name: 'Thunder Armor ATX Gaming', category: 'Case', pricePkr: 14500, specs: { maxGpuLengthMm: 340 } },
    ],
    Ram: [
        { id: 'r1', name: 'Corsair Vengeance 32GB (16x2) DDR5', category: 'Ram', pricePkr: 32000, specs: { memoryType: 'DDR5' } },
    ],
    SSD: [
        { id: 's1', name: 'Kingston NV2 1TB NVMe M.2', category: 'SSD', pricePkr: 18500, specs: {} },
    ],
    Cooler: [
        { id: 'cl1', name: 'Thermalright Peerless Assassin 120 SE', category: 'Cooler', pricePkr: 13500, specs: {} },
    ],
    Psu: [
        { id: 'p1', name: 'XPG Pylon 650W 80+ Bronze', category: 'Psu', pricePkr: 17500, specs: { wattage: 650 } },
    ],
};

export const BuildPage: React.FC = () => {
    // Subscribe to Zustand store
    const activeSlot = useBuildStore((state) => state.activeSlot);
    const selectedParts = useBuildStore((state) => state.selectedParts);
    const compatibility = useBuildStore((state) => state.compatibility);
    const setActiveSlot = useBuildStore((state) => state.setActiveSlot);
    const selectPart = useBuildStore((state) => state.selectPart);
    const removePart = useBuildStore((state) => state.removePart);
    const getTotalPrice = useBuildStore((state) => state.getTotalPrice);

    const renderSlot = (category: CategoryKey, label: string) => {
        const isSelected = !!selectedParts[category];
        const isActive = activeSlot === category;
        const part = selectedParts[category];

        return (
            <button
                type="button"
                onClick={() => setActiveSlot(category)}
                className={`p-3 rounded-lg border text-left transition-all ${
                    isActive
                        ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                        : isSelected
                            ? 'border-slate-300 bg-white'
                            : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100'
                }`}
            >
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>
                    {isSelected && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                removePart(category);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 font-bold px-1"
                        >
              ✕
            </span>
                    )}
                </div>
                <div className="mt-1">
                    {part ? (
                        <div>
                            <p className="text-sm font-semibold text-slate-900 truncate">{part.name}</p>
                            <p className="text-xs text-blue-600 font-bold mt-0.5">PKR {part.pricePkr.toLocaleString()}</p>
                        </div>
                    ) : (
                        <p className="text-xs text-slate-400 font-medium">+ Choose</p>
                    )}
                </div>
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center sticky top-0 z-20">
                <h1 className="text-base font-bold text-slate-900">Custom PC Builder</h1>
                <div className="text-xs font-semibold text-slate-600">
                    Karachi Verified Stock
                </div>
            </header>

            <main className="max-w-xl mx-auto p-4 space-y-4">
                {/* 1. PC Illustration Area */}
                <div className="w-full h-36 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white shadow-inner">
                    <div className="text-3xl mb-1">🖥️</div>
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">PC Chassis Blueprint</span>
                    <span className="text-xs text-blue-400 font-semibold mt-1">
            {Object.keys(selectedParts).length} of 8 Slots Mounted
          </span>
                </div>

                {/* 2. Compatibility Alert Bar */}
                <div
                    className={`p-3 rounded-lg border text-xs flex justify-between items-center ${
                        compatibility.isValid
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                >
                    <div className="flex items-center space-x-1.5 font-medium truncate pr-2">
                        <span>{compatibility.isValid ? '✓' : '▲'}</span>
                        <span className="truncate">{compatibility.message}</span>
                    </div>
                    <span className="font-mono font-bold whitespace-nowrap">
            {compatibility.estimatedWattage} W
          </span>
                </div>

                {/* 3. The 2-Column Slot Grid (from your sketch) */}
                <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex flex-col space-y-2.5">
                        {renderSlot('Case', 'Case')}
                        {renderSlot('CPU', 'CPU')}
                        {renderSlot('Ram', 'RAM')}
                        {renderSlot('Cooler', 'CPU Cooling')}
                    </div>
                    <div className="flex flex-col space-y-2.5">
                        {renderSlot('Mobo', 'Motherboard')}
                        {renderSlot('GPU', 'GPU')}
                        {renderSlot('SSD', 'SSD')}
                        {renderSlot('Psu', 'Power Supply')}
                    </div>
                </div>

                {/* 4. Available Compatible Parts Drawer */}
                <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Compatible {activeSlot} Options
                        </h2>
                        <span className="text-xs text-slate-400">Techno City / Uni Center</span>
                    </div>

                    <div className="space-y-2">
                        {(MOCK_CATALOG[activeSlot] || []).map((part) => (
                            <div
                                key={part.id}
                                className="p-2.5 border border-slate-100 rounded-lg flex justify-between items-center hover:bg-slate-50 transition"
                            >
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800">{part.name}</h3>
                                    <p className="text-xs font-bold text-blue-600 mt-0.5">PKR {part.pricePkr.toLocaleString()}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => selectPart(part)}
                                    className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* 5. Sticky Bottom Action Bar */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 z-20 shadow-lg">
                <div className="max-w-xl mx-auto flex items-center justify-between">
                    <div>
                        <div className="text-xs text-slate-400">Total Price</div>
                        <div className="text-base font-black text-slate-900">
                            PKR {getTotalPrice().toLocaleString()}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                        Review & Lock Price ➔
                    </button>
                </div>
            </footer>
        </div>
    );
};