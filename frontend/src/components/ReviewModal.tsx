import React, { useState } from 'react';
import { useBuildStore } from '../store/useBuildStore';

// Put your store's WhatsApp number here (Country code 92, without '+' or leading '0')
const BUSINESS_WHATSAPP_NUMBER = '923394737377';
const ASSEMBLY_FEE_PKR = 3500;

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
    const { selectedParts } = useBuildStore();

    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');
    const [includeAssembly, setIncludeAssembly] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    // Extract selected parts and calculate costs & power
    const partsList = Object.values(selectedParts).filter(Boolean);
    const partsTotal = partsList.reduce((acc, part) => acc + (part?.pricePkr || 0), 0);
    const finalTotal = partsTotal + (includeAssembly ? ASSEMBLY_FEE_PKR : 0);

    // Calculate estimated power consumption
    const estimatedWattage = partsList.reduce((acc, part) => {
        return acc + (part?.specs?.tdpWatts || part?.specs?.wattage || 0);
    }, 50); // 50W baseline for fans/motherboard idle

    // Format parts text for WhatsApp
    const partsListText = partsList
        .map((p) => `• *${p.category}:* ${p.name} — PKR ${p.pricePkr.toLocaleString()}`)
        .join('\n');

    const handleWhatsAppOrder = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!customerName.trim() || !phone.trim() || !area.trim()) {
            alert('Please fill in your name, phone number, and delivery area.');
            return;
        }

        setIsSubmitting(true);
        let orderRef = '';

        // 1. Try to record order in SQLite backend first
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName,
                    customerPhone: phone,
                    shippingAddress: area,
                    city: area,
                    notes: includeAssembly ? 'Assembly Requested (PKR 3,500)' : 'Parts Only (DIY)',
                    partIds: partsList.map((p) => p.id),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                orderRef = `\n*Order Ref:* ${data.orderId}`;
            }
        } catch (err) {
            console.warn('Backend order recording skipped, proceeding to WhatsApp:', err);
        } finally {
            setIsSubmitting(false);
        }

        // 2. Format WhatsApp Message
        const cleanPhone = phone.replace(/^(\+92|0)/, '');
        const message = `*NEW BUILD QUOTE REQUEST — JorPC*${orderRef}
----------------------------------
*Customer:* ${customerName}
*Phone:* +92${cleanPhone}
*Delivery Area:* ${area}
*Delivery Address:* ${address}

*Selected Components:*
${partsListText || '• None selected'}

*Service:* ${includeAssembly ? `Professional Assembly & Testing (PKR ${ASSEMBLY_FEE_PKR.toLocaleString()})` : 'Parts Only (DIY)'}
*Estimated Power:* ~${estimatedWattage}W
*Total Estimated Price:* *PKR ${finalTotal.toLocaleString()}*
----------------------------------
_Please confirm current physical stock across Techno City / Uni Center and reply with locked invoice._\;`

        // 3. Open WhatsApp Web or App
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-slate-900 p-6 text-white shadow-2xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <h2 className="text-xl font-bold">Review & Request Quote</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
                </div>

                {/* Components Overview */}
                <div className="mb-4 max-h-44 overflow-y-auto rounded-lg bg-slate-950/60 p-3 border border-slate-800 space-y-2">
                    {partsList.map((part) => (
                        <div key={part.id} className="flex justify-between text-xs sm:text-sm">
                            <span className="text-slate-300 font-medium truncate max-w-[70%]">{part.name}</span>
                            <span className="price-tag">PKR {part.pricePkr.toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                {/* Assembly Option */}
                <div className="mb-4 flex items-center justify-between rounded-lg bg-slate-800/50 p-3 border border-slate-700">
                    <div>
                        <div className="text-sm font-semibold text-white">Professional Assembly & Stress-Testing</div>
                        <div className="text-xs text-slate-400">Cable management, BIOS update, thermal stress test</div>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeAssembly}
                            onChange={(e) => setIncludeAssembly(e.target.checked)}
                            className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
                        />
                        <span className="ml-2 text-xs font-mono text-emerald-400">+PKR 3,500</span>
                    </label>
                </div>

                {/* Totals & Power */}
                <div className="mb-5 flex justify-between items-center rounded-lg bg-slate-800 p-3 border border-slate-700">
                    <div>
                        <span className="text-xs uppercase text-slate-400">Estimated Power</span>
                        <div className="text-sm font-bold text-sky-400">~{estimatedWattage} Watts</div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs uppercase text-slate-400">Total Price</span>
                        <div className="text-lg font-bold text-emerald-400">PKR {finalTotal.toLocaleString()}</div>
                    </div>
                </div>

                {/* Customer Info Form */}
                <form onSubmit={handleWhatsAppOrder} className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Your Name *</label>
                        <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="e.g. Muhammad Amir"
                            className="input"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">WhatsApp Number *</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="0300-1234567"
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">City / Delivery Area *</label>
                            <input
                                type="text"
                                required
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="e.g. Larkana / Karachi"
                                className="input"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Delivery Address *</label>
                        <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. House/Appartment number, Street name"
                            className="input"
                        />
                    </div>

                    <div className="pt-3 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="button-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || partsList.length === 0}
                            className="button-success"
                        >
                            {isSubmitting ? 'Recording...' : 'Send Quote via WhatsApp 💬'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};