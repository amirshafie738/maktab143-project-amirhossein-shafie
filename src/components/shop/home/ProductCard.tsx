"use client";

import Link from "next/link";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import type { Product } from "@/types/product";
import type { RootState } from "@/redux/store";

import { toggleFavorite } from "@/redux/reducer/favoriteSlice";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorite.items.some((item) => item.id === product.id)
  );

  const imageUrl = product.thumbnail.startsWith("/files/")
    ? `http://localhost:3001${product.thumbnail}`
    : product.thumbnail;

  const isOutOfStock = product.quantity === 0;

  return (
    <article className="group w-full rounded-[28px] bg-white p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      {/* تصویر محصول */}
      <div className="relative overflow-hidden rounded-[22px] bg-[#f1ece6]">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square">
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* علاقه‌مندی */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            dispatch(toggleFavorite(product));
          }}
          className={`cursor-pointer absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition ${
            isFavorite
              ? "text-red-500"
              : "text-[#333] hover:text-[#7c243d]"
          }`}
        >
          <FiHeart
            size={21}
            className={isFavorite ? "fill-current" : ""}
          />
        </button>

        {/* سبد خرید */}
        <button
          type="button"
          disabled={isOutOfStock}
          className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c243d] text-white shadow-md opacity-0 translate-y-3 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#681f34] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FiShoppingBag size={20} />
        </button>
      </div>

      {/* اطلاعات محصول */}
      <div className="px-2 pb-3 pt-4">
        {/* برند + امتیاز */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-[#777]">{product.brand}</span>

          <div className="flex items-center gap-1 text-sm text-[#999]">
            <span>{product.rating}</span>

            <FiStar
              size={15}
              className="fill-[#b98a59] text-[#b98a59]"
            />
          </div>
        </div>

        {/* نام محصول */}
        <Link
          href={`/product/${product.id}`}
          className="block min-h-12 text-center text-[17px] font-bold leading-7 text-[#292929] transition hover:text-[#7c243d]"
        >
          {product.name}
        </Link>

        {/* قیمت */}
        <div className="mt-4 flex items-center justify-end">
          <span className="text-[17px] font-extrabold text-[#292929]">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* وضعیت ارسال */}
        <p
          className={`mt-3 text-center text-sm font-medium ${
            isOutOfStock ? "text-red-500" : "text-[#79906f]"
          }`}
        >
          {isOutOfStock ? "ناموجود" : "موجود و آماده ارسال"}
        </p>
      </div>
    </article>
  );
}