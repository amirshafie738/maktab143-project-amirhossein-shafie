"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { uploadProductImage, type ProductFormData, uploadProductImages } from "@/api/product";
import type { ProductFormValues } from "@/schemas/productSchema";
import ProductForm from "./ProductForm";

type ProductModalProps = {
  product?: Product | null;
  onClose: () => void;

  onSubmit: (data: ProductFormData) => Promise<void>;
};

export default function ProductModal({
  product,
  onClose,
  onSubmit,
}: ProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    data: ProductFormValues,
    imageFile: File | null,
    imageFiles: File[]
  ) => {
    try {
      setIsSubmitting(true);
      setError("");

      // عکس قبلی در حالت ویرایش
      let thumbnail = product?.thumbnail ?? "";
      let images = product?.image ?? [];
      // اگر عکس جدید انتخاب شده
      if (imageFile) {
        const result = await uploadProductImage(imageFile);

        thumbnail = result.path;
      }
      if (imageFiles.length > 0) {
        const results = await uploadProductImages(imageFiles);
      
        images = results.map((item) => item.path);
      }
      // محصول جدید باید عکس داشته باشد
      if (!thumbnail) {
        setError("لطفاً تصویر محصول را انتخاب کنید.");

        return;
      }

      const productData: ProductFormData = {
        ...data,
        thumbnail,
        image: images,
      };

      await onSubmit(productData);

      onClose();
    } catch (error) {
      console.error("Product submit error:", error);

      setError("ذخیره محصول با خطا مواجه شد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            {product ? "ویرایش محصول" : "افزودن محصول"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="cursor-pointer text-xl text-slate-500 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Form */}

        <ProductForm
          product={product}
          onClose={onClose}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          ImageError={error}
        />

       
      </div>
    </div>
  );
}
