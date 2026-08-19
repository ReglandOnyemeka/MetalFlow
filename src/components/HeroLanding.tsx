import React from 'react';
import { MetalPriceItem } from '../types';
import { APP_CONTACT_INFO, NORTH_WEST_HUBS } from '../data/mockData';
import { 
  Calculator, 
  ShieldCheck, 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Building2,
  Lock,
  Anvil,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface HeroLandingProps {
  prices: MetalPriceItem[];
  onEnterApp: () => void;
  onPostScrap: () => void;
  onBecomeDealer: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  prices,
  onEnterApp,
  onPostScrap,
  onBecomeDealer
}) => {
  return (
    <div className="space-y-10 pb-16">
      
      {/* Primary Bento Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 1. Hero Block (Col 8) */}
        <div className="md:col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#8A9EA7]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 bg-[#E67E22]/10 border border-[#E67E22]/30 text-[#E67E22] text-xs font-extrabold px-3.5 py-1.5 rounded-full w-fit mb-4">
            <Anvil className="w-4 h-4 text-[#E67E22]" />
            <span>NORTH-WEST NIGERIA SCRAP INDEX</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#2B4C7E] tracking-tight leading-tight mb-4">
            <span className="text-[#E67E22]">MetalFlow</span> Scrap & Extrusions Marketplace.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl font-medium leading-relaxed mb-6">
            Connecting fabricators with certified smelters and scrap buyers across Birnin Kebbi, Sokoto, Kano, Kaduna, Zamfara, Katsina, and Jigawa. Transparent daily rates, instant valuations, and secure escrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={onEnterApp}
              className="px-8 py-4 bg-[#2B4C7E] hover:bg-[#1A3154] text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-98"
            >
              <Calculator className="w-5 h-5 text-[#E67E22]" />
              <span>Enter Marketplace</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={onPostScrap}
              className="px-8 py-4 bg-white border-2 border-[#8A9EA7] text-[#2B4C7E] hover:bg-slate-50 rounded-2xl font-bold transition-colors text-center"
            >
              Post Scrap Lot +
            </button>
          </div>

          {/* Micro Highlights */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-semibold pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>LME + North-West Smelter Rates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>NSMDA Certified Buyers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Paystack Escrow Protection</span>
            </div>
          </div>
        </div>

        {/* 2. Live Scrap Price Board (Col 4) */}
        <div className="md:col-span-12 lg:col-span-4 bg-[#2B4C7E] rounded-3xl p-6 text-white flex flex-col justify-between shadow-md relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
              <h2 className="text-sm font-extrabold tracking-wide uppercase flex items-center gap-2 text-white">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span> MetalFlow Index (₦/kg)
              </h2>
              <span className="text-[10px] text-[#8A9EA7] font-semibold">Live Feed</span>
            </div>

            <div className="space-y-3">
              {prices.slice(0, 4).map((item) => {
                const isUp = item.change24h >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={onEnterApp}
                    className="flex justify-between items-center border-b border-white/10 pb-2.5 cursor-pointer group hover:pl-1 transition-all"
                  >
                    <div>
                      <div className="font-bold text-xs text-white group-hover:text-[#E67E22]">
                        {item.category}
                      </div>
                      <div className="text-[10px] text-slate-300">
                        {item.grade}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-white">
                        ₦{item.pricePerKg.toLocaleString()}
                      </div>
                      <div className={`text-[10px] font-bold ${isUp ? 'text-emerald-300' : 'text-rose-300'}`}>
                        {isUp ? '+' : ''}{item.changePercent}% {isUp ? '↑' : '↓'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <svg className="w-full h-10 stroke-emerald-400 fill-none opacity-80" viewBox="0 0 100 20">
              <path d="M0 15 Q 10 10, 20 12 T 40 5 T 60 10 T 80 3 T 100 8" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <button
              onClick={onEnterApp}
              className="w-full mt-2 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-all text-center block"
            >
              View Full Price Board →
            </button>
          </div>
        </div>

        {/* 3. Value Estimator Bento Card (Col 4) */}
        <div className="md:col-span-6 lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#2B4C7E] font-extrabold uppercase text-xs tracking-widest flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#E67E22]" />
                Value Estimator
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Instant Rate
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 block mb-1">
                  Metal Grade
                </label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex justify-between items-center">
                  <span>Aluminum Extrusions (6063)</span>
                  <span className="text-[#2B4C7E]">₦2,450/kg</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 block mb-1">
                  Estimated Weight (KG)
                </label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 flex justify-between items-center">
                  <span>250 KG Batch</span>
                  <span className="text-slate-500 font-normal">0.25 Metric Tons</span>
                </div>
              </div>

              <div className="p-4 bg-[#F4F6F8] rounded-2xl text-center border border-slate-200/60">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  Estimated Cash Payout (Kebbi Hub)
                </span>
                <span className="text-2xl font-black text-[#2B4C7E]">₦612,500.00</span>
              </div>
            </div>
          </div>

          <button
            onClick={onEnterApp}
            className="w-full mt-4 py-3 bg-[#2B4C7E] hover:bg-[#1A3154] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
          >
            <span>Open Custom Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4. Recent Marketplace Listings Bento Card (Col 5) */}
        <div className="md:col-span-6 lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#2B4C7E] font-extrabold uppercase text-xs tracking-widest flex items-center gap-2">
                <Store className="w-4 h-4 text-[#E67E22]" />
                Recent North-West Lots
              </h3>
              <button
                onClick={onPostScrap}
                className="text-[11px] text-[#E67E22] font-extrabold uppercase hover:underline cursor-pointer"
              >
                Post Lot +
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 items-center p-2.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-10 h-10 bg-[#2B4C7E]/10 text-[#2B4C7E] rounded-xl font-extrabold flex items-center justify-center text-xs shrink-0">
                  AL
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">1,250kg Architectural Extrusion Lot</div>
                  <div className="text-[10px] text-slate-400">Birnin Kebbi - Secretariat Rd • 1 hr ago</div>
                </div>
                <div className="text-xs font-black text-[#2B4C7E] shrink-0">₦3.06M</div>
              </div>

              <div className="flex gap-3 items-center p-2.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-10 h-10 bg-[#E67E22]/10 text-[#E67E22] rounded-xl font-extrabold flex items-center justify-center text-xs shrink-0">
                  CU
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">480kg Stripped Bright Copper Wire</div>
                  <div className="text-[10px] text-slate-400">Sokoto Industrial • 3 hrs ago</div>
                </div>
                <div className="text-xs font-black text-[#2B4C7E] shrink-0">₦6.14M</div>
              </div>

              <div className="flex gap-3 items-center p-2.5 rounded-2xl bg-slate-50 border border-slate-100 opacity-80">
                <div className="w-10 h-10 bg-slate-200 text-slate-700 rounded-xl font-extrabold flex items-center justify-center text-xs shrink-0">
                  ST
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">4,500kg Heavy Structural Beams Scrap</div>
                  <div className="text-[10px] text-slate-400">Kano - Bompai • 5 hrs ago</div>
                </div>
                <div className="text-xs font-black text-[#2B4C7E] shrink-0">₦2.16M</div>
              </div>
            </div>
          </div>

          <button
            onClick={onEnterApp}
            className="w-full mt-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all text-center block"
          >
            Explore All Live Listings →
          </button>
        </div>

        {/* 5. Verified Dealers Bento Card (Col 3) */}
        <div className="md:col-span-12 lg:col-span-3 bg-[#8A9EA7] rounded-3xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold uppercase text-xs tracking-widest text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Verified Dealers
              </h3>
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                NSMDA
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-xs font-extrabold text-white">Kebbi & Kano Smelting Ltd</div>
                <div className="text-[10px] text-slate-100 flex items-center gap-1 opacity-90 mt-0.5">
                  <Building2 className="w-3 h-3 text-emerald-300" /> Birnin Kebbi, Kebbi
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-xs font-extrabold text-white">Sokoto Clean Metals Yard</div>
                <div className="text-[10px] text-slate-100 flex items-center gap-1 opacity-90 mt-0.5">
                  <Building2 className="w-3 h-3 text-emerald-300" /> Sokoto Industrial Layout
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-xs font-extrabold text-white">Arewa Smelting Mega Yard</div>
                <div className="text-[10px] text-slate-100 flex items-center gap-1 opacity-90 mt-0.5">
                  <Building2 className="w-3 h-3 text-emerald-300" /> Kano - Bompai Area
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onBecomeDealer}
            className="w-full mt-4 py-2.5 bg-white text-[#2B4C7E] hover:bg-slate-100 rounded-xl text-xs font-extrabold shadow-sm transition-all text-center block"
          >
            Register Your Yard +
          </button>
        </div>

      </div>

      {/* Feature Highlights Bento Grid */}
      <section className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Why Fabricators & Dealers Trust MetalFlow
          </h2>
          <p className="text-slate-600 text-xs">
            Bridging workshop scrap generators and certified industrial buyers with transparency and safety across North-West Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bento-card p-6 space-y-3 scrap-card-hover">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2B4C7E] flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">1. Fair Market Price Index</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Updated daily by certified smelter benchmarks, protecting fabricators from arbitrary down-grading and false scale weight deductions.
            </p>
          </div>

          <div className="bento-card p-6 space-y-3 scrap-card-hover">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#E67E22] flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">2. Instant Scrap Calculator</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Input metal category, grade purity, and weight (kg) to derive total fair cash valuation with regional logistics cost deductions.
            </p>
          </div>

          <div className="bento-card p-6 space-y-3 scrap-card-hover">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">3. Certified Buyers</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Browse vetted scrap buyers in Birnin Kebbi, Sokoto, Kano, Kaduna, and Gusau with certified weighing bridges and prompt bank payouts.
            </p>
          </div>

          <div className="bento-card p-6 space-y-3 scrap-card-hover">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">4. Escrow Protection</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Dealers lock pickup deposits via Paystack escrow. Funds are safely released upon physical weight verification at pickup.
            </p>
          </div>

        </div>
      </section>

      {/* Industrial Hubs Bento Strip (North-West Nigeria States) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#2B4C7E]" />
              North-West Nigeria Industrial Scrap Hubs Covered
            </h3>
            <p className="text-xs text-slate-500">Real-time price adjustments across all 7 North-West states based on local smelter demand.</p>
          </div>

          <button
            onClick={onBecomeDealer}
            className="text-xs font-bold text-[#2B4C7E] hover:text-[#1A3154] flex items-center gap-1 underline underline-offset-4 shrink-0"
          >
            <span>Register Your Yard as Certified Dealer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {NORTH_WEST_HUBS.map((loc, i) => (
            <div key={i} className="p-3 bg-[#F4F6F8] rounded-2xl border border-slate-200 text-center space-y-1">
              <p className="font-extrabold text-xs text-slate-900">{loc.name}</p>
              <span className="inline-block text-[10px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
                {loc.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Official Contact & Head Office Card */}
      <section className="bg-[#1A3154] text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E67E22] bg-[#E67E22]/10 px-3 py-1 rounded-full border border-[#E67E22]/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>HEAD OFFICE: BIRNIN KEBBI, NIGERIA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Get in Touch with MetalFlow Support
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Have questions about daily benchmark indices, certified dealer onboarding, or bulk scrap valuation? Reach our dedicated operations desk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
            <a 
              href={`tel:${APP_CONTACT_INFO.phone}`}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E67E22] text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-300">Direct Line</div>
                <div className="text-xs font-black text-white">{APP_CONTACT_INFO.phone}</div>
              </div>
            </a>

            <a 
              href={`mailto:${APP_CONTACT_INFO.email}`}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-300">Email Address</div>
                <div className="text-xs font-black text-white truncate max-w-[140px]">{APP_CONTACT_INFO.email}</div>
              </div>
            </a>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2B4C7E] text-white flex items-center justify-center shrink-0 border border-white/20">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-300">Address</div>
                <div className="text-xs font-black text-white">{APP_CONTACT_INFO.address}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
