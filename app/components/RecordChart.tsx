"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3 } from "lucide-react";

type Mode = "weekly" | "monthly";

export default function RecordChart() {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("weekly");
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  // 🔥 Fetch Records
  const fetchRecords = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/auth/addexpense");
      const records = res.data.record;

      if (mode === "weekly") {
        buildLast7Days(records);
      } else {
        buildMonthly(records);
      }

      setLoading(false);
    } catch (err) {
      console.error("Chart fetch error", err);
      setLoading(false);
    }
  };

  // ⭐ Load once or when mode changes
  useEffect(() => {
    fetchRecords();
  }, [mode]);

  // ⭐ Weekly Analytics
  const buildLast7Days = (records: any[]) => {
    const today = new Date();
    const days: number[] = [];
    const dayLabels: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const label = date.toLocaleDateString("en-IN", {
        weekday: "short"
      });

      const total = records
        .filter((r) => {
          const d = new Date(r.date);
          return d.toDateString() === date.toDateString();
        })
        .reduce((sum, r) => sum + r.amount, 0);

      days.push(total);
      dayLabels.push(label);
    }

    setData(days);
    setLabels(dayLabels);
  };

  // ⭐ Monthly Analytics
  const buildMonthly = (records: any[]) => {
    const months = Array(12).fill(0);

    records.forEach((r) => {
      const m = new Date(r.date).getMonth();
      months[m] += r.amount;
    });

    setData(months);

    setLabels([
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ]);
  };

  const maxAmount = Math.max(...data, 1);

  const getHeight = (amount: number) => {
    return `${(amount / maxAmount) * 100}%`;
  };

  const formatYAxis = (value: number) => {
    return `₹${Math.round(value / 1000)}k`;
  };

  const yLevels = [1, 0.75, 0.5, 0.25, 0].map(
    (p) => maxAmount * p
  );

  return (
    <div
      className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 w-full shadow-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2.5 rounded-xl">
            <BarChart3 className="text-blue-400 w-6 h-6" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Expense Analytics
            </h2>
            <p className="text-slate-500 text-sm">
              Visual representation of your spending
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex bg-slate-800 rounded-lg overflow-hidden">
          <button
            onClick={() => setMode("weekly")}
            className={`px-3 py-1 text-sm ${
              mode === "weekly"
                ? "bg-blue-600 text-white"
                : "text-slate-400"
            }`}
          >
            Weekly
          </button>

          <button
            onClick={() => setMode("monthly")}
            className={`px-3 py-1 text-sm ${
              mode === "monthly"
                ? "bg-blue-600 text-white"
                : "text-slate-400"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 w-full flex items-end justify-between gap-2 px-2 border-b border-l border-slate-700/50">

        {/* Y Axis */}
        <div className="absolute -left-12 h-full flex flex-col justify-between text-[10px] text-slate-500 text-right pr-2">
          {yLevels.map((v, i) => (
            <span key={i}>{formatYAxis(v)}</span>
          ))}
        </div>

        {/* Grid */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-slate-800/30" />
          ))}
        </div>

        {/* Bars */}
        {loading
          ? [...Array(labels.length || 7)].map((_, i) => (
              <div
                key={i}
                className="w-full h-20 bg-slate-700/30 animate-pulse rounded-t-lg"
              />
            ))
          : data.map((amount, i) => (
              <div
                key={i}
                className="w-full rounded-t-lg relative group bg-gradient-to-t from-blue-600 to-blue-400 hover:brightness-110"
                style={{
                  height: getHeight(amount),
                  transition: hovered ? "height 0.7s ease" : "none"
                }}
              >
                <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                  ₹{amount.toLocaleString()}
                </div>
              </div>
            ))}
      </div>

      {/* X Axis */}
      <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        {labels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </div>
  );
}
