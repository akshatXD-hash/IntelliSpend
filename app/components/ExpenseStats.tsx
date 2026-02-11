import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, PieChart } from "lucide-react";

export default function ExpenseStats() {

  const [avg, setAvg] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch("/api/auth/addexpense");
        const data = await res.json();

        if (!data.success) return;

        const records = data.record;

        if (records.length === 0) return;

        // 👉 Get all amounts
        const amounts = records.map((r: any) => r.amount);

        // 👉 Calculate total
        const total = amounts.reduce((a: number, b: number) => a + b, 0);

        // 👉 Set stats
        setAvg(total / amounts.length);
        setMax(Math.max(...amounts));
        setMin(Math.min(...amounts));
        setDays(amounts.length);

      } catch (err) {
        console.log("Error fetching stats", err);
      }
    }

    fetchExpenses();
  }, []);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 w-full">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <PieChart className="text-blue-400 w-6 h-6" />
        <h2 className="text-xl font-bold text-white">Expense Statistics</h2>
      </div>

      {/* Average */}
      <div className="text-center mb-6">
        <p className="text-slate-400 text-sm">Average Daily Spending</p>
        <h1 className="text-4xl font-bold text-white">
          ₹{avg.toFixed(2)}
        </h1>
        <p className="text-xs text-slate-500">
          Based on {days} records
        </p>
      </div>

      {/* Max + Min */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-red-500/10 p-4 rounded-xl">
          <TrendingUp className="text-red-400 mb-2" />
          <p className="text-xs text-slate-400">Highest</p>
          <h2 className="text-lg text-red-300 font-bold">₹{max}</h2>
        </div>

        <div className="bg-emerald-500/10 p-4 rounded-xl">
          <TrendingDown className="text-emerald-400 mb-2" />
          <p className="text-xs text-slate-400">Lowest</p>
          <h2 className="text-lg text-emerald-300 font-bold">₹{min}</h2>
        </div>

      </div>
    </div>
  );
}
