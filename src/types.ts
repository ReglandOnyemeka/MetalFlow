/**
 * MetalFlow Core Data Types
 */

export type MetalCategory = 
  | 'Aluminum'
  | 'Copper'
  | 'Brass'
  | 'Steel'
  | 'Stainless Steel'
  | 'Lead & Batteries'
  | 'Zinc & Alloys';

export type NigerianRegion =
  | 'Kebbi - Birnin Kebbi / Jega'
  | 'Sokoto - Industrial Layout'
  | 'Zamfara - Gusau Commercial'
  | 'Kano - Bompai & Challawa'
  | 'Kaduna - Kakuri & Kudenda'
  | 'Katsina - Industrial Zone'
  | 'Jigawa - Dutse & Hadejia';

export interface MetalPriceItem {
  id: string;
  category: MetalCategory;
  grade: string; // e.g. "Clean Extrusions (6063)", "Bare Bright Wire (Millberry)"
  pricePerKg: number; // in ₦ Naira
  unit: 'kg';
  change24h: number; // Naira change
  changePercent: number; // e.g. 2.5 for +2.5%
  lastUpdated: string;
  purityPercentage: number;
  description: string;
  benchmarkSource: string;
  regionalAdjustment: { [region: string]: number }; // percentage offset by region
}

export interface PriceHistoryPoint {
  date: string;
  aluminum: number;
  copper: number;
  brass: number;
  steel: number;
  stainless: number;
}

export interface Dealer {
  id: string;
  name: string;
  company: string;
  isVerified: boolean;
  certificationId: string;
  rating: number;
  reviewCount: number;
  region: NigerianRegion;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  acceptedMetals: MetalCategory[];
  minWeightKg: number;
  maxDailyCapacityTons: number;
  payoutSpeed: 'Instant Cash' | 'Bank Transfer (< 30 mins)' | 'Escrow Guarantee';
  hasWeighingBridge: boolean;
  providesPickup: boolean;
  verifiedBadgeYear: number;
  verifiedBy: string;
}

export interface ScrapListing {
  id: string;
  title: string;
  fabricatorName: string;
  fabricatorCompany: string;
  metalCategory: MetalCategory;
  grade: string;
  weightKg: number;
  estimatedValueNaira: number;
  askingPricePerKg: number;
  region: NigerianRegion;
  address: string;
  phone: string;
  description: string;
  status: 'available' | 'under_negotiation' | 'sold';
  photos: string[];
  postedAt: string;
  requiresPickup: boolean;
  offersCount: number;
  verifiedQuality: boolean;
}

export interface ScrapOffer {
  id: string;
  listingId: string;
  dealerId: string;
  dealerName: string;
  dealerCompany: string;
  offeredPricePerKg: number;
  totalAmountNaira: number;
  depositPaidNaira: number;
  status: 'pending' | 'accepted' | 'escrow_locked' | 'completed' | 'declined';
  createdAt: string;
  paymentProvider?: 'Paystack' | 'Flutterwave' | 'Cash on Pickup';
}

export interface PriceUpdateLog {
  id: string;
  metalCategory: string;
  grade: string;
  oldPrice: number;
  newPrice: number;
  updatedBy: string;
  reason: string;
  timestamp: string;
}

export type UserRole = 'fabricator' | 'dealer' | 'admin';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'price_up' | 'price_down' | 'offer' | 'info' | 'success';
  timestamp: string;
}
