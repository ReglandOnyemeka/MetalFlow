import React from 'react';
import { MetalPriceItem } from '../types';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface LiveTickerProps {
  prices: MetalPriceItem[];
  onSelectPrice?: (price: MetalPriceItem) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ prices, onSelectPrice }) => {
  // Duplicate array to ensure smooth seamless infinite loop marquee animation
  const tickerItems = [...prices, ...prices];

  return (
    <div className="bg-[#1A3154] text-white border-b border-[#2B4C7E] overflow-hidden py-2 px-4 shadow-inner relative z-20">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#E67E22] text-white text-xs font-bold px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider shadow-xs">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          Live Scrap Index
        </div>

        <div className="overflow-hidden whitespace-nowrap flex-1 relative">
          <div className="animate-ticker flex items-center gap-8">
            {tickerItems.map((item, idx) => {
              const isUp = item.change24h >= 0;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => onSelectPrice && onSelectPrice(item)}
                  className="inline-flex items-center gap-2 text-xs hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors"
                >
                  <span className="font-semibold text-slate-200">{item.category}</span>
                  <span className="text-slate-400 text-[11px]">({item.grade.split('(')[0].trim()})</span>
                  <span className="font-bold text-white">₦{item.pricePerKg.toLocaleString()}/kg</span>
                  <span
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isUp ? '+' : ''}{item.changePercent}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-300 shrink-0 border-l border-slate-700 pl-3">
          <RefreshCw className="w-3 h-3 animate-spin text-[#8A9EA7]" />
          <span>Updated Live</span>
        </div>
      </div>
    </div>
  );
};
