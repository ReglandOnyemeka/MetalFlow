import React, { useState, useMemo } from 'react';
import { Dealer, ScrapListing, MetalCategory, NigerianRegion } from '../types';
import {
  Store,
  Layers,
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  Phone,
  MessageSquare,
  Scale,
  Zap,
  CheckCircle2,
  PlusCircle,
  Truck,
  Building,
  Lock,
  Tag,
  Clock,
  ExternalLink
} from 'lucide-react';

interface DealerDirectoryListingsProps {
  dealers: Dealer[];
  listings: ScrapListing[];
  onOpenPostLotModal: () => void;
  onMakeOfferClick: (listing: ScrapListing) => void;
  onRegisterDealerClick: () => void;
}

export const DealerDirectoryListings: React.FC<DealerDirectoryListingsProps> = ({
  dealers,
  listings,
  onOpenPostLotModal,
  onMakeOfferClick,
  onRegisterDealerClick
}) => {
  const [activeTab, setActiveTab] = useState<'dealers' | 'listings'>('dealers');

  // Directory Filters
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedMetal, setSelectedMetal] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions: string[] = [
    'All',
    'Kebbi - Birnin Kebbi / Jega',
    'Sokoto - Industrial Layout',
    'Zamfara - Gusau Commercial',
    'Kano - Bompai & Challawa',
    'Kaduna - Kakuri & Kudenda',
    'Katsina - Industrial Zone',
    'Jigawa - Dutse & Hadejia'
  ];

  const metals: string[] = ['All', 'Aluminum', 'Copper', 'Brass', 'Steel', 'Stainless Steel', 'Lead & Batteries'];

  // Filtered Dealers
  const filteredDealers = useMemo(() => {
    return dealers.filter((d) => {
      const matchRegion = selectedRegion === 'All' || d.region.includes(selectedRegion);
      const matchMetal = selectedMetal === 'All' || d.acceptedMetals.includes(selectedMetal as any);
      const matchSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchMetal && matchSearch;
    });
  }, [dealers, selectedRegion, selectedMetal, searchQuery]);

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      const matchRegion = selectedRegion === 'All' || l.region.includes(selectedRegion);
      const matchMetal = selectedMetal === 'All' || l.metalCategory === selectedMetal;
      const matchSearch =
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.fabricatorCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchMetal && matchSearch;
    });
  }, [listings, selectedRegion, selectedMetal, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Header & Section Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E67E22] uppercase tracking-wider">
            <Store className="w-4 h-4" />
            <span>Verified Marketplace & Dealer Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {activeTab === 'dealers' ? 'Certified Scrap Buyers Directory' : 'Fabricator Scrap Lots Marketplace'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Connect directly with verified smelters, yards, and workshops across Nigeria with escrow protection.
          </p>
        </div>

        {/* View Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-200/80 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('dealers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'dealers'
                ? 'bg-[#2B4C7E] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certified Buyers ({dealers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'listings'
                ? 'bg-[#E67E22] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Fabricator Lots ({listings.length})</span>
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={activeTab === 'dealers' ? 'Search yard name, city, address...' : 'Search scrap lot, material grade...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
            />
          </div>

          {/* Region Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  Region: {r}
                </option>
              ))}
            </select>
          </div>

          {/* Metal Category Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
            >
              {metals.map((m) => (
                <option key={m} value={m}>
                  Metal: {m}
                </option>
              ))}
            </select>
          </div>

          {/* Post/Action Button */}
          <div className="sm:col-span-1 text-right">
            {activeTab === 'listings' ? (
              <button
                onClick={onOpenPostLotModal}
                className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            ) : (
              <button
                onClick={onRegisterDealerClick}
                className="w-full bg-[#2B4C7E] hover:bg-[#1A3154] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Join</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* VIEW 1: Certified Dealers Directory */}
      {activeTab === 'dealers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDealers.map((dealer) => (
              <div key={dealer.id} className="bento-card p-6 space-y-4 scrap-card-hover relative">
                
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-slate-900">{dealer.company}</h3>
                      {dealer.isVerified && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          NSMDA Certified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">Proprietor: {dealer.name}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-amber-500 flex items-center justify-end gap-1">
                      ★ {dealer.rating}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      ({dealer.reviewCount} verified trades)
                    </div>
                  </div>
                </div>

                {/* Region & Address */}
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#2B4C7E]">
                    <MapPin className="w-3.5 h-3.5 text-[#E67E22] shrink-0" />
                    <span>{dealer.region}</span>
                  </div>
                  <p className="text-slate-500 pl-5 text-[11px]">{dealer.address}</p>
                </div>

                {/* Key Specs Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 font-semibold block">Payout Speed</span>
                    <span className="font-bold text-slate-900">{dealer.payoutSpeed}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Daily Capacity</span>
                    <span className="font-bold text-slate-900">{dealer.maxDailyCapacityTons} Tons/Day</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Weighing Bridge</span>
                    <span className="font-bold text-emerald-700">
                      {dealer.hasWeighingBridge ? '✓ Certified Digital Scale' : 'Manual Platform Scale'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Site Pickup</span>
                    <span className="font-bold text-[#2B4C7E]">
                      {dealer.providesPickup ? '✓ Truck Pickup Available' : 'Self Yard Delivery'}
                    </span>
                  </div>
                </div>

                {/* Accepted Metals Tags */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Accepted Scrap Categories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dealer.acceptedMetals.map((metal) => (
                      <span
                        key={metal}
                        className="bg-blue-50 text-[#2B4C7E] border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-md"
                      >
                        {metal}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact CTA Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`tel:${dealer.phone}`}
                    className="flex-1 bg-[#2B4C7E] hover:bg-[#1A3154] text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Yard</span>
                  </a>

                  <a
                    href={`https://wa.me/${dealer.whatsapp}?text=Hello%20${encodeURIComponent(dealer.company)},%20I%20found%20your%20certified%20yard%20on%20ScrapVal.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          {filteredDealers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <Store className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No dealers found matching your filters</h3>
              <p className="text-xs text-slate-500">Try broadening your region or metal selection.</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: Fabricator Scrap Lots Marketplace */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((lot) => (
              <div key={lot.id} className="bento-card p-5 space-y-4 scrap-card-hover flex flex-col justify-between">
                
                <div className="space-y-3">
                  {/* Photo Preview if available */}
                  {lot.photos && lot.photos.length > 0 && (
                    <div className="h-40 w-full rounded-xl overflow-hidden bg-slate-100 relative">
                      <img
                        src={lot.photos[0]}
                        alt={lot.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        {lot.status.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Lot Metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-[#E67E22]/10 text-[#E67E22] px-2 py-0.5 rounded-md uppercase">
                        {lot.metalCategory}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        • {lot.postedAt}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                      {lot.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      By {lot.fabricatorCompany || lot.fabricatorName}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {lot.description}
                  </p>

                  {/* Weight & Value Highlight Box */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">Total Lot Weight</span>
                      <span className="font-extrabold text-slate-900">{lot.weightKg.toLocaleString()} KG</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">Fair Valuation</span>
                      <span className="font-extrabold text-[#2B4C7E]">₦{lot.estimatedValueNaira.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Location & Pickup */}
                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#E67E22]" />
                      <span>{lot.region}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Truck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lot.requiresPickup ? 'Site Pickup Required' : 'Self Delivery to Buyer Yard'}</span>
                    </div>
                  </div>
                </div>

                {/* Make Offer & Paystack Escrow Button */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onMakeOfferClick(lot)}
                    className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Make Offer / Paystack Escrow Deposit</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    {lot.offersCount} dealer offer(s) received so far
                  </p>
                </div>

              </div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <Layers className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No scrap lots posted matching your query</h3>
              <p className="text-xs text-slate-500">Be the first fabricator to list available scrap for buyers!</p>
              <button
                onClick={onOpenPostLotModal}
                className="inline-flex items-center gap-2 bg-[#E67E22] text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Scrap Lot Now</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
