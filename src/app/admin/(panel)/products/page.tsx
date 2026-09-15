"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ProductTable from "@/components/admin/products/ProductTable";
import Pagination from "@/components/admin/Pagination/Pagination";
import ProductFilter from "@/components/admin/products/ProductFilter";

import { getProducts } from "@/api/product";
import { getCategories } from "./categoty";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const limit = 5;

  // دریافت دسته‌بندی‌ها
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // دریافت محصولات
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, category],
    queryFn: () =>
      getProducts({
        page,
        limit,
        category,
      }),
  });

  const handleCategoryChange = (value: string) => {
    setCategory(value);

    // وقتی فیلتر عوض شد،
    // برمی‌گردیم صفحه اول
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-slate-500">در حال دریافت محصولات...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">دریافت محصولات با خطا مواجه شد.</p>
      </div>
    );
  }

  const products = data?.data ?? [];

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <div className="p-4 sm:p-6">
      {/* عنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">محصولات</h1>

        <p className="mt-1 text-sm text-slate-500">لیست محصولات فروشگاه</p>
      </div>

      {/* فیلتر */}
      <ProductFilter
        category={category}
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />

      {/* جدول */}
      <ProductTable products={products} />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
