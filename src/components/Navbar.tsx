import React, { useState } from 'react';
import { UserRole } from '../types';
import { APP_CONTACT_INFO } from '../data/mockData';
import { 
  Anvil, 
  Calculator, 
  Store, 
  ShieldCheck, 
  Settings2, 
  Database, 
  Layers, 
  ChevronDown,
  User,
  Sparkles,
  Zap,
  Menu,
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'calculator' | 'directory' | 'admin';
  setCurrentView: (view: 'landing' | 'calculator' | 'directory' | 'admin') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenSupabaseModal: () => void;
  onPostScrapClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userRole,
  setUserRole,
  onOpenSupabaseModal,
  onPostScrapClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'landing' | 'calculator' | 'directory' | 'admin') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#2B4C7E] text-white shadow-md border-b border-slate-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('landing')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Anvil className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-white font-sans">MetalFlow</span>
                <span className="bg-[#8A9EA7]/30 text-emerald-300 border border-emerald-400/30 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  North-West Index
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block font-medium">Scrap & Extrusions Marketplace</p>
            </div>
          </div>

          {/* Desktop & Tablet Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1A3154]/70 p-1.5 rounded-2xl border border-slate-600/50">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentView === 'landing'
                  ? 'bg-[#E67E22] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              Overview
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentView === 'calculator'
                  ? 'bg-[#E67E22] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Price Board & Calculator
            </button>

            <button
              onClick={() => handleNavClick('directory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentView === 'directory'
                  ? 'bg-[#E67E22] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Store className="w-4 h-4" />
              Dealers & Listings
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentView === 'admin'
                  ? 'bg-[#E67E22] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings2 className="w-4 h-4" />
              Admin Controls
            </button>
          </nav>

          {/* Desktop Right Action Tools & User Role Switcher */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
            {/* Database Schema Modal Button */}
            <button
              onClick={onOpenSupabaseModal}
              title="Database Schema & Architecture"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database</span>
            </button>

            {/* Post Scrap CTA Button */}
            <button
              onClick={onPostScrapClick}
              className="bg-[#E67E22] hover:bg-[#D35400] text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Post Scrap Lot</span>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-1.5 bg-[#1A3154] hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-600 text-xs font-bold cursor-pointer transition-colors">
                <User className="w-4 h-4 text-[#E67E22]" />
                <span className="capitalize text-slate-200">
                  {userRole === 'fabricator' && 'Fabricator'}
                  {userRole === 'dealer' && 'Certified Buyer'}
                  {userRole === 'admin' && 'Admin Mode'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </div>

              <div className="absolute right-0 mt-1.5 w-52 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 py-1.5 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Switch Active Persona
                </div>
                
                <button
                  onClick={() => setUserRole('fabricator')}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    userRole === 'fabricator' ? 'font-bold text-[#2B4C7E] bg-blue-50/60' : 'text-slate-700'
                  }`}
                >
                  <span>Fabricator / Workshop</span>
                  {userRole === 'fabricator' && <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />}
                </button>

                <button
                  onClick={() => setUserRole('dealer')}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    userRole === 'dealer' ? 'font-bold text-[#2B4C7E] bg-blue-50/60' : 'text-slate-700'
                  }`}
                >
                  <span>Certified Buyer Yard</span>
                  {userRole === 'dealer' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                </button>

                <button
                  onClick={() => setUserRole('admin')}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    userRole === 'admin' ? 'font-bold text-[#2B4C7E] bg-blue-50/60' : 'text-slate-700'
                  }`}
                >
                  <span>Platform Admin</span>
                  {userRole === 'admin' && <Settings2 className="w-3.5 h-3.5 text-[#E67E22]" />}
                </button>
              </div>
            </div>

          </div>

          {/* Mobile Hamburger / Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onPostScrapClick}
              className="sm:hidden bg-[#E67E22] hover:bg-[#D35400] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Post</span>
            </button>

            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#1A3154] hover:bg-slate-700 text-white border border-slate-600/80 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#E67E22]" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A3154] border-t border-slate-700 px-4 py-5 shadow-2xl space-y-4 animate-in slide-in-from-top duration-200">
          
          {/* Mobile Navigation Links */}
          <div className="space-y-1.5">
            <button
              onClick={() => handleNavClick('landing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all min-h-[44px] ${
                currentView === 'landing'
                  ? 'bg-[#E67E22] text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Layers className="w-5 h-5" />
              <span>Overview & Market Index</span>
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all min-h-[44px] ${
                currentView === 'calculator'
                  ? 'bg-[#E67E22] text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span>Price Board & Calculator</span>
            </button>

            <button
              onClick={() => handleNavClick('directory')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all min-h-[44px] ${
                currentView === 'directory'
                  ? 'bg-[#E67E22] text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Store className="w-5 h-5" />
              <span>Verified Dealers & Scrap Lots</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all min-h-[44px] ${
                currentView === 'admin'
                  ? 'bg-[#E67E22] text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Settings2 className="w-5 h-5" />
              <span>Admin & Smelter Rates Control</span>
            </button>
          </div>

          {/* User Persona Switcher in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-700/80 space-y-2">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
              Active Persona
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setUserRole('fabricator')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors flex flex-col items-center gap-1 ${
                  userRole === 'fabricator'
                    ? 'bg-[#E67E22] text-white border-[#E67E22]'
                    : 'bg-[#2B4C7E] text-slate-300 border-slate-600'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Fabricator</span>
              </button>

              <button
                onClick={() => setUserRole('dealer')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors flex flex-col items-center gap-1 ${
                  userRole === 'dealer'
                    ? 'bg-[#E67E22] text-white border-[#E67E22]'
                    : 'bg-[#2B4C7E] text-slate-300 border-slate-600'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Dealer</span>
              </button>

              <button
                onClick={() => setUserRole('admin')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors flex flex-col items-center gap-1 ${
                  userRole === 'admin'
                    ? 'bg-[#E67E22] text-white border-[#E67E22]'
                    : 'bg-[#2B4C7E] text-slate-300 border-slate-600'
                }`}
              >
                <Settings2 className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Contact Details in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-700/80 bg-[#2B4C7E]/60 p-3.5 rounded-2xl space-y-2 text-xs text-slate-200">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#E67E22]">
              Official Contact & Support
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href={`tel:${APP_CONTACT_INFO.phone}`} className="hover:underline font-bold">
                {APP_CONTACT_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href={`mailto:${APP_CONTACT_INFO.email}`} className="hover:underline truncate font-medium">
                {APP_CONTACT_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{APP_CONTACT_INFO.address}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onPostScrapClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#E67E22] hover:bg-[#D35400] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Post Fabricator Scrap Lot</span>
            </button>

            <button
              onClick={() => {
                onOpenSupabaseModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Database className="w-4 h-4" />
              <span>Database Architecture</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
