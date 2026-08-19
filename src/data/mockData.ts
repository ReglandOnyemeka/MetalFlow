import { MetalPriceItem, Dealer, ScrapListing, PriceHistoryPoint, PriceUpdateLog } from '../types';

export const APP_CONTACT_INFO = {
  name: 'MetalFlow Nigeria',
  email: 'odeyemisamson58@gmail.com',
  phone: '09038784064',
  address: 'Birnin kebbi, Nigeria.',
  headquarters: 'Birnin Kebbi, Kebbi State, North-West Nigeria'
};

export const NORTH_WEST_HUBS = [
  { name: 'Kebbi (Birnin Kebbi / Jega)', tag: 'HQ & Smelter Hub', state: 'Kebbi' },
  { name: 'Sokoto (Industrial Layout)', tag: 'Regional Depot', state: 'Sokoto' },
  { name: 'Zamfara (Gusau Central)', tag: 'Mining & Scrap Center', state: 'Zamfara' },
  { name: 'Kano (Bompai & Challawa)', tag: 'Mega Smelter Zone', state: 'Kano' },
  { name: 'Kaduna (Kakuri & Kudenda)', tag: 'Industrial Foundry', state: 'Kaduna' },
  { name: 'Katsina (Industrial Zone)', tag: 'Extrusion Yard', state: 'Katsina' },
  { name: 'Jigawa (Dutse & Hadejia)', tag: 'Agro-Metal Hub', state: 'Jigawa' }
];

export const INITIAL_PRICES: MetalPriceItem[] = [
  {
    id: 'p-1',
    category: 'Aluminum',
    grade: 'Clean Architectural Extrusions (6063)',
    pricePerKg: 2450,
    unit: 'kg',
    change24h: 80,
    changePercent: 3.38,
    lastUpdated: 'Today, 08:30 AM',
    purityPercentage: 98.5,
    description: 'Clean window frames, door profiles, structural sections without steel screws or plastic inserts.',
    benchmarkSource: 'LME + Birnin Kebbi / Kano Smelter Average',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -15,
      'Zamfara - Gusau Commercial': -20,
      'Kano - Bompai & Challawa': 40,
      'Kaduna - Kakuri & Kudenda': 25,
      'Katsina - Industrial Zone': -10,
      'Jigawa - Dutse & Hadejia': -25
    }
  },
  {
    id: 'p-2',
    category: 'Aluminum',
    grade: 'Sheet, Cast & Utensils Mix',
    pricePerKg: 1950,
    unit: 'kg',
    change24h: 40,
    changePercent: 2.09,
    lastUpdated: 'Today, 08:30 AM',
    purityPercentage: 92.0,
    description: 'Roofing sheets, pots, automotive castings, engine blocks (oil-drained).',
    benchmarkSource: 'North-West Foundry Index',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -10,
      'Zamfara - Gusau Commercial': -15,
      'Kano - Bompai & Challawa': 30,
      'Kaduna - Kakuri & Kudenda': 20,
      'Katsina - Industrial Zone': -10,
      'Jigawa - Dutse & Hadejia': -20
    }
  },
  {
    id: 'p-3',
    category: 'Aluminum',
    grade: 'UBC Cans (Baled / Dense)',
    pricePerKg: 1650,
    unit: 'kg',
    change24h: -15,
    changePercent: -0.90,
    lastUpdated: 'Today, 08:15 AM',
    purityPercentage: 88.0,
    description: 'Crushed and baled beverage cans. Must be free of dirt, sand, and liquid residue.',
    benchmarkSource: 'Recycling Export Benchmark',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -10,
      'Zamfara - Gusau Commercial': -15,
      'Kano - Bompai & Challawa': 25,
      'Kaduna - Kakuri & Kudenda': 15,
      'Katsina - Industrial Zone': -5,
      'Jigawa - Dutse & Hadejia': -15
    }
  },
  {
    id: 'p-4',
    category: 'Copper',
    grade: 'Bare Bright Wire (Millberry 99.9%)',
    pricePerKg: 12800,
    unit: 'kg',
    change24h: 350,
    changePercent: 2.81,
    lastUpdated: 'Today, 09:00 AM',
    purityPercentage: 99.9,
    description: 'Uncoated, unalloyed bare copper wire, clean without insulation, solder, or oxidation.',
    benchmarkSource: 'LME Spot + North-West Smelter Index',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -50,
      'Zamfara - Gusau Commercial': -80,
      'Kano - Bompai & Challawa': 120,
      'Kaduna - Kakuri & Kudenda': 90,
      'Katsina - Industrial Zone': -40,
      'Jigawa - Dutse & Hadejia': -70
    }
  },
  {
    id: 'p-5',
    category: 'Copper',
    grade: 'Heavy Copper Wire & Pipe (Birch/Cliff)',
    pricePerKg: 11200,
    unit: 'kg',
    change24h: 200,
    changePercent: 1.82,
    lastUpdated: 'Today, 09:00 AM',
    purityPercentage: 95.0,
    description: 'Clean heavy copper pipe, transformer busbars, light enamel coating or oxidation allowed.',
    benchmarkSource: 'Birnin Kebbi Metal Market Board',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -40,
      'Zamfara - Gusau Commercial': -60,
      'Kano - Bompai & Challawa': 100,
      'Kaduna - Kakuri & Kudenda': 70,
      'Katsina - Industrial Zone': -30,
      'Jigawa - Dutse & Hadejia': -50
    }
  },
  {
    id: 'p-6',
    category: 'Brass',
    grade: 'Yellow Brass Scrap (Honey Grade)',
    pricePerKg: 7800,
    unit: 'kg',
    change24h: 120,
    changePercent: 1.56,
    lastUpdated: 'Today, 08:45 AM',
    purityPercentage: 65.0,
    description: 'Brass castings, plumbing fittings, valves, door hardware, radiator cores without iron.',
    benchmarkSource: 'Kano Foundry Association',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -30,
      'Zamfara - Gusau Commercial': -40,
      'Kano - Bompai & Challawa': 60,
      'Kaduna - Kakuri & Kudenda': 40,
      'Katsina - Industrial Zone': -20,
      'Jigawa - Dutse & Hadejia': -35
    }
  },
  {
    id: 'p-7',
    category: 'Steel',
    grade: 'Heavy Melting Steel (HMS 1 & 2)',
    pricePerKg: 480,
    unit: 'kg',
    change24h: 15,
    changePercent: 3.23,
    lastUpdated: 'Today, 07:50 AM',
    purityPercentage: 90.0,
    description: 'Wrought iron and steel scrap 1/4 inch thickness and over, structural beams, heavy machinery parts.',
    benchmarkSource: 'Kaduna Rolling Mill Index',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -10,
      'Zamfara - Gusau Commercial': -15,
      'Kano - Bompai & Challawa': 20,
      'Kaduna - Kakuri & Kudenda': 25,
      'Katsina - Industrial Zone': -5,
      'Jigawa - Dutse & Hadejia': -15
    }
  },
  {
    id: 'p-8',
    category: 'Steel',
    grade: 'Light Steel Offcuts & Roofing Sheets',
    pricePerKg: 350,
    unit: 'kg',
    change24h: 5,
    changePercent: 1.45,
    lastUpdated: 'Today, 07:50 AM',
    purityPercentage: 82.0,
    description: 'Fabrication offcuts, sheet metal clippings, metal drums, corrugated roofing scrap.',
    benchmarkSource: 'North-West Smelter Rate',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -5,
      'Zamfara - Gusau Commercial': -10,
      'Kano - Bompai & Challawa': 15,
      'Kaduna - Kakuri & Kudenda': 15,
      'Katsina - Industrial Zone': -5,
      'Jigawa - Dutse & Hadejia': -10
    }
  },
  {
    id: 'p-9',
    category: 'Stainless Steel',
    grade: 'Stainless Steel 304 Grade',
    pricePerKg: 2150,
    unit: 'kg',
    change24h: 60,
    changePercent: 2.87,
    lastUpdated: 'Today, 08:20 AM',
    purityPercentage: 98.0,
    description: 'Non-magnetic stainless steel, kitchen equipment, industrial tanks, food grade pipes.',
    benchmarkSource: 'Kaduna & Kano Industrial Yard',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -20,
      'Zamfara - Gusau Commercial': -30,
      'Kano - Bompai & Challawa': 50,
      'Kaduna - Kakuri & Kudenda': 40,
      'Katsina - Industrial Zone': -15,
      'Jigawa - Dutse & Hadejia': -25
    }
  },
  {
    id: 'p-10',
    category: 'Lead & Batteries',
    grade: 'Scrap Lead Acid Batteries (Whole In-Tact)',
    pricePerKg: 1100,
    unit: 'kg',
    change24h: 30,
    changePercent: 2.80,
    lastUpdated: 'Today, 08:10 AM',
    purityPercentage: 70.0,
    description: 'Automotive, inverter, and solar backup batteries. Intact cases with fluid.',
    benchmarkSource: 'North-West Battery Recyclers Guild',
    regionalAdjustment: {
      'Kebbi - Birnin Kebbi / Jega': 0,
      'Sokoto - Industrial Layout': -15,
      'Zamfara - Gusau Commercial': -20,
      'Kano - Bompai & Challawa': 35,
      'Kaduna - Kakuri & Kudenda': 30,
      'Katsina - Industrial Zone': -10,
      'Jigawa - Dutse & Hadejia': -20
    }
  }
];

export const HISTORICAL_PRICE_TRENDS: PriceHistoryPoint[] = [
  { date: 'Jul 01', aluminum: 2150, copper: 11200, brass: 7100, steel: 410, stainless: 1950 },
  { date: 'Jul 08', aluminum: 2200, copper: 11500, brass: 7250, steel: 420, stainless: 1980 },
  { date: 'Jul 15', aluminum: 2280, copper: 11900, brass: 7400, steel: 440, stainless: 2020 },
  { date: 'Jul 22', aluminum: 2320, copper: 12100, brass: 7550, steel: 450, stainless: 2060 },
  { date: 'Jul 29', aluminum: 2380, copper: 12450, brass: 7680, steel: 465, stainless: 2100 },
  { date: 'Aug 05', aluminum: 2450, copper: 12800, brass: 7800, steel: 480, stainless: 2150 }
];

export const INITIAL_DEALERS: Dealer[] = [
  {
    id: 'd-101',
    name: 'Alhaji Bashir Garba',
    company: 'Kebbi & Kano Industrial Smelting Ltd',
    isVerified: true,
    certificationId: 'MF-DEALER-2026-9081',
    rating: 4.95,
    reviewCount: 142,
    region: 'Kebbi - Birnin Kebbi / Jega',
    address: 'Haliru Abdu Secretariat Road, Birnin Kebbi, Kebbi State',
    phone: '09038784064',
    whatsapp: '2349038784064',
    email: 'odeyemisamson58@gmail.com',
    acceptedMetals: ['Aluminum', 'Copper', 'Brass', 'Steel', 'Stainless Steel'],
    minWeightKg: 50,
    maxDailyCapacityTons: 60,
    payoutSpeed: 'Instant Cash',
    hasWeighingBridge: true,
    providesPickup: true,
    verifiedBadgeYear: 2026,
    verifiedBy: 'Nigerian Scrap Metal Dealers Association (NSMDA North-West)'
  },
  {
    id: 'd-102',
    name: 'Malam Ibrahim Danjuma',
    company: 'Sokoto Clean Metals & Foundry',
    isVerified: true,
    certificationId: 'MF-DEALER-2026-4421',
    rating: 4.85,
    reviewCount: 98,
    region: 'Sokoto - Industrial Layout',
    address: 'Plot 7, Industrial Layout, Western Bypass, Sokoto State',
    phone: '+234 803 224 5511',
    whatsapp: '2348032245511',
    email: 'trade@sokotometals.ng',
    acceptedMetals: ['Aluminum', 'Lead & Batteries', 'Copper', 'Brass'],
    minWeightKg: 50,
    maxDailyCapacityTons: 40,
    payoutSpeed: 'Bank Transfer (< 30 mins)',
    hasWeighingBridge: true,
    providesPickup: true,
    verifiedBadgeYear: 2026,
    verifiedBy: 'NSMDA Sokoto Zonal Chapter'
  },
  {
    id: 'd-103',
    name: 'Alhaji Mustapha Bompai',
    company: 'Arewa Extrusions & Smelting Mega Yard',
    isVerified: true,
    certificationId: 'MF-DEALER-2026-1102',
    rating: 4.98,
    reviewCount: 280,
    region: 'Kano - Bompai & Challawa',
    address: 'Plot 18, Bompai Industrial Area, Kano State',
    phone: '+234 802 900 3344',
    whatsapp: '2348029003344',
    email: 'info@arewasmelters.com',
    acceptedMetals: ['Aluminum', 'Copper', 'Brass', 'Stainless Steel', 'Steel'],
    minWeightKg: 100,
    maxDailyCapacityTons: 150,
    payoutSpeed: 'Escrow Guarantee',
    hasWeighingBridge: true,
    providesPickup: true,
    verifiedBadgeYear: 2026,
    verifiedBy: 'Kano Smelters & Foundry Union'
  },
  {
    id: 'd-104',
    name: 'Engr. Haruna Shehu',
    company: 'Kaduna Rolling Mill & Scrap Recyclers',
    isVerified: true,
    certificationId: 'MF-DEALER-2026-3099',
    rating: 4.8,
    reviewCount: 84,
    region: 'Kaduna - Kakuri & Kudenda',
    address: 'Kudenda Industrial Layout, Kaduna State',
    phone: '+234 805 112 8899',
    whatsapp: '2348051128899',
    email: 'kaduna@rollingmillrecyclers.ng',
    acceptedMetals: ['Stainless Steel', 'Steel', 'Copper', 'Aluminum'],
    minWeightKg: 150,
    maxDailyCapacityTons: 90,
    payoutSpeed: 'Instant Cash',
    hasWeighingBridge: true,
    providesPickup: true,
    verifiedBadgeYear: 2026,
    verifiedBy: 'NSMDA North-West Chapter'
  },
  {
    id: 'd-105',
    name: 'Alhaji Lawal Gusau',
    company: 'Zamfara Mineral & Scrap Depot',
    isVerified: true,
    certificationId: 'MF-DEALER-2026-7812',
    rating: 4.78,
    reviewCount: 64,
    region: 'Zamfara - Gusau Commercial',
    address: 'Commercial Road, Near Central Market, Gusau, Zamfara State',
    phone: '+234 806 778 1234',
    whatsapp: '2348067781234',
    email: 'gusau.metals@gmail.com',
    acceptedMetals: ['Aluminum', 'Brass', 'Steel', 'Lead & Batteries'],
    minWeightKg: 30,
    maxDailyCapacityTons: 30,
    payoutSpeed: 'Bank Transfer (< 30 mins)',
    hasWeighingBridge: true,
    providesPickup: true,
    verifiedBadgeYear: 2026,
    verifiedBy: 'Zamfara Fabricators & Recyclers Association'
  },
  {
    id: 'd-106',
    name: 'Malam Kabir Katsina',
    company: 'Katsina Architectural Scrap Yard',
    isVerified: true,
    certificationId: 'MF-DEALER-2026-6701',
    rating: 4.88,
    reviewCount: 72,
    region: 'Katsina - Industrial Zone',
    address: 'Kano-Katsina Highway, Industrial Zone, Katsina State',
    phone: '+234 814 330 9988',
    whatsapp: '2348143309988',
    email: 'katsina.scrap@metalflow.ng',
    acceptedMetals: ['Aluminum', 'Copper', 'Stainless Steel'],
    minWeightKg: 50,
    maxDailyCapacityTons: 45,
    payoutSpeed: 'Instant Cash',
    hasWeighingBridge: true,
    providesPickup: true,
    verifiedBadgeYear: 2026,
    verifiedBy: 'NSMDA North-West'
  }
];

export const INITIAL_LISTINGS: ScrapListing[] = [
  {
    id: 'lst-1',
    title: 'Clean Aluminum Window Extrusions Lot (1,250 kg)',
    fabricatorName: 'Kebbi Modern Fabricators',
    fabricatorCompany: 'Birnin Kebbi Glazing & Aluminum Workshop',
    metalCategory: 'Aluminum',
    grade: 'Clean Architectural Extrusions (6063)',
    weightKg: 1250,
    estimatedValueNaira: 3062500,
    askingPricePerKg: 2450,
    region: 'Kebbi - Birnin Kebbi / Jega',
    address: 'Haliru Abdu Secretariat Road, Birnin Kebbi, Kebbi State',
    phone: '09038784064',
    description: 'Offcuts and dismantled 6063 clean aluminum window frames from state hospital project. Zero iron contamination, sorted and bundled in 50kg straps.',
    status: 'available',
    photos: [
      'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80'
    ],
    postedAt: '1 hour ago',
    requiresPickup: true,
    offersCount: 3,
    verifiedQuality: true
  },
  {
    id: 'lst-2',
    title: 'Bare Bright Heavy Copper Wire & Transformer Busbars (480 kg)',
    fabricatorName: 'Engr. Aliyu Sokoto',
    fabricatorCompany: 'Sokoto Power Services & Electrical',
    metalCategory: 'Copper',
    grade: 'Bare Bright Wire (Millberry 99.9%)',
    weightKg: 480,
    estimatedValueNaira: 6144000,
    askingPricePerKg: 12800,
    region: 'Sokoto - Industrial Layout',
    address: 'Industrial Area, Western Bypass, Sokoto',
    phone: '+234 812 444 5566',
    description: 'High-purity Millberry bare bright copper wire salvaged from sub-station upgrade. Certified 99.9% purity test available.',
    status: 'available',
    photos: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80'
    ],
    postedAt: '3 hours ago',
    requiresPickup: false,
    offersCount: 5,
    verifiedQuality: true
  },
  {
    id: 'lst-3',
    title: 'Heavy Structural Steel Beams & Angle Scrap (4,500 kg)',
    fabricatorName: 'Alhaji Usman & Sons',
    fabricatorCompany: 'Kano Structural Steel Works',
    metalCategory: 'Steel',
    grade: 'Heavy Melting Steel (HMS 1 & 2)',
    weightKg: 4500,
    estimatedValueNaira: 2160000,
    askingPricePerKg: 480,
    region: 'Kano - Bompai & Challawa',
    address: 'Bompai Industrial Area, Kano',
    phone: '+234 802 777 8899',
    description: 'Demolition offcuts of H-beams, I-beams, and thick steel plates (10mm+). Crane loading available on site.',
    status: 'available',
    photos: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    postedAt: '5 hours ago',
    requiresPickup: true,
    offersCount: 2,
    verifiedQuality: true
  },
  {
    id: 'lst-4',
    title: 'Yellow Brass Valves & Plumbing Scrap (320 kg)',
    fabricatorName: 'Kaduna Precision Plumbing',
    fabricatorCompany: 'Kaduna Water Works Fabricators',
    metalCategory: 'Brass',
    grade: 'Yellow Brass Scrap (Honey Grade)',
    weightKg: 320,
    estimatedValueNaira: 2496000,
    askingPricePerKg: 7800,
    region: 'Kaduna - Kakuri & Kudenda',
    address: 'Kudenda Industrial Layout, Kaduna',
    phone: '+234 813 999 0011',
    description: 'Assorted brass valve bodies, copper-brass alloy fittings, and machined turnings. Sorted in drums.',
    status: 'available',
    photos: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    postedAt: 'Yesterday',
    requiresPickup: false,
    offersCount: 4,
    verifiedQuality: false
  },
  {
    id: 'lst-5',
    title: 'Gusau Mining Cable Copper Offcuts (220 kg)',
    fabricatorName: 'Zamfara Equipment Maintenance',
    fabricatorCompany: 'Gusau Industrial Workshops',
    metalCategory: 'Copper',
    grade: 'Heavy Copper Wire & Pipe (Birch/Cliff)',
    weightKg: 220,
    estimatedValueNaira: 2464000,
    askingPricePerKg: 11200,
    region: 'Zamfara - Gusau Commercial',
    address: 'Commercial Road, Gusau, Zamfara State',
    phone: '+234 807 555 4321',
    description: 'Stripped heavy copper conductors and thick busbar sections from heavy equipment overhaul.',
    status: 'available',
    photos: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80'
    ],
    postedAt: '2 days ago',
    requiresPickup: true,
    offersCount: 2,
    verifiedQuality: true
  }
];

export const INITIAL_PRICE_LOGS: PriceUpdateLog[] = [
  {
    id: 'log-1',
    metalCategory: 'Aluminum',
    grade: 'Clean Architectural Extrusions (6063)',
    oldPrice: 2370,
    newPrice: 2450,
    updatedBy: 'Admin (MetalFlow Index)',
    reason: 'LME Global Aluminum rally + High local extruder demand in North-West hubs',
    timestamp: 'Today, 08:30 AM'
  },
  {
    id: 'log-2',
    metalCategory: 'Copper',
    grade: 'Bare Bright Wire (Millberry 99.9%)',
    oldPrice: 12450,
    newPrice: 12800,
    updatedBy: 'Admin (MetalFlow Index)',
    reason: 'FX adjustment & Kano/Birnin Kebbi smelter premium hike',
    timestamp: 'Today, 09:00 AM'
  }
];

export const SUPABASE_SQL_SCHEMA = `-- ===================================================
-- METALFLOW DATABASE SCHEMA (PostgreSQL / Firebase)
-- Transparent Scrap Metal Index & Marketplace
-- ===================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Table: scrap_prices (Daily Benchmark Index)
CREATE TABLE IF NOT EXISTS public.scrap_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(50) NOT NULL,
  grade VARCHAR(150) NOT NULL,
  price_per_kg NUMERIC(12, 2) NOT NULL,
  unit VARCHAR(10) DEFAULT 'kg',
  change_24h NUMERIC(10, 2) DEFAULT 0,
  change_percent NUMERIC(5, 2) DEFAULT 0,
  purity_percentage NUMERIC(5, 2) DEFAULT 95.0,
  description TEXT,
  benchmark_source VARCHAR(100),
  regional_adjustments JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: dealers (Certified Scrap Buyers & Yards)
CREATE TABLE IF NOT EXISTS public.dealers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  company VARCHAR(150) NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  certification_id VARCHAR(50) UNIQUE NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 4.8,
  review_count INT DEFAULT 0,
  region VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(30) NOT NULL,
  whatsapp VARCHAR(30),
  email VARCHAR(100),
  accepted_metals JSONB DEFAULT '[]'::jsonb,
  min_weight_kg NUMERIC(10, 2) DEFAULT 50,
  max_daily_capacity_tons NUMERIC(10, 2) DEFAULT 20,
  payout_speed VARCHAR(50) DEFAULT 'Instant Cash',
  has_weighing_bridge BOOLEAN DEFAULT TRUE,
  provides_pickup BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table: scrap_listings (Fabricator Scrap Lots)
CREATE TABLE IF NOT EXISTS public.scrap_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  fabricator_name VARCHAR(100) NOT NULL,
  fabricator_company VARCHAR(150),
  metal_category VARCHAR(50) NOT NULL,
  grade VARCHAR(150) NOT NULL,
  weight_kg NUMERIC(12, 2) NOT NULL,
  estimated_value_naira NUMERIC(14, 2) NOT NULL,
  asking_price_per_kg NUMERIC(12, 2) NOT NULL,
  region VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(30) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'available',
  photos JSONB DEFAULT '[]'::jsonb,
  requires_pickup BOOLEAN DEFAULT TRUE,
  verified_quality BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table: scrap_offers (Bids / Escrow Deposits)
CREATE TABLE IF NOT EXISTS public.scrap_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES public.scrap_listings(id) ON DELETE CASCADE,
  dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
  offered_price_per_kg NUMERIC(12, 2) NOT NULL,
  total_amount_naira NUMERIC(14, 2) NOT NULL,
  deposit_paid_naira NUMERIC(14, 2) DEFAULT 0,
  status VARCHAR(30) DEFAULT 'pending',
  payment_provider VARCHAR(50) DEFAULT 'Paystack',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Table: price_update_logs (Audit Trail for Price Changes)
CREATE TABLE IF NOT EXISTS public.price_update_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metal_category VARCHAR(50) NOT NULL,
  grade VARCHAR(150) NOT NULL,
  old_price NUMERIC(12, 2) NOT NULL,
  new_price NUMERIC(12, 2) NOT NULL,
  updated_by VARCHAR(100) DEFAULT 'Admin',
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;
