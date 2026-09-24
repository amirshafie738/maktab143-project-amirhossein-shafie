import ProductCard from "@/components/shop/home/ProductCard";
import type { Product } from "@/types/product";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({
  products,
}: ProductListProps) {
  // حالت بدون محصول
  if (products.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <p className="text-sm text-slate-500">
          محصولی پیدا نشد.
        </p>
      </div>
    );
  }

  return (
    // گرید محصولات
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}