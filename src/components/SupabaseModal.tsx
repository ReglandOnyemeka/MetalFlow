import React, { useState } from 'react';
import { SUPABASE_SQL_SCHEMA } from '../data/mockData';
import { autoDb } from '../services/dbService';
import {
  X,
  Database,
  Copy,
  Check,
  Download,
  Terminal,
  ShieldCheck,
  Zap,
  Layers,
  Server,
  RefreshCw
} from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'auto_db' | 'sql'>('auto_db');
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const dbStatus = autoDb.getStatus();

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    await autoDb.syncWithBackend();
    setTimeout(() => setIsSyncing(false), 500);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([SUPABASE_SQL_SCHEMA], { type: 'text/sql;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `metalflow_schema.sql`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1A3154] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">MetalFlow Automated Database</h3>
              <p className="text-[11px] text-slate-300">Self-Connecting Full-Stack Persistent Storage & Schema</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('auto_db')}
            className={`pb-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'auto_db'
                ? 'border-[#E67E22] text-[#2B4C7E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-[#E67E22]" />
            <span>Automatic Live Database</span>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
              Connected
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'sql'
                ? 'border-[#E67E22] text-[#2B4C7E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-slate-600" />
            <span>PostgreSQL / SQL DDL</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {activeTab === 'auto_db' ? (
            <div className="space-y-5">
              {/* Connected Banner */}
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-4 rounded-2xl flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-sm text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Database Connected Automatically</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    All scrap metal benchmark rates, fabricator lots, certified dealers, and audit logs are synchronized automatically between the backend API and client storage with zero manual setup.
                  </p>
                </div>

                <button
                  onClick={handleSyncNow}
                  disabled={isSyncing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                </button>
              </div>

              {/* Status Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Prices</span>
                  <span className="text-lg font-black text-[#2B4C7E]">{dbStatus.stats.prices}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Dealers</span>
                  <span className="text-lg font-black text-[#2B4C7E]">{dbStatus.stats.dealers}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Scrap Lots</span>
                  <span className="text-lg font-black text-[#2B4C7E]">{dbStatus.stats.listings}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Audit Logs</span>
                  <span className="text-lg font-black text-[#2B4C7E]">{dbStatus.stats.logs}</span>
                </div>
              </div>

              {/* Architecture Info */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                  <Server className="w-4 h-4 text-[#2B4C7E]" />
                  <span>Full-Stack Storage Architecture</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  • <strong>REST API Endpoints:</strong> Express backend serves and persists <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">/api/prices</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">/api/dealers</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">/api/listings</code>, and <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">/api/offers</code>.
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  • <strong>Local Cache Fallback:</strong> Browser storage caches live state so the marketplace remains responsive even during spotty network conditions in industrial zones.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#E67E22]" />
                  PostgreSQL Schema Export
                </h4>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                    <span>{copied ? 'Copied SQL!' : 'Copy SQL'}</span>
                  </button>

                  <button
                    onClick={handleDownloadSql}
                    className="bg-[#2B4C7E] hover:bg-[#1A3154] text-white px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .sql</span>
                  </button>
                </div>
              </div>

              <pre className="font-mono bg-slate-900 text-slate-200 p-4 rounded-xl text-[11px] max-h-64 overflow-y-auto leading-relaxed border border-slate-800">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 text-right shrink-0">
          <button
            onClick={onClose}
            className="bg-[#2B4C7E] hover:bg-[#1A3154] text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
