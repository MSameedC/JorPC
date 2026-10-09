import React, { useState } from 'react';
import { useBuildStore } from '../store/useBuildStore';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const KARACHI_AREAS = [
    'DHA (Phase 1–8)',
    'Clifton',
    'Gulshan-e-Iqbal',
    'Gulistan-e-Johar',
    'North Nazimabad',
    'PECHS / Tariq Road',
    'Federal B Area',
    'Bahria Town Karachi',
    'Malir Cantt',
    'Saddar / I.I. Chundrigar',
    'Other (Karachi)',
];

// Replace with your business WhatsApp number (format: 923XXXXXXXXX without + or dashes)
const BUSINESS_WHATSAPP_NUMBER = '923001234567';

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
    const selectedParts = useBuildStore((state) => state.selectedParts);
    const getTotalPrice = useBuildStore((state) => state.getTotalPrice);
    const estimatedWattage = useBuildStore((state) => state.compatibility.estimatedWattage);

    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState(KARACHI_AREAS[0]);
    const [includeAssembly, setIncludeAssembly] = useState(true);

    if (!isOpen) return null;

    const partsTotal = getTotalPrice();
    const assemblyFee = includeAssembly ? 3500 : 0;
    const finalTotal = partsTotal + assemblyFee;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Format selected parts list
        const partsListText = Object.entries(selectedParts)
            .filter(([_, part]) => !!part)
            .map(([cat, part]) => `• *${cat}:* ${part?.name} (PKR ${part?.pricePkr.toLocaleString()})`)
            .join('\n');

        // Build the WhatsApp message
        const message =
            `*NEW BUILD QUOTE REQUEST — JorPC*
----------------------------------
*Customer:* ${customerName}
*Phone:* +92${phone.replace(/^(\+92|0)/, '')}
*Delivery Area:* ${area}

*Selected Components:*
${partsListText || '• None selected'}

*Service:* ${includeAssembly ? 'Professional Assembly & Testing (PKR 3,500)' : 'Parts Only (DIY)'}
*Estimated Power:* ${estimatedWattage}W
*Total Estimated Price:* *PKR ${finalTotal.toLocaleString()}*
----------------------------------
_Please confirm current physical stock across Techno City / Uni Center and reply with locked invoice._`;

        // Open WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="px-5 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <div>
                        <h2 className="text-base font-bold text-white">Review & Lock In Your Build</h2>
                        <p className="text-xs text-slate-400">Karachi Partner Shop Stock Check</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-lg font-bold px-2 py-0.5 rounded-lg hover:bg-slate-800"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
                    {/* 1. Itemized Parts Summary */}
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400 uppercase">
                            <span>Configured Parts</span>
                            <span>{Object.keys(selectedParts).length} Items</span>
                        </div>
                        <div className="divide-y divide-slate-800/60 max-h-36 overflow-y-auto pr-1">
                            {Object.entries(selectedParts).map(([category, part]) => (
                                <div key={category} className="py-1.5 flex justify-between items-center">
                  <span className="text-slate-300 truncate max-w-[220px]">
                    <strong className="text-slate-400">{category}:</strong> {part?.name}
                  </span>
                                    <span className="font-mono text-slate-200">
                    PKR {part?.pricePkr.toLocaleString()}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Assembly Service Add-on */}
                    <label className="flex items-center space-x-3 p-3 bg-slate-950/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
                        <input
                            type="checkbox"
                            checked={includeAssembly}
                            onChange={(e) => setIncludeAssembly(e.target.checked)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                        />
                        <div className="flex-1">
                            <div className="font-semibold text-white">Professional Assembly & Stress Testing</div>
                            <div className="text-xs text-slate-400">Cable management, BIOS update & 2-hr thermal benchmark</div>
                        </div>
                        <span className="font-mono text-blue-400 font-bold">+PKR 3,500</span>
                    </label>

                    {/* 3. Customer Contact Inputs */}
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Muhammad Sameed"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number</label>
                            <div className="flex">
                <span className="inline-flex items-center px-3 bg-slate-800 border border-r-0 border-slate-700 rounded-l-lg text-slate-400 text-xs">
                  +92
                </span>
                                <input
                                    type="tel"
                                    required
                                    placeholder="3001234567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-r-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Karachi Delivery Town</label>
                            <select
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                            >
                                {KARACHI_AREAS.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="p-3 bg-blue-950/20 border border-blue-900/40 rounded-xl flex justify-between items-center">
                        <div>
                            <span className="text-xs text-slate-400">Total Verified Price</span>
                            <p className="text-lg font-black text-white">PKR {finalTotal.toLocaleString()}</p>
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">● 0% Upfront to Lock</span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950"
                    >
                        <span>Send Quote to WhatsApp</span>
                        <span>➔</span>
                    </button>

                    <p className="text-center text-[11px] text-slate-500">
                        No payment taken now. We verify physical shop availability and send your confirmed invoice via WhatsApp.
                    </p>
                </form>
            </div>
        </div>
    );
};