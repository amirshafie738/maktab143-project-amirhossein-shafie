"use client";

import { useState } from "react";

import {
  FiHeart,
  FiShare2,
  FiShoppingBag,
  FiStar,
  FiCheckCircle,
  FiTruck,
  FiRotateCcw,
} from "react-icons/fi";

import type { Product } from "@/types/product";

import ProductSlider from "./ProductSlider";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

import { addToCart } from "@/redux/reducer/cartSlice";
import { toggleFavorite } from "@/redux/reducer/favoriteSlice";

type ProductCartProps = {
  product: Product;
};

export default function ProductCart({ product }: ProductCartProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  const isFavorite = useSelector((state: RootState) =>
    state.favorite.items.some((item) => item.id === product.id)
  );

  const images =
    product.image?.length > 0
      ? product.image
      : product.thumbnail
      ? [product.thumbnail]
      : [];

  const imageUrl = (image: string) =>
    image.startsWith("/files/") ? `http://localhost:3001${image}` : image;

  const isOutOfStock = product.quantity === 0;

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <main className="bg-[#fcfaf7]">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* کارت اصلی محصول */}
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* گالری */}
          <div className="min-w-0 w-full">
            <ProductSlider
              images={images}
              productName={product.name}
              imageUrl={imageUrl}
            />
          </div>

          {/* اطلاعات محصول */}
          <div className="min-w-0 flex flex-col justify-center text-right">
            {/* برند */}
            <div className="mb-4 flex items-center justify-start gap-3">
              <span className="rounded-full bg-[#f8edf0] px-4 py-1.5 text-xs font-bold text-[#8b2944]">
                {product.brand}
              </span>

              <span className="h-1 w-1 rounded-full bg-[#c8bdb5]" />

              <span className="text-xs text-[#999]">موجود در فروشگاه</span>
            </div>

            {/* نام محصول */}
            <h1 className="max-w-2xl text-2xl font-extrabold leading-[1.8] tracking-tight text-[#202020] sm:text-3xl lg:text-[34px]">
              {product.name}
            </h1>

            {/* امتیاز */}
            <div className="mt-4 flex items-center justify-start gap-4">
              <span className="flex items-center gap-1.5 rounded-full bg-[#f7f2eb] px-3.5 py-1.5 text-sm font-bold text-[#8b6a48]">
                ۴.۹
                <FiStar size={16} className="fill-[#b88b58] text-[#b88b58]" />
              </span>

              <span className="text-xs text-[#999]">رضایت مشتریان</span>
            </div>

            {/* خط جداکننده */}
            <div className="my-6 h-px w-full bg-[#eee5dc]" />

            {/* توضیحات */}
            <div
              className="max-w-2xl text-[15px] leading-8 text-[#686868]"
              dangerouslySetInnerHTML={{
                __html: product.description ?? "",
              }}
            />

            {/* قیمت */}
            <div className="mt-8 rounded-[22px] border border-[#eee4da] bg-white px-5 py-5">
              <p className="mb-2 text-xs text-[#999]">قیمت محصول</p>

              <div className="flex items-end justify-start gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-[#222] sm:text-3xl">
                  {product.price.toLocaleString("fa-IR")}
                </span>

                <span className="mb-1 text-sm font-medium text-[#777]">
                  تومان
                </span>
              </div>
            </div>

            {/* موجودی */}
            <div className="mt-5 flex items-center justify-start gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isOutOfStock ? "bg-red-500" : "bg-[#78876c]"
                }`}
              />

              <span className="text-sm text-[#666]">
                {isOutOfStock
                  ? "این محصول در حال حاضر ناموجود است"
                  : `موجود در انبار — ${product.quantity} عدد`}
              </span>
            </div>

            {/* دسته بندی */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-[#333]">مناسب برای</p>

              <span className="inline-flex rounded-full border border-[#e7ddd3] bg-white px-5 py-2 text-xs font-medium text-[#666]">
                همه انواع پوست
              </span>
            </div>

            {/* خرید */}
            <div className="mt-7 rounded-[24px] border border-[#eee5dc] bg-white p-4 shadow-[0_8px_30px_rgba(70,45,30,0.04)] sm:p-5">
              <div className="flex w-full flex-col gap-3 sm:flex-row-reverse">
                {/* تعداد */}
                <div className="flex h-13 w-full shrink-0 items-center justify-between rounded-full border border-[#e1d8d0] bg-[#fcfaf7] px-5 sm:w-30">
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={isOutOfStock || quantity >= product.quantity}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[#555] transition hover:bg-white hover:text-[#7c243d] disabled:text-[#ccc]"
                  >
                    +
                  </button>

                  <span className="text-sm font-bold text-[#333]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[#555] transition hover:bg-white hover:text-[#7c243d] disabled:text-[#ccc]"
                  >
                    −
                  </button>
                </div>

                {/* افزودن به سبد */}
                <button
                  type="button"
                  disabled={isOutOfStock}
                  className="flex h-13 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#7c243d] px-5 font-bold text-white shadow-[0_8px_20px_rgba(124,36,61,0.18)] transition duration-200 hover:bg-[#681f34] hover:shadow-[0_10px_25px_rgba(124,36,61,0.24)] disabled:cursor-not-allowed disabled:bg-[#ccc] disabled:shadow-none"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        product,
                        quantity,
                      })
                    );
                  }}
                >
                  <FiShoppingBag size={18} />

                  <span>افزودن به سبد خرید</span>
                </button>

                {/* خرید سریع */}
                <button
                  type="button"
                  disabled={isOutOfStock}
                  className="h-13 w-full shrink-0 rounded-full border border-[#d8cec5] bg-white px-6 font-bold text-[#333] transition duration-200 hover:border-[#7c243d] hover:text-[#7c243d] disabled:text-[#aaa] sm:w-auto"
                >
                  خرید سریع
                </button>
              </div>
            </div>

            {/* ارسال رایگان */}
            <div className="mt-4 flex items-center gap-3 rounded-[20px] border border-[#dce3d7] bg-[#f3f6f0] px-5 py-4 text-sm text-[#66705e]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <FiCheckCircle size={18} />
              </div>

              <span>این انتخاب، شما را به ارسال رایگان می‌رساند.</span>
            </div>

            {/* مزایا */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-[18px] border border-[#eee5dc] bg-white px-4 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7f2eb] text-[#806d5b]">
                  <FiTruck size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#444]">ارسال سریع</p>

                  <p className="mt-1 text-[11px] text-[#999]">
                    ۱ تا ۳ روز کاری
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[18px] border border-[#eee5dc] bg-white px-4 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7f2eb] text-[#806d5b]">
                  <FiRotateCcw size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#444]">امکان بازگشت</p>

                  <p className="mt-1 text-[11px] text-[#999]">
                    مطابق شرایط کالا
                  </p>
                </div>
              </div>
            </div>

            {/* علاقه مندی / اشتراک گذاری */}
            <div className="mt-6 flex flex-wrap items-center justify-start gap-x-8 gap-y-4 border-t border-[#eee5dc] pt-5">
              {/* علاقه مندی */}
              <button
                type="button"
                onClick={() => {
                  dispatch(toggleFavorite(product));
                }}
                className={`group flex items-center gap-2 text-sm font-bold transition ${
                  isFavorite
                    ? "text-red-500"
                    : "text-[#444] hover:text-[#7c243d]"
                }`}
              >
                <span>
                  {isFavorite ? "حذف از علاقه‌مندی" : "ذخیره در علاقه‌مندی"}
                </span>

                <FiHeart
                  size={19}
                  className={`transition-transform group-hover:scale-110 ${
                    isFavorite ? "fill-current" : ""
                  }`}
                />
              </button>

              {/* اشتراک گذاری */}
              <button
                type="button"
                className="group flex items-center gap-2 text-sm font-bold text-[#444] transition hover:text-[#7c243d]"
              >
                <span>اشتراک‌گذاری</span>

                <FiShare2
                  size={18}
                  className="transition-transform group-hover:scale-110"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
