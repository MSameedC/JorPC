import React from 'react';
import { useState } from 'react';
import { useBuildStore } from '../store/useBuildStore';
import type { CategoryKey, Part } from '../types/pc';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ReviewModal } from './ReviewModal';

// Catalog items
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
    const activeSlot = useBuildStore((state) => state.activeSlot);
    const selectedParts = useBuildStore((state) => state.selectedParts);
    const compatibility = useBuildStore((state) => state.compatibility);
    const setActiveSlot = useBuildStore((state) => state.setActiveSlot);
    const selectPart = useBuildStore((state) => state.selectPart);
    const removePart = useBuildStore((state) => state.removePart);
    const getTotalPrice = useBuildStore((state) => state.getTotalPrice);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const renderSlot = (category: CategoryKey, label: string) => {
        const isSelected = !!selectedParts[category];
        const isActive = activeSlot === category;
        const part = selectedParts[category];

        return (
            <button
                type="button"
                onClick={() => setActiveSlot(category)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                    isActive
                        ? 'border-blue-500 bg-blue-950/40 ring-1 ring-blue-500/50 shadow-lg shadow-blue-950/50'
                        : isSelected
                            ? 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                            : 'border-dashed border-slate-800/80 bg-slate-950/60 hover:bg-slate-900/40 hover:border-slate-700'
                }`}
            >
                <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                        {label}
                    </span>
                    {isSelected && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                removePart(category);
                            }}
                            className="text-xs text-red-400 hover:text-red-300 font-bold px-1.5 py-0.5 rounded bg-red-950/50 border border-red-800/50"
                        >
                            ✕
                        </span>
                    )}
                </div>
                <div className="mt-1.5">
                    {part ? (
                        <div>
                            <p className="text-sm font-semibold text-white truncate">{part.name}</p>
                            <p className="text-xs font-mono font-bold text-blue-400 mt-0.5">
                                PKR {part.pricePkr.toLocaleString()}
                            </p>
                        </div>
                    ) : (
                        <p className="text-xs font-medium text-slate-500">+ Choose Part</p>
                    )}
                </div>
            </button>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-x-hidden relative">
            {/* 1. Shared Header */}
            <Header />

            {/* 2. Main Builder Section */}
            <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 space-y-5 z-10">
                {/* Heading */}
                <div className="text-center space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                        Custom PC Builder
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Select hardware to test compatibility with verified Karachi store stock.
                    </p>
                </div>

                {/* 1. PC Illustration Chassis Area */}
                <div className="w-full h-36 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-4 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/5 blur-2xl pointer-events-none" />
                    <div className="text-3xl mb-1">🖥️</div>
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">
                        Interactive Chassis Blueprint
                    </span>
                    <span className="text-xs text-blue-400 font-semibold mt-1">
                        {Object.keys(selectedParts).length} of 8 Components Mounted
                    </span>
                </div>

                {/* 2. Dynamic Compatibility Status Banner */}
                <div
                    className={`p-3 rounded-xl border text-xs flex justify-between items-center backdrop-blur-sm ${
                        compatibility.isValid
                            ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                            : 'bg-red-950/40 border-red-800/80 text-red-300'
                    }`}
                >
                    <div className="flex items-center space-x-2 truncate pr-2">
                        <span>{compatibility.isValid ? '✓' : '▲'}</span>
                        <span className="truncate font-medium">{compatibility.message}</span>
                    </div>
                    <span className="font-mono font-bold whitespace-nowrap px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {compatibility.estimatedWattage} W
                    </span>
                </div>

                {/* 3. 2-Column Slot Grid (matching your sketch) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col space-y-3">
                        {renderSlot('Case', 'Case')}
                        {renderSlot('CPU', 'CPU')}
                        {renderSlot('Ram', 'RAM')}
                        {renderSlot('Cooler', 'CPU Cooling')}
                    </div>
                    <div className="flex flex-col space-y-3">
                        {renderSlot('Mobo', 'Motherboard')}
                        {renderSlot('GPU', 'GPU')}
                        {renderSlot('SSD', 'SSD')}
                        {renderSlot('Psu', 'Power Supply')}
                    </div>
                </div>

                {/* 4. Available Compatible Parts Drawer */}
                <section className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Available {activeSlot} Options
                        </h2>
                        <span className="text-xs text-emerald-400 font-mono">
                            ● Techno City / Uni Center
                        </span>
                    </div>

                    <div className="space-y-2">
                        {(MOCK_CATALOG[activeSlot] || []).map((part) => (
                            <div
                                key={part.id}
                                className="p-3 border border-slate-800/80 rounded-xl bg-slate-950/40 hover:bg-slate-900/80 hover:border-slate-700 flex justify-between items-center transition"
                            >
                                <div>
                                    <h3 className="text-sm font-semibold text-white">{part.name}</h3>
                                    <p className="text-xs font-mono font-bold text-blue-400 mt-0.5">
                                        PKR {part.pricePkr.toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => selectPart(part)}
                                    className="button text-xs py-1.5 px-3"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* 5. Sticky Bottom Action Bar */}
            <div className="sticky bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 p-3.5 z-20">
                <div className="max-w-xl mx-auto flex items-center justify-between">
                    <div>
                        <div className="text-xs text-slate-400 font-mono">Total Estimated Cost</div>
                        <div className="text-lg font-black text-white">
                            PKR {getTotalPrice().toLocaleString()}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsReviewOpen(true)}
                        className="button text-sm py-2 px-5"
                    >
                        Review & Lock Price ➔
                    </button>
                </div>
            </div>

            {/* 6. Shared Footer */}
            <Footer />

            {/* 7. Review & Lock Price Modal */}
            <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
            />
        </div>
    );
};