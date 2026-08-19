import React, { useState } from 'react';
import { MetalPriceItem, PriceUpdateLog } from '../types';
import {
  Settings2,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Bell,
  Clock,
  UserCheck,
  FileText,
  AlertTriangle,
  Send,
  Zap,
  ShieldAlert
} from 'lucide-react';

interface AdminControlPanelProps {
  prices: MetalPriceItem[];
  logs: PriceUpdateLog[];
  onUpdatePrice: (id: string, newPrice: number, updatedBy: string, reason: string) => void;
  onTriggerMockPriceAlert: () => void;
}

export const AdminControlPanel: React.FC<AdminControlPanelProps> = ({
  prices,
  logs,
  onUpdatePrice,
  onTriggerMockPriceAlert
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(prices[0]?.id || 'p-1');
  const [newPrice, setNewPrice] = useState<number>(prices[0]?.pricePerKg || 2500);
  const [updatedBy, setUpdatedBy] = useState<string>('NSMDA Price Committee');
  const [reason, setReason] = useState<string>('LME global market rally & high local factory demand');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedItem = prices.find((p) => p.id === selectedItemId) || prices[0];

  const handleSelectChange = (id: string) => {
    setSelectedItemId(id);
    const item = prices.find((p) => p.id === id);
    if (item) {
      setNewPrice(item.pricePerKg);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onUpdatePrice(selectedItemId, Number(newPrice), updatedBy, reason);
      setIsSubmitting(false);
      setSuccessMessage(`Successfully published new benchmark rate for ${selectedItem.grade}: ₦${newPrice}/kg`);
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Platform Admin Control & Benchmark Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Admin Daily Benchmark Price Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Override per-kg benchmark index rates, record market justifications, and broadcast live price change notifications to fabricators and dealers.
          </p>
        </div>

        <button
          onClick={onTriggerMockPriceAlert}
          className="bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shrink-0 shadow-xs"
        >
          <Bell className="w-4 h-4 text-[#E67E22] animate-bounce" />
          <span>Simulate Live Price Ticker Toast Alert</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Panel: Update Benchmark Rate (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#2B4C7E]/10 text-[#2B4C7E]">
                  <Settings2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 text-base">Update Daily Price Rate</h2>
                  <p className="text-[11px] text-slate-500">Benchmark override tool</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-full">
                Admin Privileged
              </span>
            </div>

            {successMessage && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Select Grade */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  1. Select Scrap Grade to Override
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                >
                  {prices.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.category}] {p.grade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Rate Display */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Current Benchmark</span>
                  <span className="text-base font-black text-slate-800">
                    ₦{selectedItem?.pricePerKg.toLocaleString()} / kg
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-semibold block text-[10px]">Category</span>
                  <span className="font-bold text-[#2B4C7E]">{selectedItem?.category}</span>
                </div>
              </div>

              {/* New Price Input */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  2. New Benchmark Rate (₦ per KG)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">₦</span>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 text-base font-extrabold text-[#2B4C7E] bg-slate-50 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  />
                </div>
              </div>

              {/* Updated By */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  3. Authorizing Body / Official
                </label>
                <input
                  type="text"
                  required
                  value={updatedBy}
                  onChange={(e) => setUpdatedBy(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                />
              </div>

              {/* Market Reason */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  4. Reason for Market Adjustment
                </label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., LME global copper rally, Lagos Ikeja smelter demand surge..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Publish Updated Rate & Send Ticker Alert</span>
              </button>

            </form>
          </div>
        </div>

        {/* Right Panel: Audit Trail Logs Table (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2B4C7E]" />
                  Price Update Audit Logs
                </h3>
                <p className="text-[11px] text-slate-500">Historical trail of benchmark rate adjustments</p>
              </div>

              <span className="text-xs font-bold text-slate-500">
                {logs.length} Logged Entries
              </span>
            </div>

            {/* Audit Trail Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Grade</th>
                    <th className="py-2.5 px-3">Old Price</th>
                    <th className="py-2.5 px-3">New Price</th>
                    <th className="py-2.5 px-3">Adjusted By</th>
                    <th className="py-2.5 px-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {logs.map((log) => {
                    const diff = log.newPrice - log.oldPrice;
                    const isUp = diff >= 0;
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{log.grade}</div>
                          <div className="text-[10px] text-slate-400">{log.reason}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-500">
                          ₦{log.oldPrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 font-extrabold text-[#2B4C7E]">
                          ₦{log.newPrice.toLocaleString()}
                          <span className={`block text-[10px] ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isUp ? '+' : ''}₦{diff.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-[11px]">
                          {log.updatedBy}
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[10px] whitespace-nowrap">
                          {log.timestamp}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
