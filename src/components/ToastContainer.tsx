import React from 'react';
import { ToastNotification } from '../types';
import { TrendingUp, TrendingDown, Bell, CheckCircle2, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isUp = toast.type === 'price_up';
        const isDown = toast.type === 'price_down';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200"
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  isUp
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isDown
                    ? 'bg-rose-500/20 text-rose-400'
                    : 'bg-[#E67E22]/20 text-[#E67E22]'
                }`}
              >
                {isUp && <TrendingUp className="w-4 h-4" />}
                {isDown && <TrendingDown className="w-4 h-4" />}
                {!isUp && !isDown && <Bell className="w-4 h-4" />}
              </div>

              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                  <span>{toast.title}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({toast.timestamp})</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">{toast.message}</p>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
