"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "@/types/product";
import { productSchema, type ProductFormValues } from "@/schemas/productSchema";
import { subcategories } from "@/constants/productOptions";
import RichTextEditor from "./RichTextEditor";
import ProductImageUpload from "./ProductImageUpload";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categoty";

type ProductFormProps = {
  product?: Product | null;
  onClose: () => void;

  onSubmit: (data: ProductFormValues, imageFile: File | null) => Promise<void>;

  isSubmitting?: boolean;
  ImageError: string;
};

export default function ProductForm({
  product,
  onClose,
  onSubmit,
  isSubmitting = false,
  ImageError,
}: ProductFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: product?.name ?? "",
      brand: product?.brand ?? "",
      category: product?.category ?? 0,
      subcategory: product?.subcategory ?? 0,
      description: product?.description ?? "",
      price: product?.price ?? 0,
      quantity: product?.quantity ?? 0,
    },
  });

  const selectedCategory = watch("category");

  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory
  );

  const submitHandler = async (data: ProductFormValues) => {
    await onSubmit(data, imageFile);
  };
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {/* نام */}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          نام محصول
        </label>

        <input
          {...register("name")}
          placeholder="نام محصول را وارد کنید"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* برند */}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          برند
        </label>

        <input
          {...register("brand")}
          placeholder="برند را وارد کنید"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
        />

        {errors.brand && (
          <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>
        )}
      </div>

      {/* دسته‌بندی */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            دسته‌بندی
          </label>

          <select
            {...register("category", {
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
          >
            <option value={0}>دسته‌بندی را انتخاب کنید</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* زیردسته */}

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            زیردسته‌بندی
          </label>

          <select
            {...register("subcategory", {
              valueAsNumber: true,
            })}
            disabled={!selectedCategory || isSubmitting}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value={0}>زیردسته‌بندی را انتخاب کنید</option>

            {filteredSubcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>

          {errors.subcategory && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subcategory.message}
            </p>
          )}
        </div>
      </div>

      {/* قیمت و موجودی */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            قیمت
          </label>

          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            placeholder="قیمت"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            موجودی
          </label>

          <input
            type="number"
            {...register("quantity", {
              valueAsNumber: true,
            })}
            placeholder="موجودی"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
          />

          {errors.quantity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.quantity.message}
            </p>
          )}
        </div>
      </div>

      {/* تصویر */}

      <ProductImageUpload
        initialImage={product?.thumbnail}
        onImageChange={setImageFile}
        disabled={isSubmitting}
      />
      {/* Error */}

      {ImageError && (
        <p className=" text-sm text-red-500">{ImageError}</p>
      )}
      {/* توضیحات */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          توضیحات محصول
        </label>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor value={field.value} onChange={field.onChange} />
          )}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* دکمه‌ها */}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "در حال ذخیره..."
            : product
            ? "ذخیره تغییرات"
            : "افزودن محصول"}
        </button>
      </div>
    </form>
  );
}
