"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

import OrdersTable from "@/components/admin/orders/OrdersTable";
import Pagination from "@/components/Pagination/Pagination";

import { getOrders } from "@/api/orders";
import { Order } from "@/types/order";
import OrderDetailsModal from "@/components/admin/orders/OrderDetailsModal";

type OrderFilter = "true" | "false";
type SortOrder = "desc" | "asc";

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // پیشفرض: سفارش‌های تحویل نشده
  const [delivered, setDelivered] = useState<OrderFilter>("false");

  // پیشفرض: جدیدترین سفارش‌ها بالا
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", page, delivered, sortOrder],

    queryFn: () =>
      getOrders({
        page,
        limit,
        delivered,
        sortOrder,
      }),
  });

  const handleFilterChange = (value: OrderFilter) => {
    setDelivered(value);

    // برگشت به صفحه اول
    setPage(1);
  };

  const handleSortChange = () => {
    setSortOrder((current) => (current === "desc" ? "asc" : "desc"));

    // برگشت به صفحه اول
    setPage(1);
  };

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
      {/* عنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">سفارش‌ها</h1>

        <p className="mt-1 text-sm text-slate-500">مدیریت سفارش‌های فروشگاه</p>
      </div>

      {/* فیلتر و مرتب‌سازی */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* فیلتر وضعیت */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => handleFilterChange("false")}
            className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              delivered === "false"
                ? "bg-red-400 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            سفارش‌های در انتظار ارسال
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange("true")}
            className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              delivered === "true"
                ? "bg-emerald-500 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            سفارش‌های تحویل داده شده
          </button>
        </div>
      </div>

      {/* جدول */}
      <OrdersTable
        orders={orders}
        sortOrder={sortOrder}
        onSort={handleSortChange}
        onView={setSelectedOrder}
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* مودال */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
