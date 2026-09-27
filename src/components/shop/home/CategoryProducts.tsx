"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getFilteredProducts } from "@/api/shop/products";
import ProductCard from "@/components/shop/home/ProductCard";

type CategoryProductsProps = {
  category: string;
  title: string;
};
export default function CategoryProducts({
  category,
  title,
}: CategoryProductsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category-products", category],
    queryFn: () =>
      getFilteredProducts({
        category,
        limit: 4,
        sort: "newest",
      }),
  });

  if (isLoading) {
    return null;
  }

  const products = data?.data ?? [];

  return (
    <section className="bg-[#fcfaf7] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#292929]">{title}</h2>
          </div>

          <Link
            href={`/products?category=${category}`}
            className="text-sm font-semibold text-[#292929]"
          >
            مشاهده همه ←
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
