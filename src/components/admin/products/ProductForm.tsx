"use client";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { Product } from "@/types/product";

import {
  productSchema,
  type ProductFormValues,
} from "@/schemas/productSchema";

import {
  type ProductFormData,
} from "@/api/product";

import {
  categories,
  subcategories,
} from "@/constants/productOptions";

import RichTextEditor from "./RichTextEditor";
import ProductImageUpload from "./ProductImageUpload";

type ProductFormProps = {
  product?: Product | null;
  onClose: () => void;
  onSubmit: (
    data: ProductFormData
  ) => Promise<void>;
};

export default function ProductForm({
  product,
  onClose,
  onSubmit,
}: ProductFormProps) {
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

  const filteredSubcategories =
    subcategories.filter(
      (subcategory) =>
        subcategory.category ===
        selectedCategory
    );

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        // تصویر از ProductImageUpload می‌آید
        // و در ProductModal مدیریت می‌شود.
        await onSubmit({
          ...data,
          thumbnail:
            product?.thumbnail ?? "",
        });
      })}
      className="space-y-4"
    >
      {/* نام محصول */}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          نام محصول
        </label>

        <input
          {...register("name")}
          placeholder="نام محصول را وارد کنید"
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
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
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500"
        />

        {errors.brand && (
          <p className="mt-1 text-sm text-red-500">
            {errors.brand.message}
          </p>
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
            className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-emerald-500"
          >
            <option value={0}>
              دسته‌بندی را انتخاب کنید
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
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

        {/* زیردسته‌بندی */}

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            زیردسته‌بندی
          </label>

          <select
            {...register("subcategory", {
              valueAsNumber: true,
            })}
            disabled={!selectedCategory}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value={0}>
              زیردسته‌بندی را انتخاب کنید
            </option>

            {filteredSubcategories.map(
              (subcategory) => (
                <option
                  key={subcategory.id}
                  value={subcategory.id}
                >
                  {subcategory.name}
                </option>
              )
            )}
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
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors.price.message}
            </p>
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
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500"
          />

          {errors.quantity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.quantity.message}
            </p>
          )}
        </div>
      </div>

      {/* توضیحات */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          توضیحات محصول
        </label>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
            />
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
          className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 transition hover:bg-slate-100"
        >
          انصراف
        </button>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-600"
        >
          {product
            ? "ذخیره تغییرات"
            : "افزودن محصول"}
        </button>
      </div>
    </form>
  );
}