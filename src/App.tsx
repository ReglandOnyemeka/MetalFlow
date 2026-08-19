/**
 * MetalFlow - Scrap Metal & Aluminum Index & Marketplace
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MetalPriceItem,
  Dealer,
  ScrapListing,
  PriceUpdateLog,
  UserRole,
  ToastNotification,
  MetalCategory,
  ScrapOffer
} from './types';
import {
  INITIAL_PRICES,
  INITIAL_DEALERS,
  INITIAL_LISTINGS,
  INITIAL_PRICE_LOGS,
  APP_CONTACT_INFO
} from './data/mockData';

import { autoDb } from './services/dbService';

import { LiveTicker } from './components/LiveTicker';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { PriceBoardCalculator } from './components/PriceBoardCalculator';
import { DealerDirectoryListings } from './components/DealerDirectoryListings';
import { AdminControlPanel } from './components/AdminControlPanel';
import { PaystackModal } from './components/PaystackModal';
import { SupabaseModal } from './components/SupabaseModal';
import { PostScrapModal } from './components/PostScrapModal';
import { RegisterDealerModal } from './components/RegisterDealerModal';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  // Navigation & Role State
  const [currentView, setCurrentView] = useState<'landing' | 'calculator' | 'directory' | 'admin'>('landing');
  const [userRole, setUserRole] = useState<UserRole>('fabricator');

  // Core Data States
  const [prices, setPrices] = useState<MetalPriceItem[]>(INITIAL_PRICES);
  const [dealers, setDealers] = useState<Dealer[]>(INITIAL_DEALERS);
  const [listings, setListings] = useState<ScrapListing[]>(INITIAL_LISTINGS);
  const [logs, setLogs] = useState<PriceUpdateLog[]>(INITIAL_PRICE_LOGS);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Modal States
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);
  const [isPaystackModalOpen, setIsPaystackModalOpen] = useState<boolean>(false);
  const [isPostScrapModalOpen, setIsPostScrapModalOpen] = useState<boolean>(false);
  const [isRegisterDealerModalOpen, setIsRegisterDealerModalOpen] = useState<boolean>(false);

  // Selected Listing for Paystack Offer
  const [selectedListingForOffer, setSelectedListingForOffer] = useState<ScrapListing | null>(null);

  // Prefill data for post scrap lot from calculator
  const [prefillLotData, setPrefillLotData] = useState<{
    category?: MetalCategory;
    grade?: string;
    pricePerKg?: number;
    weightKg?: number;
  }>({});

  // Automatic Database Connection & Subscription Setup
  useEffect(() => {
    // 1. Initialize auto database engine
    autoDb.init();

    // 2. Real-time subscriptions
    const unsubPrices = autoDb.subscribePrices((livePrices) => {
      if (livePrices && livePrices.length > 0) setPrices(livePrices);
    });

    const unsubDealers = autoDb.subscribeDealers((liveDealers) => {
      if (liveDealers && liveDealers.length > 0) setDealers(liveDealers);
    });

    const unsubListings = autoDb.subscribeListings((liveListings) => {
      if (liveListings && liveListings.length > 0) setListings(liveListings);
    });

    const unsubLogs = autoDb.subscribeLogs((liveLogs) => {
      if (liveLogs && liveLogs.length > 0) setLogs(liveLogs);
    });

    return () => {
      unsubPrices();
      unsubDealers();
      unsubListings();
      unsubLogs();
    };
  }, []);

  // Helper Toast Alert Generator
  const addToast = (
    title: string,
    message: string,
    type: 'price_up' | 'price_down' | 'offer' | 'info' | 'success'
  ) => {
    const newToast: ToastNotification = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
      timestamp: 'Just now'
    };

    setToasts((prev) => [newToast, ...prev]);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 6000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handler: Update Benchmark Price (Admin)
  const handleUpdatePrice = async (
    id: string,
    newPrice: number,
    updatedBy: string,
    reason: string
  ) => {
    const oldItem = prices.find((p) => p.id === id);
    if (!oldItem) return;

    const diff = newPrice - oldItem.pricePerKg;
    const isUp = diff >= 0;

    await autoDb.updatePrice(id, newPrice, updatedBy, reason);

    addToast(
      `${oldItem.category} Benchmark ${isUp ? 'Increased' : 'Decreased'}`,
      `New Rate: ₦${newPrice.toLocaleString()}/kg (${isUp ? '+' : ''}₦${diff.toLocaleString()}/kg). Reason: ${reason}`,
      isUp ? 'price_up' : 'price_down'
    );
  };

  // Handler: Post New Scrap Lot (Fabricator)
  const handlePostListing = async (listingData: Partial<ScrapListing>) => {
    const newListing = await autoDb.createListing(listingData);

    addToast(
      'New Scrap Lot Published!',
      `Lot "${newListing.title}" (${newListing.weightKg} kg) is now visible to certified buyers across North-West hubs.`,
      'success'
    );

    setCurrentView('directory');
  };

  // Handler: Register Certified Dealer
  const handleRegisterDealer = async (dealerData: Partial<Dealer>) => {
    const newDealer = await autoDb.registerDealer(dealerData);

    addToast(
      'Yard Certified Successfully!',
      `${newDealer.company} registered with NSMDA License #${newDealer.certificationId}`,
      'success'
    );

    setCurrentView('directory');
  };

  // Handler: Submit Offer / Lock Paystack Escrow
  const handleSubmitOffer = async (offerData: Partial<ScrapOffer>) => {
    await autoDb.submitOffer(offerData);

    addToast(
      'Paystack Escrow Deposit Locked!',
      `₦${offerData.depositPaidNaira?.toLocaleString()} deposit secured for offer on lot. Site pickup code dispatched.`,
      'offer'
    );
  };

  // Handler: Select price from calculator to create lot directly
  const handleSelectPriceForLot = (
    category: MetalCategory,
    grade: string,
    pricePerKg: number,
    weightKg: number
  ) => {
    setPrefillLotData({
      category,
      grade,
      pricePerKg,
      weightKg
    });
    setIsPostScrapModalOpen(true);
  };

  // Price alert simulator for Admin testing
  const handleTriggerMockPriceAlert = () => {
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];
    const isUp = Math.random() > 0.4;
    const delta = isUp ? 120 : -60;
    const newRate = randomPrice.pricePerKg + delta;

    handleUpdatePrice(
      randomPrice.id,
      newRate,
      'North-West Ticker Desk',
      isUp ? 'Global LME copper rally & North-West smelter surge' : 'Local smelter inventory rebalancing'
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-800 flex flex-col font-sans selection:bg-[#E67E22] selection:text-white">
      
      {/* 1. Real-time Live Ticker */}
      <LiveTicker
        prices={prices}
        onSelectPrice={() => {
          setCurrentView('calculator');
        }}
      />

      {/* 2. Primary Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        onPostScrapClick={() => {
          setPrefillLotData({});
          setIsPostScrapModalOpen(true);
        }}
      />

      {/* 3. Main Views Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {currentView === 'landing' && (
          <HeroLanding
            prices={prices}
            onEnterApp={() => setCurrentView('calculator')}
            onPostScrap={() => {
              setPrefillLotData({});
              setIsPostScrapModalOpen(true);
            }}
            onBecomeDealer={() => setIsRegisterDealerModalOpen(true)}
          />
        )}

        {currentView === 'calculator' && (
          <PriceBoardCalculator
            prices={prices}
            onPostLotFromCalc={handleSelectPriceForLot}
            onSelectDealerView={() => setCurrentView('directory')}
          />
        )}

        {currentView === 'directory' && (
          <DealerDirectoryListings
            dealers={dealers}
            listings={listings}
            userRole={userRole}
            onPostScrapClick={() => {
              setPrefillLotData({});
              setIsPostScrapModalOpen(true);
            }}
            onRegisterDealerClick={() => setIsRegisterDealerModalOpen(true)}
            onMakeOfferClick={(listing) => {
              setSelectedListingForOffer(listing);
              setIsPaystackModalOpen(true);
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminControlPanel
            prices={prices}
            logs={logs}
            onUpdatePrice={handleUpdatePrice}
            onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
            onTriggerMockAlert={handleTriggerMockPriceAlert}
          />
        )}

      </main>

      {/* 4. Global Footer */}
      <footer className="bg-[#1A3154] text-white border-t border-slate-700 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-700/60 text-xs">
            <div>
              <div className="font-extrabold text-white text-base">MetalFlow Nigeria</div>
              <p className="text-slate-400">Fair-Value Scrap Metal Index & Fabricator Marketplace • North-West Hub</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
              <button onClick={() => setCurrentView('landing')} className="hover:text-white">
                Overview
              </button>
              <button onClick={() => setCurrentView('calculator')} className="hover:text-white">
                Price Board
              </button>
              <button onClick={() => setCurrentView('directory')} className="hover:text-white">
                Verified Dealers
              </button>
              <button onClick={() => setCurrentView('admin')} className="hover:text-white">
                Smelter Rates Admin
              </button>
              <button
                onClick={() => setIsSupabaseModalOpen(true)}
                className="text-emerald-400 hover:underline font-bold"
              >
                Database Status
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>© 2026 MetalFlow Nigeria.</p>
            <p>Supported Hubs: Kebbi (Birnin Kebbi) • Sokoto • Zamfara (Gusau) • Kano • Kaduna • Katsina • Jigawa</p>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-700/40 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Email: <a href={`mailto:${APP_CONTACT_INFO.email}`} className="text-slate-200 hover:underline">{APP_CONTACT_INFO.email}</a> | Phone: <a href={`tel:${APP_CONTACT_INFO.phone}`} className="text-slate-200 hover:underline">{APP_CONTACT_INFO.phone}</a></span>
            <span>Headquarters: {APP_CONTACT_INFO.address}</span>
          </div>
        </div>
      </footer>

      {/* Modals Container */}
      <PaystackModal
        isOpen={isPaystackModalOpen}
        onClose={() => {
          setIsPaystackModalOpen(false);
          setSelectedListingForOffer(null);
        }}
        listing={selectedListingForOffer}
        onSuccessOffer={handleSubmitOffer}
      />

      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />

      <PostScrapModal
        isOpen={isPostScrapModalOpen}
        onClose={() => {
          setIsPostScrapModalOpen(false);
          setPrefillLotData({});
        }}
        onSubmit={handlePostListing}
        prefillData={prefillLotData}
      />

      <RegisterDealerModal
        isOpen={isRegisterDealerModalOpen}
        onClose={() => setIsRegisterDealerModalOpen(false)}
        onSubmit={handleRegisterDealer}
      />

      {/* Toast Alert Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
}
