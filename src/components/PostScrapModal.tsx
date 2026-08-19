import React, { useState } from 'react';
import { ScrapListing, MetalCategory, NigerianRegion } from '../types';
import { X, PlusCircle, Upload, MapPin, Zap, CheckCircle2 } from 'lucide-react';

interface PostScrapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitListing: (listingData: Partial<ScrapListing>) => void;
  prefillData?: {
    category?: MetalCategory;
    grade?: string;
    pricePerKg?: number;
    weightKg?: number;
  };
}

export const PostScrapModal: React.FC<PostScrapModalProps> = ({
  isOpen,
  onClose,
  onSubmitListing,
  prefillData
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>(
    prefillData?.grade ? `Scrap Lot: ${prefillData.grade}` : 'Clean Aluminum Offcuts & Extrusions'
  );
  const [fabricatorName, setFabricatorName] = useState<string>('Samson Odeyemi');
  const [fabricatorCompany, setFabricatorCompany] = useState<string>('Kebbi Metal & Glass Workshop');
  const [metalCategory, setMetalCategory] = useState<MetalCategory>(prefillData?.category || 'Aluminum');
  const [grade, setGrade] = useState<string>(prefillData?.grade || 'Clean Architectural Extrusions (6063)');
  const [weightKg, setWeightKg] = useState<number>(prefillData?.weightKg || 350);
  const [askingPricePerKg, setAskingPricePerKg] = useState<number>(prefillData?.pricePerKg || 2450);
  const [region, setRegion] = useState<NigerianRegion>('Kebbi - Birnin Kebbi / Jega');
  const [address, setAddress] = useState<string>('Haliru Abdu Secretariat Road, Birnin Kebbi, Kebbi State');
  const [phone, setPhone] = useState<string>('09038784064');
  const [description, setDescription] = useState<string>(
    'Clean fabrication offcuts from current glazing project. Bundled in straps, ready for immediate truck pickup.'
  );
  const [requiresPickup, setRequiresPickup] = useState<boolean>(true);

  const categories: MetalCategory[] = [
    'Aluminum',
    'Copper',
    'Brass',
    'Steel',
    'Stainless Steel',
    'Lead & Batteries',
    'Zinc & Alloys'
  ];

  const regions: NigerianRegion[] = [
    'Kebbi - Birnin Kebbi / Jega',
    'Sokoto - Industrial Layout',
    'Zamfara - Gusau Commercial',
    'Kano - Bompai & Challawa',
    'Kaduna - Kakuri & Kudenda',
    'Katsina - Industrial Zone',
    'Jigawa - Dutse & Hadejia'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const estimatedValueNaira = askingPricePerKg * weightKg;

    onSubmitListing({
      title,
      fabricatorName,
      fabricatorCompany,
      metalCategory,
      grade,
      weightKg,
      askingPricePerKg,
      estimatedValueNaira,
      region,
      address,
      phone,
      description,
      requiresPickup,
      photos: [
        'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80'
      ]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#2B4C7E] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#E67E22] rounded-lg text-white">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Post Fabricator Scrap Lot</h3>
              <p className="text-[11px] text-slate-300">Publish available scrap to certified buyers nationwide</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Scrap Lot Headline Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              />
            </div>

            {/* Metal Category */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Metal Category
              </label>
              <select
                value={metalCategory}
                onChange={(e) => setMetalCategory(e.target.value as MetalCategory)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Material Grade / Quality
              </label>
              <input
                type="text"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Scrap Weight (KG)
              </label>
              <input
                type="number"
                required
                min="1"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-[#2B4C7E]"
              />
            </div>

            {/* Asking Price per KG */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Asking Rate (₦ per KG)
              </label>
              <input
                type="number"
                required
                min="1"
                value={askingPricePerKg}
                onChange={(e) => setAskingPricePerKg(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-[#E67E22]"
              />
            </div>

            {/* Total Valuation Preview Box */}
            <div className="sm:col-span-2 bg-blue-50/80 p-3.5 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 font-semibold block text-[10px]">Calculated Fair Value</span>
                <span className="text-lg font-black text-[#2B4C7E]">
                  ₦{(askingPricePerKg * weightKg).toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                Index Linked
              </span>
            </div>

            {/* Fabricator Info */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Workshop / Company Name
              </label>
              <input
                type="text"
                required
                value={fabricatorCompany}
                onChange={(e) => setFabricatorCompany(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Contact Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* Region */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Region / Industrial Zone
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as NigerianRegion)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-800"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Exact Yard Address for Pickup
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Material Description & Sorting Details
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* Pickup Checkbox */}
            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="reqPickup"
                checked={requiresPickup}
                onChange={(e) => setRequiresPickup(e.target.checked)}
                className="w-4 h-4 rounded text-[#2B4C7E]"
              />
              <label htmlFor="reqPickup" className="font-bold text-slate-700 cursor-pointer">
                Requires Buyer Site Truck Pickup
              </label>
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-colors mt-4"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Publish Scrap Lot to Certified Dealers</span>
          </button>

        </form>

      </div>
    </div>
  );
};
