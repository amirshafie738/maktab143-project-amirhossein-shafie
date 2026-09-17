"use client";

import { useState } from "react";
import { FiFilter } from "react-icons/fi";

import CategorySidebar from "@/components/shop/products/CategorySidebar";
import CategoryFilterModal from "@/components/shop/products/CategoryFilterModal";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fcfaf8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* عنوان و فیلتر موبایل */}
        <div className="mb-14 flex  items-center justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#292929]">
              انتخاب‌های دقیق برای روتین شما
            </h1>

            <span className="mt-1 block text-base text-gray-500">
              میان محصولات مراقبت پوست، آرایش، مو و عطر جست‌وجو کنید و با
              فیلترهای کاربردی به انتخاب مناسب
            </span>
          </div>

          {/* فقط موبایل */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-[#decfc7] bg-white px-4 text-sm font-semibold text-[#292929] lg:hidden"
          >
            <FiFilter className="text-[#7c243d]" />
            فیلترها
          </button>
        </div>

        {/* محتویات صفحه */}
        <div className="flex items-start gap-6">
          {/* Sidebar دسکتاپ */}
          <div className="hidden lg:block">
            <CategorySidebar />
          </div>

          {/* بخش محصولات */}
          <section className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-gray-500">۹ محصول</span>

              <div className="flex items-center gap-2">
                <span className="hidden text-sm font-semibold sm:block">
                  مرتب‌سازی:
                </span>

                <select
                  defaultValue="newest"
                  className="h-10 rounded-xl border border-[#decfc7] bg-white px-3 text-sm outline-none"
                >
                  <option value="newest">جدیدترین</option>

                  <option value="popular">محبوب‌ترین</option>

                  <option value="price-low">ارزان‌ترین</option>

                  <option value="price-high">گران‌ترین</option>
                </select>
              </div>
            </div>

            {/* ProductList بعداً اینجا قرار می‌گیرد */}
          </section>
        </div>
      </div>

      {/* Modal موبایل */}
      <CategoryFilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </main>
  );
}
