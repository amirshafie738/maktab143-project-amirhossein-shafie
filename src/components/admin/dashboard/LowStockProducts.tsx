"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getDashboardLowStock } from "@/api/dashboard";

export default function LowStockProducts() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["dashboard-low-stock"],
    queryFn: getDashboardLowStock,
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-5">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5">

      {/* عنوان */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          محصولات کم‌موجودی
        </h2>

        <Link
          href="/admin/inventory"
          className="text-sm text-[#7d2945] hover:underline"
        >
          مشاهده همه
        </Link>
      </div>

      {/* لیست */}
      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          محصول کم‌موجودی وجود ندارد
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((product) => {
            const imageUrl = product.thumbnail.startsWith("/files/")
              ? `http://localhost:3001${product.thumbnail}`
              : product.thumbnail;

            return (
              <div
                key={product.id}
                className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
              >
                {/* تصویر */}
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />

                {/* اطلاعات */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {product.brand}
                  </p>
                </div>

                {/* موجودی */}
                <div className="text-left">
                  <p className="text-xs text-gray-500">
                    موجودی
                  </p>

                  <p className="mt-1 font-bold text-red-600">
                    {product.quantity.toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}