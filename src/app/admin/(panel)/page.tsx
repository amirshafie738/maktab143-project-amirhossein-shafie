"use client";

import { useQuery } from "@tanstack/react-query";
import {
  FiAlertCircle,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";

import { getDashboardStats } from "@/api/dashboard";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import OrderStatusChart from "@/components/admin/dashboard/OrderStatusChart";
import LowStockProducts from "@/components/admin/dashboard/LowStockProducts";
import TopProducts from "@/components/admin/dashboard/TopProducts";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  // حالت بارگذاری
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-xl border bg-gray-100"
            />
          ))}
        </div>

        <div className="h-[350px] animate-pulse rounded-xl border bg-gray-100" />
      </div>
    );
  }

  // حالت خطا
  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <FiAlertCircle
            className="mx-auto text-red-500"
            size={40}
          />

          <p className="mt-3 font-medium text-red-500">
            خطا در دریافت اطلاعات داشبورد
          </p>

          <p className="mt-1 text-sm text-gray-500">
            اتصال به سرور را بررسی کنید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* عنوان */}
      <div>
        <h1 className="text-2xl font-bold">
          داشبورد
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          خلاصه وضعیت فروشگاه
        </p>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* فروش */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                مجموع فروش
              </p>

              <p className="mt-2 text-2xl font-bold">
                {data.totalSales.toLocaleString("fa-IR")}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                تومان
              </p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <FiDollarSign size={24} />
            </div>
          </div>
        </div>

        {/* سفارش */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                سفارش‌های موفق
              </p>

              <p className="mt-2 text-2xl font-bold">
                {data.totalOrders.toLocaleString("fa-IR")}
              </p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <FiShoppingBag size={24} />
            </div>
          </div>
        </div>

        {/* محصولات */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                تعداد محصولات
              </p>

              <p className="mt-2 text-2xl font-bold">
                {data.totalProducts.toLocaleString("fa-IR")}
              </p>
            </div>

            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <FiPackage size={24} />
            </div>
          </div>
        </div>

        {/* ناموجود */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                محصولات ناموجود
              </p>

              <p className="mt-2 text-2xl font-bold">
                {data.outOfStockProducts.toLocaleString("fa-IR")}
              </p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <FiAlertCircle size={24} />
            </div>
          </div>
        </div>

      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SalesChart />
        <OrderStatusChart />
      </div>

      {/* محصولات */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LowStockProducts />
        <TopProducts />
      </div>

    </div>
  );
}