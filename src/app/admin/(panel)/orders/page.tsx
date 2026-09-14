"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/api/orders";
import OrdersTable from "@/components/admin/orders/OrdersTable";

export default function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-slate-500">
          در حال دریافت سفارش‌ها...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">
          دریافت سفارش‌ها با خطا مواجه شد.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          سفارش‌ها
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          لیست سفارش‌های ثبت شده
        </p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}