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

type ProductCartProps = {
  product: Product;
};

export default function ProductCart({
  product,
}: ProductCartProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images =
    product.image?.length > 0
      ? product.image
      : [product.thumbnail];

  const imageUrl = (image: string) =>
    image.startsWith("/files/")
      ? `http://localhost:3001${image}`
      : image;

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
    <main className=" bg-[#fcfaf7]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

    

        {/* کارت محصول */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* ================= تصاویر ================= */}
          <div className="flex flex-row-reverse gap-3">

            {/* تصویر اصلی */}
            <div className="flex-1 overflow-hidden rounded-[25px] bg-[#eee7df]">
              <div className="aspect-square">
                <img
                  src={imageUrl(images[selectedImage])}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* تصاویر کوچک */}
            <div className="flex w-20 flex-col gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-xl border-2 bg-[#eee7df] transition ${
                    selectedImage === index
                      ? "border-[#7c243d]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={imageUrl(image)}
                    alt={`${product.name} ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= اطلاعات محصول ================= */}
          <div className="flex flex-col justify-center text-right">

            {/* برند */}
            <p className="mb-2 text-sm font-bold text-[#8b2944]">
              {product.brand}
            </p>

            {/* نام */}
            <h1 className="text-3xl font-extrabold leading-[1.8] text-[#202020]">
              {product.name}
            </h1>

            {/* امتیاز و کد */}
            <div className="mt-3 flex items-center justify-start gap-3 text-sm text-[#777]">


              <span className="flex items-center gap-1">
                ۴.۹
                <FiStar
                  size={17}
                  className="fill-[#b88b58] text-[#b88b58]"
                />
              </span>
            </div>

            {/* توضیحات کوتاه */}
            <div
              className="mt-7 text-[15px] leading-8 text-[#666]"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />

            {/* قیمت */}
            <div className="mt-7 flex items-center justify-start gap-3">
              <span className="text-2xl font-extrabold text-[#222]">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            {/* موجودی */}
            <div className="mt-4 flex items-center justify-start gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  isOutOfStock
                    ? "bg-red-500"
                    : "bg-[#78876c]"
                }`}
              />

              <span className="text-[#777]">
                {isOutOfStock
                  ? "ناموجود"
                  : `موجود در انبار - ${product.quantity} عدد`}
              </span>
            </div>

            {/* دسته بندی */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-[#333]">
                مناسب برای
              </p>

              <span className="inline-flex rounded-full bg-[#f4f0eb] px-4 py-2 text-xs text-[#555]">
                همه انواع
              </span>
            </div>

            {/* خرید */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">

              {/* تعداد */}
              <div className="flex h-13 items-center justify-between rounded-full border border-[#ddd] px-4 sm:w-32">
                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    isOutOfStock ||
                    quantity >= product.quantity
                  }
                  className="text-xl disabled:text-[#ccc]"
                >
                  +
                </button>

                <span className="font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="text-xl disabled:text-[#ccc]"
                >
                  −
                </button>
              </div>

              {/* افزودن به سبد */}
              <button
                type="button"
                disabled={isOutOfStock}
                className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-[#7c243d] font-bold text-white shadow-lg shadow-[#7c243d]/15 transition hover:bg-[#681f34] disabled:cursor-not-allowed disabled:bg-[#ccc]"
              >
                <FiShoppingBag size={18} />
                افزودن به سبد خرید
              </button>

              {/* خرید سریع */}
              <button
                type="button"
                disabled={isOutOfStock}
                className="h-13 rounded-full border border-[#cfc5bb] px-7 font-bold text-[#333] transition hover:border-[#7c243d] hover:text-[#7c243d] disabled:text-[#aaa]"
              >
                خرید سریع
              </button>
            </div>

            {/* ارسال */}
            <div className="mt-4 flex items-center justify-start gap-2 rounded-2xl border border-[#dce3d7] bg-[#f3f6f0] px-5 py-4 text-sm text-[#66705e]">
              <FiCheckCircle size={18} />
              این انتخاب، شما را به ارسال رایگان می‌رساند.
            </div>

            {/* مزایا */}
            <div className="mt-5 flex flex-wrap justify-start gap-x-8 gap-y-3 text-xs text-[#777]">

              <div className="flex items-center gap-2">
                <FiTruck size={16} />
                آماده‌سازی و ارسال در ۱ تا ۳ روز کاری
              </div>

              <div className="flex items-center gap-2">
                <FiRotateCcw size={16} />
                بازگشت مطابق شرایط کالاهای بهداشتی
              </div>
            </div>

            {/* علاقه مندی / اشتراک گذاری */}
            <div className="mt-6 flex justify-start gap-8 border-t border-[#eee] pt-5">

              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold text-[#333] hover:text-[#7c243d]"
              >
                ذخیره در علاقه‌مندی
                <FiHeart size={19} />
              </button>

              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold text-[#333] hover:text-[#7c243d]"
              >
                اشتراک‌گذاری
                <FiShare2 size={18} />
              </button>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}