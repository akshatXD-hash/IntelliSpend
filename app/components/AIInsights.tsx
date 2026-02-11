'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertCircle, RefreshCw, Loader2, Lightbulb, Target, DollarSign, Award } from 'lucide-react';

interface InsightData {
  success: boolean;
  insights: string;
  totalSpent: number;
  expenseCount: number;
  categoryBreakdown?: Record<string, number>;
}

export default function AIInsights() {
  const [insightData, setInsightData] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch AI insights
  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/ai-insights');
      const data = await response.json();
      
      if (data.success) {
        setInsightData(data);
      } else {
        setError(data.message || 'Failed to load insights');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  };

  // Parse AI insights into structured sections
  const parseInsights = (text: string) => {
    const sections = {
      greeting: '',
      mainInsight: '',
      topCategory: { name: '', amount: '', emoji: '💰' },
      tips: [] as string[],
    };

    const lines = text.split('\n').filter(line => line.trim());
    sections.greeting = lines[0] || 'Hey there! 👋';

    const spendingLine = lines.find(line => line.includes('spent') || line.includes('$') || line.includes('₹'));
    if (spendingLine) {
      sections.mainInsight = spendingLine;
    }

    const categoryLine = lines.find(line => line.toLowerCase().includes('biggest') || line.toLowerCase().includes('most'));
    if (categoryLine) {
      const match = categoryLine.match(/\*\*(.*?)\*\*/g);
      if (match && match.length >= 1) {
        sections.topCategory.name = match[0].replace(/\*\*/g, '');
        if (match.length >= 2) {
          sections.topCategory.amount = match[1].replace(/\*\*/g, '');
        }
      }
      
      const emojiMatch = categoryLine.match(/[\u{1F300}-\u{1F9FF}]/u);
      if (emojiMatch) {
        sections.topCategory.emoji = emojiMatch[0];
      }
    }

    const tipMarkers = ['💡', '🎯', '📱', '✨', '💪', '🚀'];
    lines.forEach(line => {
      const hasTipMarker = tipMarkers.some(marker => line.includes(marker));
      if (hasTipMarker && line.includes('**')) {
        sections.tips.push(line);
      }
    });

    return sections;
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const parsedInsights = insightData ? parseInsights(insightData.insights) : null;

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 w-full shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Insights</h2>
            <p className="text-slate-400 text-sm">Smart financial analysis for your habits</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Just Now</span>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-slate-400 text-sm">Analyzing your spending patterns...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-300 font-medium mb-2">Oops! Something went wrong</p>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && insightData && parsedInsights && (
        <>
          {/* Greeting Card */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
            <p className="text-xl text-white font-medium">{parsedInsights.greeting}</p>
            {parsedInsights.mainInsight && (
              <p className="text-slate-300 mt-2 text-sm leading-relaxed">
                {parsedInsights.mainInsight.replace(/\*\*/g, '')}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Total Spent - FIXED with nullish coalescing */}
            <div className="group bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
                  <DollarSign size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{(insightData.totalSpent ?? 0).toFixed(2)}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">{(insightData.expenseCount ?? 0)} transactions</p>
                </div>
              </div>
            </div>

            {/* Top Category */}
            {parsedInsights.topCategory.name && (
              <div className="group bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-xl text-purple-400 text-2xl">
                    {parsedInsights.topCategory.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-sm mb-1">Top Category</p>
                    <p className="text-lg font-bold text-white">{parsedInsights.topCategory.name}</p>
                    <p className="text-purple-300 text-sm font-semibold mt-1">{parsedInsights.topCategory.amount}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Average per Transaction - FIXED to avoid division by zero/undefined */}
            <div className="group bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400">
                  <TrendingUp size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Average Expense</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{insightData.expenseCount > 0 
                        ? (insightData.totalSpent / insightData.expenseCount).toFixed(2) 
                        : "0.00"}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">per transaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Tips Section */}
          {parsedInsights.tips.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-bold text-lg">Your Personalized Tips</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {parsedInsights.tips.map((tip, index) => {
                  const cleanTip = tip.replace(/\*\*/g, '');
                  const parts = cleanTip.split(' ');
                  const emoji = parts[0];
                  const tipText = parts.slice(1).join(' ');
                  
                  const colors = [
                    { bg: 'bg-amber-500/5', border: 'border-amber-500/10', hover: 'hover:border-amber-500/30', icon: 'bg-amber-500/20 text-amber-400' },
                    { bg: 'bg-blue-500/5', border: 'border-blue-500/10', hover: 'hover:border-blue-500/30', icon: 'bg-blue-500/20 text-blue-400' },
                    { bg: 'bg-emerald-500/5', border: 'border-emerald-500/10', hover: 'hover:border-emerald-500/30', icon: 'bg-emerald-500/20 text-emerald-400' },
                  ];
                  
                  const color = colors[index % colors.length];

                  return (
                    <div 
                      key={index}
                      className={`group ${color.bg} ${color.border} rounded-2xl p-5 ${color.hover} transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`${color.icon} p-3 rounded-xl text-2xl flex-shrink-0`}>
                          {emoji}
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {tipText}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Breakdown - FIXED with defensive check */}
          {insightData.categoryBreakdown && Object.keys(insightData.categoryBreakdown).length > 0 && (
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-bold">Spending Breakdown</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(insightData.categoryBreakdown)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([category, amount]) => {
                    const total = insightData.totalSpent || 1; // avoid divide by zero
                    const percentage = ((amount as number) / total * 100).toFixed(1);
                    return (
                      <div 
                        key={category}
                        className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-blue-500/30 transition-all"
                      >
                        <p className="text-slate-400 text-xs mb-2">{category}</p>
                        <p className="text-white font-bold text-lg">
                          ₹{((amount as number) ?? 0).toFixed(2)}
                        </p>
                        <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-slate-500 text-xs mt-1">{percentage}% of total</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Encouragement Footer */}
          <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
            <Award className="w-10 h-10 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-white font-bold">Keep Going! 💪</p>
              <p className="text-slate-400 text-sm">You're on the right track. Small changes lead to big savings!</p>
            </div>
          </div>
        </>
      )}

      {/* Footer / Powered By */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-slate-800 pt-6 gap-4">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
            <Sparkles size={10} className="text-blue-400" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider">Powered by AI</span>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh Insights'}
        </button>
      </div>
    </div>
  );
}