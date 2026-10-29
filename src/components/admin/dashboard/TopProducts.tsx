"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboardTopProducts } from "@/api/dashboard";

export default function TopProducts() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["dashboard-top-products"],
    queryFn: getDashboardTopProducts,
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
      <div className="mb-5">
        <h2 className="text-lg font-bold">
          پرفروش‌ترین محصولات
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          بر اساس تعداد فروش
        </p>
      </div>

      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          هنوز فروشی ثبت نشده است
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((product, index) => {
            const imageUrl = product.thumbnail.startsWith("/files/")
              ? `http://localhost:3001${product.thumbnail}`
              : product.thumbnail;

            return (
              <div
                key={product.id}
                className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
              >
                {/* رتبه */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold">
                  {index + 1}
                </div>

                {/* تصویر */}
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
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

                {/* تعداد فروش */}
                <div className="shrink-0 text-left">
                  <p className="text-xs text-gray-500">
                    فروش
                  </p>

                  <p className="mt-1 font-bold text-[#7d2945]">
                    {product.soldCount.toLocaleString("fa-IR")}
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