import { MetalPriceItem, Dealer, ScrapListing, PriceUpdateLog, ScrapOffer } from '../types';
import { INITIAL_PRICES, INITIAL_DEALERS, INITIAL_LISTINGS, INITIAL_PRICE_LOGS } from '../data/mockData';

const STORAGE_KEYS = {
  PRICES: 'metalflow_auto_prices_v1',
  DEALERS: 'metalflow_auto_dealers_v1',
  LISTINGS: 'metalflow_auto_listings_v1',
  LOGS: 'metalflow_auto_logs_v1',
  OFFERS: 'metalflow_auto_offers_v1'
};

type Listener<T> = (data: T) => void;

class AutoDatabaseEngine {
  private prices: MetalPriceItem[] = [];
  private dealers: Dealer[] = [];
  private listings: ScrapListing[] = [];
  private logs: PriceUpdateLog[] = [];
  private offers: ScrapOffer[] = [];

  private priceListeners: Set<Listener<MetalPriceItem[]>> = new Set();
  private dealerListeners: Set<Listener<Dealer[]>> = new Set();
  private listingListeners: Set<Listener<ScrapListing[]>> = new Set();
  private logListeners: Set<Listener<PriceUpdateLog[]>> = new Set();

  private isInitialized = false;
  private pollInterval: any = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedPrices = localStorage.getItem(STORAGE_KEYS.PRICES);
      const storedDealers = localStorage.getItem(STORAGE_KEYS.DEALERS);
      const storedListings = localStorage.getItem(STORAGE_KEYS.LISTINGS);
      const storedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
      const storedOffers = localStorage.getItem(STORAGE_KEYS.OFFERS);

      this.prices = storedPrices ? JSON.parse(storedPrices) : [...INITIAL_PRICES];
      this.dealers = storedDealers ? JSON.parse(storedDealers) : [...INITIAL_DEALERS];
      this.listings = storedListings ? JSON.parse(storedListings) : [...INITIAL_LISTINGS];
      this.logs = storedLogs ? JSON.parse(storedLogs) : [...INITIAL_PRICE_LOGS];
      this.offers = storedOffers ? JSON.parse(storedOffers) : [];
    } catch {
      this.prices = [...INITIAL_PRICES];
      this.dealers = [...INITIAL_DEALERS];
      this.listings = [...INITIAL_LISTINGS];
      this.logs = [...INITIAL_PRICE_LOGS];
      this.offers = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(this.prices));
      localStorage.setItem(STORAGE_KEYS.DEALERS, JSON.stringify(this.dealers));
      localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(this.listings));
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(this.logs));
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(this.offers));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }

  public async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Fetch initial backend state automatically
    await this.syncWithBackend();

    // Start automated background polling (every 10 seconds)
    if (!this.pollInterval) {
      this.pollInterval = setInterval(() => {
        this.syncWithBackend();
      }, 10000);
    }
  }

  public async syncWithBackend() {
    try {
      const [pricesRes, dealersRes, listingsRes, logsRes] = await Promise.all([
        fetch('/api/prices').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/dealers').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/listings').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/logs').then((r) => (r.ok ? r.json() : null)).catch(() => null)
      ]);

      let changed = false;

      if (pricesRes && Array.isArray(pricesRes) && pricesRes.length > 0) {
        this.prices = pricesRes;
        this.notifyPriceListeners();
        changed = true;
      }

      if (dealersRes && Array.isArray(dealersRes) && dealersRes.length > 0) {
        this.dealers = dealersRes;
        this.notifyDealerListeners();
        changed = true;
      }

      if (listingsRes && Array.isArray(listingsRes) && listingsRes.length > 0) {
        this.listings = listingsRes;
        this.notifyListingListeners();
        changed = true;
      }

      if (logsRes && Array.isArray(logsRes) && logsRes.length > 0) {
        this.logs = logsRes;
        this.notifyLogListeners();
        changed = true;
      }

      if (changed) {
        this.saveToStorage();
      }
    } catch {
      // Offline / isolated mode fallback is automatically active
    }
  }

  // Getters
  public getPrices(): MetalPriceItem[] {
    return this.prices;
  }

  public getDealers(): Dealer[] {
    return this.dealers;
  }

  public getListings(): ScrapListing[] {
    return this.listings;
  }

  public getLogs(): PriceUpdateLog[] {
    return this.logs;
  }

  // Subscriptions
  public subscribePrices(listener: Listener<MetalPriceItem[]>): () => void {
    this.priceListeners.add(listener);
    listener(this.prices);
    return () => this.priceListeners.delete(listener);
  }

  public subscribeDealers(listener: Listener<Dealer[]>): () => void {
    this.dealerListeners.add(listener);
    listener(this.dealers);
    return () => this.dealerListeners.delete(listener);
  }

  public subscribeListings(listener: Listener<ScrapListing[]>): () => void {
    this.listingListeners.add(listener);
    listener(this.listings);
    return () => this.listingListeners.delete(listener);
  }

  public subscribeLogs(listener: Listener<PriceUpdateLog[]>): () => void {
    this.logListeners.add(listener);
    listener(this.logs);
    return () => this.logListeners.delete(listener);
  }

  private notifyPriceListeners() {
    this.priceListeners.forEach((fn) => fn(this.prices));
  }
  private notifyDealerListeners() {
    this.dealerListeners.forEach((fn) => fn(this.dealers));
  }
  private notifyListingListeners() {
    this.listingListeners.forEach((fn) => fn(this.listings));
  }
  private notifyLogListeners() {
    this.logListeners.forEach((fn) => fn(this.logs));
  }

  // Mutations
  public async updatePrice(
    id: string,
    newPrice: number,
    updatedBy: string,
    reason: string
  ): Promise<{ updatedItem: MetalPriceItem; log: PriceUpdateLog } | null> {
    const itemIndex = this.prices.findIndex((p) => p.id === id);
    if (itemIndex === -1) return null;

    const oldItem = this.prices[itemIndex];
    const diff = newPrice - oldItem.pricePerKg;
    const percentChange = Number(((diff / oldItem.pricePerKg) * 100).toFixed(2));

    const updatedItem: MetalPriceItem = {
      ...oldItem,
      pricePerKg: newPrice,
      change24h: diff,
      changePercent: percentChange,
      lastUpdated: 'Just now'
    };

    const newLog: PriceUpdateLog = {
      id: `log-${Date.now()}`,
      metalCategory: oldItem.category,
      grade: oldItem.grade,
      oldPrice: oldItem.pricePerKg,
      newPrice,
      updatedBy,
      reason,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    this.prices[itemIndex] = updatedItem;
    this.logs.unshift(newLog);

    this.saveToStorage();
    this.notifyPriceListeners();
    this.notifyLogListeners();

    // Async sync to server
    try {
      await fetch(`/api/prices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPrice, updatedBy, reason })
      });
    } catch (e) {
      console.warn('Backend sync deferred:', e);
    }

    return { updatedItem, log: newLog };
  }

  public async createListing(listingData: Partial<ScrapListing>): Promise<ScrapListing> {
    const newListing: ScrapListing = {
      id: `lst-${Date.now()}`,
      title: listingData.title || 'Scrap Metal Lot',
      fabricatorName: listingData.fabricatorName || 'Kebbi Workshop',
      fabricatorCompany: listingData.fabricatorCompany || 'Birnin Kebbi Fabricators',
      metalCategory: listingData.metalCategory || 'Aluminum',
      grade: listingData.grade || 'Clean Architectural Extrusions (6063)',
      weightKg: listingData.weightKg || 100,
      estimatedValueNaira: listingData.estimatedValueNaira || 245000,
      askingPricePerKg: listingData.askingPricePerKg || 2450,
      region: listingData.region || 'Kebbi - Birnin Kebbi / Jega',
      address: listingData.address || 'Haliru Abdu Secretariat Road, Birnin Kebbi',
      phone: listingData.phone || '09038784064',
      description: listingData.description || 'Clean sorted scrap lot.',
      status: 'available',
      photos: listingData.photos || [
        'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80'
      ],
      postedAt: 'Just now',
      requiresPickup: listingData.requiresPickup ?? true,
      offersCount: 0,
      verifiedQuality: true
    };

    this.listings.unshift(newListing);
    this.saveToStorage();
    this.notifyListingListeners();

    try {
      await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing)
      });
    } catch (e) {
      console.warn('Backend sync deferred:', e);
    }

    return newListing;
  }

  public async registerDealer(dealerData: Partial<Dealer>): Promise<Dealer> {
    const newDealer: Dealer = {
      id: `d-${Date.now()}`,
      name: dealerData.name || 'Alhaji Bashir Garba',
      company: dealerData.company || 'Certified Scrap Yard',
      isVerified: true,
      certificationId: `MF-DEALER-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 1,
      region: dealerData.region || 'Kebbi - Birnin Kebbi / Jega',
      address: dealerData.address || 'Birnin Kebbi Yard Address',
      phone: dealerData.phone || '09038784064',
      whatsapp: dealerData.whatsapp || '2349038784064',
      email: dealerData.email || 'odeyemisamson58@gmail.com',
      acceptedMetals: dealerData.acceptedMetals || ['Aluminum', 'Copper'],
      minWeightKg: 50,
      maxDailyCapacityTons: dealerData.maxDailyCapacityTons || 20,
      payoutSpeed: dealerData.payoutSpeed || 'Instant Cash',
      hasWeighingBridge: dealerData.hasWeighingBridge ?? true,
      providesPickup: dealerData.providesPickup ?? true,
      verifiedBadgeYear: 2026,
      verifiedBy: 'NSMDA North-West Certification'
    };

    this.dealers.unshift(newDealer);
    this.saveToStorage();
    this.notifyDealerListeners();

    try {
      await fetch('/api/dealers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDealer)
      });
    } catch (e) {
      console.warn('Backend sync deferred:', e);
    }

    return newDealer;
  }

  public async submitOffer(offerData: Partial<ScrapOffer>): Promise<ScrapOffer | null> {
    if (!offerData.listingId) return null;

    const newOffer: ScrapOffer = {
      id: `off-${Date.now()}`,
      listingId: offerData.listingId,
      dealerId: offerData.dealerId || 'd-1',
      dealerName: offerData.dealerName || 'Certified Buyer',
      dealerCompany: offerData.dealerCompany || 'Smelting Hub',
      offeredPricePerKg: offerData.offeredPricePerKg || 2500,
      totalAmountNaira: offerData.totalAmountNaira || 500000,
      depositPaidNaira: offerData.depositPaidNaira || 50000,
      status: 'escrow_locked',
      paymentProvider: offerData.paymentProvider || 'Paystack',
      createdAt: new Date().toISOString()
    };

    this.offers.unshift(newOffer);

    const listingIndex = this.listings.findIndex((l) => l.id === offerData.listingId);
    if (listingIndex !== -1) {
      this.listings[listingIndex] = {
        ...this.listings[listingIndex],
        offersCount: this.listings[listingIndex].offersCount + 1,
        status: 'under_negotiation'
      };
      this.notifyListingListeners();
    }

    this.saveToStorage();

    try {
      await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOffer)
      });
    } catch (e) {
      console.warn('Backend sync deferred:', e);
    }

    return newOffer;
  }

  public getStatus() {
    return {
      connected: true,
      mode: 'automatic',
      syncEngine: 'Live Full-Stack DB & Local Engine',
      stats: {
        prices: this.prices.length,
        dealers: this.dealers.length,
        listings: this.listings.length,
        logs: this.logs.length
      }
    };
  }
}

export const autoDb = new AutoDatabaseEngine();
