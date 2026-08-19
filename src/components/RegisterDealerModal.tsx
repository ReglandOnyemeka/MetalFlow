import React, { useState } from 'react';
import { Dealer, MetalCategory, NigerianRegion } from '../types';
import { X, ShieldCheck, CheckCircle2, Building, Scale, Truck, Award } from 'lucide-react';

interface RegisterDealerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitDealer: (dealerData: Partial<Dealer>) => void;
}

export const RegisterDealerModal: React.FC<RegisterDealerModalProps> = ({
  isOpen,
  onClose,
  onSubmitDealer
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState<string>('Alhaji Bashir Garba');
  const [company, setCompany] = useState<string>('Kebbi & Kano Industrial Smelting Ltd');
  const [region, setRegion] = useState<NigerianRegion>('Kebbi - Birnin Kebbi / Jega');
  const [address, setAddress] = useState<string>('Haliru Abdu Secretariat Road, Birnin Kebbi, Kebbi State');
  const [phone, setPhone] = useState<string>('09038784064');
  const [whatsapp, setWhatsapp] = useState<string>('2349038784064');
  const [email, setEmail] = useState<string>('odeyemisamson58@gmail.com');
  const [acceptedMetals, setAcceptedMetals] = useState<MetalCategory[]>([
    'Aluminum',
    'Copper',
    'Brass',
    'Steel'
  ]);
  const [maxDailyCapacityTons, setMaxDailyCapacityTons] = useState<number>(60);
  const [hasWeighingBridge, setHasWeighingBridge] = useState<boolean>(true);
  const [providesPickup, setProvidesPickup] = useState<boolean>(true);
  const [payoutSpeed, setPayoutSpeed] = useState<Dealer['payoutSpeed']>('Instant Cash');

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

  const toggleMetal = (metal: MetalCategory) => {
    if (acceptedMetals.includes(metal)) {
      setAcceptedMetals(acceptedMetals.filter((m) => m !== metal));
    } else {
      setAcceptedMetals([...acceptedMetals, metal]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmitDealer({
      name,
      company,
      region,
      address,
      phone,
      whatsapp,
      email,
      acceptedMetals,
      maxDailyCapacityTons,
      hasWeighingBridge,
      providesPickup,
      payoutSpeed
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1A3154] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Register Certified Scrap Yard</h3>
              <p className="text-[11px] text-slate-300">Join NSMDA certified buyers network</p>
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
            
            {/* Company Name */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Scrap Yard / Company Name
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900"
              />
            </div>

            {/* Proprietor Name */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Proprietor / Yard Manager Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Industrial Region
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
                Full Physical Yard Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                WhatsApp Phone Line
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            {/* Accepted Metals Checkboxes */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Accepted Metal Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((metal) => {
                  const isChecked = acceptedMetals.includes(metal);
                  return (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => toggleMetal(metal)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isChecked
                          ? 'bg-[#2B4C7E] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : ''}{metal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Capacity & Weighing Bridge */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Daily Processing Capacity (Tons/Day)
              </label>
              <input
                type="number"
                required
                value={maxDailyCapacityTons}
                onChange={(e) => setMaxDailyCapacityTons(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-[#2B4C7E]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Payout Method Guaranteed
              </label>
              <select
                value={payoutSpeed}
                onChange={(e) => setPayoutSpeed(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold"
              >
                <option value="Instant Cash">Instant Cash</option>
                <option value="Bank Transfer (< 30 mins)">Bank Transfer (&lt; 30 mins)</option>
                <option value="Escrow Guarantee">Escrow Guarantee</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={hasWeighingBridge}
                  onChange={(e) => setHasWeighingBridge(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <span>Yard has Certified Digital Weighbridge</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={providesPickup}
                  onChange={(e) => setProvidesPickup(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <span>Provides Site Truck Pickup</span>
              </label>
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-colors mt-4"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Submit Certified Dealer Registration</span>
          </button>

        </form>

      </div>
    </div>
  );
};
