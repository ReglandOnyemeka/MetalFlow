import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { INITIAL_PRICES, INITIAL_DEALERS, INITIAL_LISTINGS, INITIAL_PRICE_LOGS } from "./src/data/mockData.ts";
import { MetalPriceItem, Dealer, ScrapListing, PriceUpdateLog, ScrapOffer } from "./src/types.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory persistent state (simulating database sync)
  let prices: MetalPriceItem[] = [...INITIAL_PRICES];
  let dealers: Dealer[] = [...INITIAL_DEALERS];
  let listings: ScrapListing[] = [...INITIAL_LISTINGS];
  let priceLogs: PriceUpdateLog[] = [...INITIAL_PRICE_LOGS];
  let offers: ScrapOffer[] = [];

  // API Endpoints
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "ScrapVal Index API", timestamp: new Date().toISOString() });
  });

  // GET Benchmark Prices
  app.get("/api/prices", (_req, res) => {
    res.json(prices);
  });

  // PUT Update Benchmark Price (Admin)
  app.put("/api/prices/:id", (req, res) => {
    const { id } = req.params;
    const { newPrice, updatedBy, reason } = req.body;

    const itemIndex = prices.findIndex((p) => p.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Price item not found" });
    }

    const oldPrice = prices[itemIndex].pricePerKg;
    const diff = newPrice - oldPrice;
    const percentChange = Number(((diff / oldPrice) * 100).toFixed(2));

    prices[itemIndex] = {
      ...prices[itemIndex],
      pricePerKg: newPrice,
      change24h: diff,
      changePercent: percentChange,
      lastUpdated: "Just now"
    };

    const newLog: PriceUpdateLog = {
      id: `log-${Date.now()}`,
      metalCategory: prices[itemIndex].category,
      grade: prices[itemIndex].grade,
      oldPrice,
      newPrice,
      updatedBy: updatedBy || "Platform Admin",
      reason: reason || "Daily Market Adjustment",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    priceLogs.unshift(newLog);

    res.json({
      success: true,
      updatedItem: prices[itemIndex],
      log: newLog
    });
  });

  // GET Dealers
  app.get("/api/dealers", (req, res) => {
    const { region, metal } = req.query;
    let filtered = [...dealers];

    if (region && typeof region === "string") {
      filtered = filtered.filter((d) => d.region.toLowerCase().includes(region.toLowerCase()));
    }

    if (metal && typeof metal === "string") {
      filtered = filtered.filter((d) => d.acceptedMetals.includes(metal as any));
    }

    res.json(filtered);
  });

  // POST Register Dealer
  app.post("/api/dealers", (req, res) => {
    const newDealer: Dealer = {
      id: `d-${Date.now()}`,
      ...req.body,
      isVerified: true,
      certificationId: `NG-SCRAP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 1,
      verifiedBadgeYear: 2026,
      verifiedBy: "ScrapVal Portal Automated Verification"
    };

    dealers.unshift(newDealer);
    res.status(201).json(newDealer);
  });

  // GET Fabricator Listings
  app.get("/api/listings", (_req, res) => {
    res.json(listings);
  });

  // POST Fabricator Listing
  app.post("/api/listings", (req, res) => {
    const newListing: ScrapListing = {
      id: `lst-${Date.now()}`,
      ...req.body,
      status: "available",
      postedAt: "Just now",
      offersCount: 0,
      verifiedQuality: true
    };

    listings.unshift(newListing);
    res.status(201).json(newListing);
  });

  // POST Dealer Offer / Escrow Payment
  app.post("/api/offers", (req, res) => {
    const newOffer: ScrapOffer = {
      id: `off-${Date.now()}`,
      ...req.body,
      status: "escrow_locked",
      createdAt: new Date().toISOString()
    };

    offers.unshift(newOffer);

    // Update listing offers count
    const listingIndex = listings.findIndex((l) => l.id === req.body.listingId);
    if (listingIndex !== -1) {
      listings[listingIndex].offersCount += 1;
    }

    res.status(201).json(newOffer);
  });

  // GET Price Logs
  app.get("/api/logs", (_req, res) => {
    res.json(priceLogs);
  });

  // Serve Vite in dev, or built static files in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ScrapVal Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
