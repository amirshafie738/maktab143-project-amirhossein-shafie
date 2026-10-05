"use client";

import { getDashboardOrderStatus } from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";



export default function OrderStatusChart() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["dashboard-order-status"],
    queryFn: getDashboardOrderStatus,
  });

  if (isLoading) {
    return (
      <div className="h-87.5 rounded-xl border bg-white p-5">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  const colors = ["#7d2945", "#d4a017"];

  return (
    <div className="rounded-xl border bg-white p-5">
      <h2 className="mb-6 text-lg font-bold">
        وضعیت سفارش‌ها
      </h2>

      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}