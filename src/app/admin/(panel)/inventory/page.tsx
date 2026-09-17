"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import InventoryTable from "@/components/admin/inventory/InventoryTable";
import Pagination from "@/components/admin/Pagination/Pagination";

import { getProducts } from "@/api/product";

export default function InventoryPage() {
  const [page, setPage] = useState(1);

  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["inventory", page],
    queryFn: () =>
      getProducts({
        page,
        limit,
      }),
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-slate-500">در حال دریافت اطلاعات موجودی...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">دریافت اطلاعات با خطا مواجه شد.</p>
      </div>
    );
  }

  const products = data?.data ?? [];

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">موجودی و قیمت</h1>

        <p className="mt-1 text-sm text-slate-500">
          مدیریت قیمت و موجودی محصولات
        </p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-700 hover:shadow-md active:scale-95 cursor-pointer"
          >
            ذخیره
          </button>
        </div>
      </div>

      <InventoryTable products={products} />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
