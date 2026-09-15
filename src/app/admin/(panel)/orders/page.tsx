"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import OrdersTable from "@/components/admin/orders/OrdersTable";
import Pagination from "@/components/admin/Pagination/Pagination";

import { getOrders } from "@/api/orders";

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", page],
    queryFn: () =>
      getOrders({
        page,
        limit,
      }),
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-slate-500">در حال دریافت سفارش‌ها...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">دریافت سفارش‌ها با خطا مواجه شد.</p>
      </div>
    );
  }

  const orders = data?.data ?? [];

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">سفارش‌ها</h1>

        <p className="mt-1 text-sm text-slate-500">لیست سفارش‌های ثبت شده</p>
      </div>

      <OrdersTable orders={orders} />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
