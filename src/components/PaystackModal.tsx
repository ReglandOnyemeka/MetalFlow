import React, { useState } from 'react';
import { ScrapListing, ScrapOffer } from '../types';
import {
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Zap,
  ArrowRight,
  Receipt
} from 'lucide-react';

interface PaystackModalProps {
  listing: ScrapListing | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitOffer: (offerData: Partial<ScrapOffer>) => void;
}

export const PaystackModal: React.FC<PaystackModalProps> = ({
  listing,
  isOpen,
  onClose,
  onSubmitOffer
}) => {
  if (!isOpen || !listing) return null;

  const [offeredPricePerKg, setOfferedPricePerKg] = useState<number>(listing.askingPricePerKg || 2450);
  const [depositPercent, setDepositPercent] = useState<number>(10); // 10% escrow deposit
  const [paymentProvider, setPaymentProvider] = useState<'Paystack' | 'Flutterwave' | 'Cash on Pickup'>('Paystack');
  const [dealerName, setDealerName] = useState<string>('Alhaji Bashir Garba');
  const [dealerCompany, setDealerCompany] = useState<string>('Arewa Metals & Extrusions Hub');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [txnRef, setTxnRef] = useState<string>('');

  const totalAmountNaira = offeredPricePerKg * listing.weightKg;
  const depositAmountNaira = Math.round((totalAmountNaira * depositPercent) / 100);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedRef = `PSTK-SCRAP-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnRef(generatedRef);
      setIsProcessing(false);
      setPaymentSuccess(true);

      onSubmitOffer({
        listingId: listing.id,
        dealerName,
        dealerCompany,
        offeredPricePerKg,
        totalAmountNaira,
        depositPaidNaira: depositAmountNaira,
        paymentProvider
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="bg-[#2B4C7E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#E67E22] rounded-lg text-white">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Paystack Escrow Commitment</h3>
              <p className="text-[11px] text-slate-300">Lock deposit to secure fabricator scrap lot</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          /* Payment Success Confirmation View */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase">
                Escrow Lock Success
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                ₦{depositAmountNaira.toLocaleString()} Secured
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Transaction Reference: <strong className="text-slate-900">{txnRef}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Scrap Lot:</span>
                <span className="font-bold truncate max-w-[200px]">{listing.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Offered Rate:</span>
                <span className="font-bold">₦{offeredPricePerKg.toLocaleString()} / kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Lot Value:</span>
                <span className="font-bold text-[#2B4C7E]">₦{totalAmountNaira.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span className="text-slate-500">Balance at Site Pickup:</span>
                <span className="font-extrabold text-[#E67E22]">
                  ₦{(totalAmountNaira - depositAmountNaira).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#2B4C7E] hover:bg-[#1A3154] text-white font-bold py-3 rounded-xl text-xs"
            >
              Close & View Updated Offer Status
            </button>
          </div>
        ) : (
          /* Paystack Deposit Checkout Form */
          <form onSubmit={handlePay} className="p-6 space-y-4 text-xs">
            
            {/* Listing Target Card */}
            <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200/80 space-y-1">
              <span className="text-[10px] font-bold text-[#2B4C7E] uppercase">Target Lot:</span>
              <h4 className="font-extrabold text-slate-900 text-sm">{listing.title}</h4>
              <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                <span>Weight: {listing.weightKg.toLocaleString()} kg</span>
                <span>Asking Rate: ₦{listing.askingPricePerKg.toLocaleString()}/kg</span>
              </div>
            </div>

            {/* Offer Rate Input */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                1. Your Offered Rate per KG (₦)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">₦</span>
                <input
                  type="number"
                  required
                  value={offeredPricePerKg}
                  onChange={(e) => setOfferedPricePerKg(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 font-bold text-[#2B4C7E] bg-slate-50 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                />
              </div>
            </div>

            {/* Deposit Percentage Switcher */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                2. Commitment Escrow Deposit Amount
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDepositPercent(pct)}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      depositPercent === pct
                        ? 'border-[#2B4C7E] bg-[#2B4C7E] text-white'
                        : 'border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {pct}% Deposit (₦{Math.round((totalAmountNaira * pct) / 100).toLocaleString()})
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Provider Options */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                3. Payment Method Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Paystack', label: 'Paystack Card/USSD' },
                  { name: 'Flutterwave', label: 'Flutterwave Bank' },
                  { name: 'Cash on Pickup', label: 'Cash Guarantee' }
                ].map((prov) => (
                  <button
                    key={prov.name}
                    type="button"
                    onClick={() => setPaymentProvider(prov.name as any)}
                    className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all ${
                      paymentProvider === prov.name
                        ? 'border-[#E67E22] bg-amber-50 text-[#E67E22]'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    {prov.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buyer Contact Info */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-700">
                4. Purchasing Dealer Information
              </label>
              <input
                type="text"
                required
                placeholder="Dealer Company Name"
                value={dealerCompany}
                onChange={(e) => setDealerCompany(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            {/* Pay Action Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Locking Escrow Deposit via {paymentProvider}...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Lock ₦{depositAmountNaira.toLocaleString()} via {paymentProvider}</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Protected by Paystack Escrow. Deposit released only after site scale verification.
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
