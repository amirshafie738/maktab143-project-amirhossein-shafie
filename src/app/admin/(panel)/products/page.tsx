"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductTable from "@/components/admin/products/ProductTable";
import Pagination from "@/components/Pagination/Pagination";
import ProductFilter from "@/components/admin/products/ProductFilter";
import ProductModal from "@/components/admin/products/ProductModal";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type ProductFormData,
} from "@/api/product";

import { getCategories } from "../../../../api/categoty";

import type { Product } from "@/types/product";

export default function ProductsPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const limit = 5;

  // -----------------------------
  // Categories
  // -----------------------------

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // -----------------------------
  // Products
  // -----------------------------

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, category],

    queryFn: () =>
      getProducts({
        page,
        limit,
        category,
      }),
  });

  // -----------------------------
  // Create
  // -----------------------------

  const createMutation = useMutation({
    mutationFn: (product: ProductFormData) => createProduct(product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setIsModalOpen(false);
    },
  });

  // -----------------------------
  // Update
  // -----------------------------

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormData }) =>
      updateProduct(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setIsModalOpen(false);
    },
  });

  // -----------------------------
  // Delete
  // -----------------------------

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  // -----------------------------
  // Open Add Modal
  // -----------------------------

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  // -----------------------------
  // Open Edit Modal
  // -----------------------------

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // -----------------------------
  // Save Product
  // -----------------------------

  const handleSubmitProduct = async (productData: ProductFormData) => {
    if (selectedProduct) {
      await updateMutation.mutateAsync({
        id: selectedProduct.id,
        data: productData,
      });

      return;
    }

    await createMutation.mutateAsync(productData);
  };

  // -----------------------------
  // Delete Product
  // -----------------------------

  const handleDeleteProduct = async (id: number) => {
    const confirmed = window.confirm("آیا از حذف این محصول مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(id);
  };

  // -----------------------------
  // Category Change
  // -----------------------------

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (isLoading) {
    return <div className="p-6 text-center">در حال دریافت محصولات...</div>;
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        دریافت محصولات با خطا مواجه شد.
      </div>
    );
  }
  // گرفتن دیتا و گرفتن تعداد کل صفحه
  const products = data?.data ?? [];

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">محصولات</h1>

          <p className="mt-1 text-sm text-slate-500">مدیریت محصولات فروشگاه</p>
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-600"
        >
          <span className="text-xl">+</span>

          <span>افزودن کالا</span>
        </button>
      </div>

      {/* Filter */}

      <ProductFilter
        categories={categories}
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Table */}

      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Pagination */}

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Modal */}

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleSubmitProduct}
        />
      )}
    </div>
  );
}
