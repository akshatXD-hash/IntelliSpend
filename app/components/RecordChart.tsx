import React from 'react'
import { BarChart3 } from 'lucide-react'

export default function RecordChart() {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 w-full shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600/20 p-2.5 rounded-xl">
          <BarChart3 className="text-blue-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">Expense Chart</h2>
          <p className="text-slate-500 text-sm">Visual representation of your spending in ₹</p>
        </div>
      </div>

      {/* Skeletal Chart Container */}
      <div className="relative h-64 w-full flex items-end justify-between gap-2 px-2 border-b border-l border-slate-700/50">
        
        {/* Y-Axis Labels (Updated to Rupees) */}
        <div className="absolute -left-12 h-full flex flex-col justify-between text-[10px] text-slate-500 font-medium text-right pr-2">
          <span>₹10k</span>
          <span>₹7.5k</span>
          <span>₹5k</span>
          <span>₹2.5k</span>
          <span>₹0</span>
        </div>

        {/* Horizontal Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-slate-800/30 h-0" />
          ))}
        </div>

        {/* Skeletal Bars - Blue Theme */}
        <div className="w-full h-24 bg-blue-500/20 border border-blue-500/30 rounded-t-lg transition-all hover:bg-blue-500/40 relative group">
            <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">₹2,400</div>
        </div>
        <div className="w-full h-48 bg-blue-600/40 border border-blue-500/30 rounded-t-lg transition-all hover:bg-blue-600/60"></div>
        <div className="w-full h-32 bg-blue-500/20 border border-blue-500/30 rounded-t-lg transition-all hover:bg-blue-500/40"></div>
        <div className="w-full h-56 bg-blue-600/40 border border-blue-500/30 rounded-t-lg transition-all hover:bg-blue-600/60"></div>
        <div className="w-full h-40 bg-blue-500/20 border border-blue-500/30 rounded-t-lg transition-all hover:bg-blue-500/40"></div>
        <div className="w-full h-16 bg-blue-600/40 border border-blue-500/30 rounded-t-lg transition-all hover:bg-blue-600/60"></div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
    </div>
  )
}