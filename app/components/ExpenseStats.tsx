import React from 'react';
import { TrendingUp, TrendingDown, Calculator, PieChart } from 'lucide-react';

export default function ExpenseStats() {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 w-full shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600/20 p-2.5 rounded-xl">
          <PieChart className="text-blue-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">Expense Statistics</h2>
          <p className="text-slate-500 text-sm font-medium">Your spending insights and ranges</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Average Daily Spending Card */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          {/* Decorative background glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/10 transition-colors"></div>
          
          <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
            Average Daily Spending
          </span>
          <div className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tighter">
            ₹0.00
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              Based on 0 days with expenses
            </span>
          </div>
        </div>

        {/* Highest and Lowest Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Highest Card */}
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 flex items-center gap-4 group hover:border-red-500/20 transition-all">
            <div className="bg-red-500/20 p-3 rounded-xl text-red-400 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
                Highest
              </span>
              <span className="text-xl font-bold text-red-200">₹0</span>
            </div>
          </div>

          {/* Lowest Card */}
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 flex items-center gap-4 group hover:border-emerald-500/20 transition-all">
            <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingDown size={24} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
                Lowest
              </span>
              <span className="text-xl font-bold text-emerald-200">₹0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}