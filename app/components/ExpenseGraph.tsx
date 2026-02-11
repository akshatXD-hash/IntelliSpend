"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ExpenseGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("/api/auth/addexpense");

        // 👇 using YOUR backend response
        const formatted = res.data.record.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          amount: item.amount
        }));

        setData(formatted);
      } catch (err) {
        console.error("Graph fetch error", err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="amount" />
    </LineChart>
  );
}
