"use client";

import { useQuery } from "@tanstack/react-query";


import InventoryTable from "@/components/admin/inventory/InventoryTable";
import { getProducts } from "@/api/product";

export default function InventoryPage() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-slate-500">
          در حال دریافت اطلاعات موجودی...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">
          دریافت اطلاعات با خطا مواجه شد.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          موجودی و قیمت
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          مدیریت قیمت و موجودی محصولات
        </p>
      </div>

      <InventoryTable products={products} />
    </div>
  );
}