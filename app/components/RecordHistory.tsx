"use client";

import React, { useEffect, useState } from "react";
import { History, Search, Filter, Clock, ArrowRight, MoreVertical } from "lucide-react";

type Expense = {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
};

export default function RecordHistory() {

  const [records, setRecords] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const res = await fetch("/api/auth/addexpense");
        const data = await res.json();

        if (data.success) {

          // ⭐ Normalize category here
          const cleaned = data.record.map((r: any) => ({
            ...r,
            category: r.category.trim().toLowerCase()
          }));

          setRecords(cleaned);
        }

      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 w-full shadow-2xl relative overflow-hidden">

      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-3 items-center">
          <div className="bg-blue-600/20 p-2 rounded-2xl">
            <History className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Record History</h2>
            <p className="text-slate-400 text-sm">Review your past transactions</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">

          <thead>
            <tr className="text-slate-500 text-xs uppercase">
              <th className="px-4 pb-2">Description</th>
              <th className="px-4 pb-2">Category</th>
              <th className="px-4 pb-2">Date</th>
              <th className="px-4 pb-2 text-right">Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {/* Skeleton Loader */}
            {loading &&
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-4 border border-slate-800 rounded-l-2xl">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-xl animate-pulse" />
                      <div>
                        <div className="h-4 w-32 bg-slate-800 rounded mb-2 animate-pulse"></div>
                        <div className="h-3 w-20 bg-slate-800/60 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 border border-slate-800">
                    <div className="h-4 w-20 bg-slate-800 rounded animate-pulse"></div>
                  </td>
                  <td className="px-4 py-4 border border-slate-800">
                    <div className="h-4 w-16 bg-slate-800 rounded animate-pulse"></div>
                  </td>
                  <td className="px-4 py-4 border border-slate-800 text-right">
                    <div className="h-4 w-16 bg-slate-800 rounded ml-auto animate-pulse"></div>
                  </td>
                </tr>
              ))}

            {/* Actual Data */}
            {!loading &&
              records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-800/30 transition">

                  <td className="px-4 py-4 border-y border-l border-slate-800 rounded-l-2xl">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex justify-center items-center text-blue-400">
                        <Clock size={18} />
                      </div>
                      <p className="text-white text-sm font-semibold">
                        {record.title}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 border-y border-slate-800">
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 uppercase">
                      {formatCategory(record.category)}
                    </span>
                  </td>

                  <td className="px-4 py-4 border-y border-slate-800 text-slate-400">
                    {formatDate(record.date)}
                  </td>

                  <td className="px-4 py-4 border-y border-slate-800 text-right font-bold text-white">
                    ₹{record.amount.toFixed(2)}
                  </td>

                  <td className="px-4 py-4 border-y border-r border-slate-800 rounded-r-2xl text-right">
                    <button className="text-slate-600 hover:text-blue-400">
                      <MoreVertical size={16} />
                    </button>
                  </td>

                </tr>
              ))}

          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-400 uppercase tracking-widest">
          View Full History <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
