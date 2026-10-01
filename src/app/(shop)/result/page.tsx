"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

import { deleteOrder, getOrder, updateOrderPaymentStatus } from "@/api/orders";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order-result", orderId],
    queryFn: () => getOrder(Number(orderId)),
    enabled: !!orderId,
  });

  if (!orderId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcfaf8]">
        <p className="text-red-500">شناسه سفارش پیدا نشد</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcfaf8]">
        <p className="text-gray-500">در حال بررسی نتیجه سفارش...</p>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcfaf8]">
        <p className="text-red-500">سفارش پیدا نشد</p>
      </main>
    );
  }

  const isSuccess = order.paymentStatus === "success";

  return (
    <main className="min-h-screen bg-[#fcfaf8]">
      <section className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
        <div className="w-full rounded-[25px] border border-[#e5ddd5] bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          {isSuccess ? (
            <FiCheckCircle className="mx-auto text-green-500" size={64} />
          ) : (
            <FiXCircle className="mx-auto text-red-500" size={64} />
          )}

          <h1 className="mt-5 text-2xl font-extrabold text-[#292929]">
            {isSuccess ? "پرداخت با موفقیت انجام شد" : "پرداخت ناموفق بود"}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {isSuccess
              ? "سفارش شما با موفقیت ثبت و پرداخت شد."
              : "پرداخت سفارش انجام نشد. می‌توانید دوباره تلاش کنید."}
          </p>

          <div className="mt-8 rounded-2xl bg-[#fcfaf8] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">شماره سفارش</span>

              <span className="font-bold text-[#333]">{order.id}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">مبلغ سفارش</span>

              <span className="font-bold text-[#7c243d]">
                {order.prices.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={async () => {
                if (!isSuccess) {
                  await deleteOrder(order.id);
                }

                window.location.href = "/";
              }}
              className="rounded-full bg-[#7c243d] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#681f34]"
            >
              بازگشت به فروشگاه
            </button>
            {!isSuccess && (
              <button
                type="button"
                onClick={async () => {
                  await updateOrderPaymentStatus(order.id, "pending");

                  window.location.href = `/payment?orderId=${order.id}`;
                }}
                className="rounded-full border border-[#ddd5ce] px-8 py-3 text-sm font-bold text-[#555] transition hover:bg-gray-50"
              >
                تلاش دوباره
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
