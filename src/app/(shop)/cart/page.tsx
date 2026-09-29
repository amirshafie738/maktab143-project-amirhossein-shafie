"use client";

import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "@/redux/store";
import { removeFromCart, updateCartQuantity } from "@/redux/reducer/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  // تایید حذف
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#292929]">
          سبد خرید شما خالی است
        </h1>

        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-[#7c243d] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#681f34]"
        >
          مشاهده محصولات
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-extrabold text-[#292929]">سبد خرید</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        {/* محصولات */}
        <div className="space-y-4">
          {cartItems.map((item) => {
            const { product, quantity } = item;

            const imageUrl = product.thumbnail.startsWith("/files/")
              ? `http://localhost:3001${product.thumbnail}`
              : product.thumbnail;

            return (
              <div
                key={product.id}
                className="flex flex-col gap-5 rounded-2xl border border-[#e5ddd5] bg-white p-5 sm:flex-row sm:items-center"
              >
                {/* تصویر */}
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-28 w-28 rounded-xl object-cover"
                />

                {/* اطلاعات */}
                <div className="min-w-0 flex-1 text-right">
                  <p className="text-xs text-gray-500">{product.brand}</p>

                  <h2 className="mt-1 text-base font-bold text-[#292929]">
                    {product.name}
                  </h2>

                  <p className="mt-3 font-bold text-[#7c243d]">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </p>
                </div>

                {/* تعداد */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateCartQuantity({
                          id: product.id,
                          quantity: quantity - 1,
                        })
                      )
                    }
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ddd] disabled:opacity-40"
                  >
                    <FiMinus size={15} />
                  </button>

                  <span className="min-w-6 text-center font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateCartQuantity({
                          id: product.id,
                          quantity: quantity + 1,
                        })
                      )
                    }
                    disabled={quantity >= product.quantity}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ddd] disabled:opacity-40"
                  >
                    <FiPlus size={15} />
                  </button>
                </div>

                {/* حذف */}
                <button
                  type="button"
                  onClick={() => setDeleteId(product.id)}
                  className="text-gray-400 transition hover:text-red-500"
                >
                  <FiTrash2 size={19} />
                </button>
              </div>
            );
          })}
        </div>

        {/* خلاصه سفارش */}
        <aside className="h-fit rounded-2xl border border-[#e5ddd5] bg-white p-6">
          <h2 className="text-lg font-extrabold text-[#292929]">خلاصه سفارش</h2>

          <div className="mt-6 flex items-center justify-between border-b border-[#eee] pb-5 text-sm">
            <span className="text-gray-500">مجموع کالاها</span>

            <span className="font-bold">
              {totalPrice.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-bold text-[#292929]">مبلغ نهایی</span>

            <span className="text-lg font-extrabold text-[#7c243d]">
              {totalPrice.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex h-12 items-center justify-center rounded-full bg-[#7c243d] text-sm font-bold text-white transition hover:bg-[#681f34]"
          >
            ادامه فرایند خرید
          </Link>
        </aside>
      </div>
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-right shadow-xl">
            <h2 className="text-lg font-extrabold text-[#292929]">حذف محصول</h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              آیا از حذف این محصول از سبد خرید مطمئن هستید؟
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-full border border-[#ddd] py-3 text-sm font-bold text-[#555] transition hover:bg-gray-50"
              >
                لغو
              </button>

              <button
                type="button"
                onClick={() => {
                  dispatch(removeFromCart(deleteId));
                  setDeleteId(null);
                }}
                className="flex-1 rounded-full bg-[#7c243d] py-3 text-sm font-bold text-white transition hover:bg-[#681f34]"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
