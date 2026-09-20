"use client";

import { useState } from "react";

import type { Product } from "@/types/product";

import {
  uploadProductImage,
  type ProductFormData,
} from "@/api/product";

import ProductForm from "./ProductForm";
import ProductImageUpload from "./ProductImageUpload";

type ProductModalProps = {
  product?: Product | null;
  onClose: () => void;
  onSubmit: (
    data: ProductFormData
  ) => Promise<void>;
};

export default function ProductModal({
  product,
  onClose,
  onSubmit,
}: ProductModalProps) {
  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [imageError, setImageError] =
    useState("");

  const handleSubmit = async (
    data: ProductFormData
  ) => {
    try {
      setIsSubmitting(true);
      setImageError("");

      let thumbnail =
        product?.thumbnail ?? "";

      // اگر عکس جدید انتخاب شده
      if (imageFile) {
        const result =
          await uploadProductImage(imageFile);

        thumbnail = result.path;
      }

      // محصول جدید باید عکس داشته باشد
      if (!thumbnail) {
        setImageError(
          "لطفاً تصویر محصول را انتخاب کنید."
        );

        return;
      }

      await onSubmit({
        ...data,
        thumbnail,
      });

      onClose();
    } catch (error) {
      console.error(
        "Product submit error:",
        error
      );

      setImageError(
        "ذخیره محصول با خطا مواجه شد."
      );
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
            {product
              ? "ویرایش محصول"
              : "افزودن محصول"}
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

        {/* تصویر */}

        <div className="mb-5">
          <ProductImageUpload
            initialImage={
              product?.thumbnail ?? ""
            }
            onImageChange={(file) => {
              setImageFile(file);
              setImageError("");
            }}
            disabled={isSubmitting}
          />

          {imageError && (
            <p className="mt-1 text-sm text-red-500">
              {imageError}
            </p>
          )}
        </div>

        {/* فرم */}

        <ProductForm
          product={product}
          onClose={onClose}
          onSubmit={handleSubmit}
        />

        {/* Loading */}

        {isSubmitting && (
          <div className="mt-3 text-center text-sm text-slate-500">
            در حال ذخیره محصول...
          </div>
        )}
      </div>
    </div>
  );
}