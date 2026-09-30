"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { clearCart } from "@/redux/reducer/cartSlice";

import {
  getOrder,
  updateOrderPaymentStatus,
} from "@/api/orders";

import { decreaseProductQuantity } from "@/api/product";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const dispatch = useDispatch();

  // دریافت سفارش
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(Number(orderId)),
    enabled: !!orderId,
  });

  // پرداخت
  const paymentMutation = useMutation({
    mutationFn: async (status: "success" | "failed") => {
      if (!order) {
        throw new Error("سفارش پیدا نشد");
      }
    
      if (order.paymentStatus !== "pending") {
        return order;
      }
    
      const updatedOrder = await updateOrderPaymentStatus(
        Number(orderId),
        status
      );
    
      if (status === "success") {
        await Promise.all(
          order.products.map((item) =>
            decreaseProductQuantity(
              item.id,
              Number(item.count)
            )
          )
        );
      }
    
      return updatedOrder;
    },

    onSuccess: (_, status) => {
      // فقط بعد از پرداخت موفق سبد خالی شود
      if (status === "success") {
        dispatch(clearCart());
      }

      // رفتن به صفحه نتیجه
      window.location.href = `/result?orderId=${orderId}`;
    },
  });

  if (!orderId) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          شناسه سفارش پیدا نشد
        </p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          در حال دریافت اطلاعات سفارش...
        </p>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          سفارش پیدا نشد
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfaf8]">
      <section className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
        <div className="w-full rounded-[25px] border border-[#e5ddd5] bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h1 className="text-2xl font-extrabold text-[#292929]">
            درگاه پرداخت
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            سفارش شما با موفقیت ثبت شده است.
          </p>

          <div className="mt-8 rounded-2xl bg-[#fcfaf8] p-5">
            <p className="text-sm text-gray-500">
              مبلغ قابل پرداخت
            </p>

            <p className="mt-2 text-2xl font-extrabold text-[#7c243d]">
              {order.prices.toLocaleString("fa-IR")} تومان
            </p>

            <p className="mt-3 text-xs text-gray-400">
              شماره سفارش: {order.id}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              disabled={paymentMutation.isPending}
              onClick={() =>
                paymentMutation.mutate("success")
              }
              className="rounded-full bg-[#7c243d] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#681f34] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paymentMutation.isPending
                ? "در حال پردازش..."
                : "پرداخت"}
            </button>

            <button
              type="button"
              disabled={paymentMutation.isPending}
              onClick={() =>
                paymentMutation.mutate("failed")
              }
              className="rounded-full border border-[#ddd5ce] px-8 py-3 text-sm font-bold text-[#555] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              انصراف
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}