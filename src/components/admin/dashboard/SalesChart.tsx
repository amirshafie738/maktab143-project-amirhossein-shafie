"use client";

import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getDashboardSales } from "@/api/dashboard";

export default function SalesChart() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["dashboard-sales"],
    queryFn: getDashboardSales,
  });

  if (isLoading) {
    return (
      <div className="h-87.5 rounded-xl border bg-white p-5">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("fa-IR", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="rounded-xl border bg-white p-5">
      <h2 className="mb-6 text-lg font-bold">
        نمودار فروش
      </h2>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis
              tickFormatter={(value) =>
                value.toLocaleString("fa-IR")
              }
            />

            <Tooltip
              formatter={(value) =>
                `${Number(value).toLocaleString("fa-IR")} تومان`
              }
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#7d2945"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}