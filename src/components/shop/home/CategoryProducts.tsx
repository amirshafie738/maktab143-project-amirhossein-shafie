"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "@/api/shop/products";
import ProductCard from "@/components/shop/home/ProductCard";

export default function CategoryProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-makeup-products"],
    queryFn: () =>
      getFilteredProducts({
        category: "3",
        limit: 4,
        sort: "newest",
      }),
  });

  if (isLoading) {
    return null;
  }

  const products = data?.data ?? [];

  return (
    <section className="bg-[#fcfaf7] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان */}
        <div className="mb-8 flex items-end justify-between">
          <div className="text-right">
            <p className="mb-2 text-sm font-bold text-[#7c243d]">
              محصولات آرایشی
            </p>

            <h2 className="text-3xl font-extrabold text-[#222] sm:text-4xl">
              محبوب‌ترین محصولات آرایشی
            </h2>
          </div>
          <Link
            href="/products?category=3"
            className="flex items-center gap-2 text-sm font-bold text-[#333] transition hover:text-[#7c243d]"
          >
            مشاهده همه
            <span className="text-lg">←</span>
          </Link>
        </div>

        {/* محصولات */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
