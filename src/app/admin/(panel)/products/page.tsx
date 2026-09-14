"use client";

import { useEffect, useState } from "react";


import type { Product } from "@/types/product";
import ProductTable from "@/components/admin/products/ProductTable";
import { getProducts } from "@/api/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-500">
          در حال دریافت محصولات...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          محصولات
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          لیست محصولات فروشگاه
        </p>
      </div>

      <ProductTable products={products} />
    </div>
  );
}