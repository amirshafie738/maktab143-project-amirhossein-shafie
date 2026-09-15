"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ProductTable from "@/components/admin/products/ProductTable";
import Pagination from "@/components/admin/products/Pagination";
import { getProducts } from "@/api/product";

export default function ProductsPage() {
  const [page, setPage] = useState(1);

  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts({ page, limit }),
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-slate-500">
          در حال دریافت محصولات...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">
          دریافت محصولات با خطا مواجه شد.
        </p>
      </div>
    );
  }

  const products = data?.data ?? [];

  const totalPages = Math.ceil(
    (data?.total ?? 0) / limit
  );

  return (
    <div className="p-4 sm:p-6">

      {/* عنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          محصولات
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          لیست محصولات فروشگاه
        </p>
      </div>

      {/* جدول */}
      <ProductTable products={products} />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}