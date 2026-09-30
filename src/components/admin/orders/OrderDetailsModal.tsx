"use client";

import { updateOrderDeliveryStatus } from "@/api/orders";
import type { Order } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type OrderDetailsModalProps = {
  order: Order;
  onClose: () => void;
};

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  const formatDate = (date: number) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  // تغییر وضیعت سفارش
  const queryClient = useQueryClient();

const updateDeliveryMutation = useMutation({
  mutationFn: () => updateOrderDeliveryStatus(order.id, true),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });

    onClose();
  },
});

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* عنوان */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">جزئیات سفارش</h2>

            <p className="mt-1 text-sm text-slate-500">
              سفارش شماره {order.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* اطلاعات مشتری */}
        <div className="mb-6 rounded-xl border border-slate-200 p-4">
          <h3 className="mb-4 font-semibold text-slate-800">اطلاعات مشتری</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">نام</p>
              <p className="mt-1 text-sm text-slate-700">
                {order.username} {order.lastname}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">شماره تماس</p>
              <p className="mt-1 text-sm text-slate-700">{order.phone}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs text-slate-400">آدرس</p>
              <p className="mt-1 text-sm text-slate-700">{order.address}</p>
            </div>
          </div>
        </div>

        {/* محصولات */}
        <div className="mb-6">
          <h3 className="mb-4 font-semibold text-slate-800">محصولات سفارش</h3>

          <div className="space-y-3">
            {order.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
              >
                <div>
                  <p className="font-medium text-slate-700">{product.name}</p>

                  <p className="mt-1 text-xs text-slate-500">
                    تعداد: {product.count}
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  {Number(product.price).toLocaleString("fa-IR")} تومان
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* اطلاعات سفارش */}
        <div className="mb-6 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">تاریخ ثبت سفارش</span>

            <span className="text-sm text-slate-700">
              {formatDate(order.createdAt)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">تاریخ تحویل</span>

            <span className="text-sm text-slate-700">
              {formatDate(order.expectAt)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">مبلغ کل</span>

            <span className="font-bold text-slate-800">
              {order.prices.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        {/* وضعیت */}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <span className="font-medium text-slate-700">وضعیت سفارش</span>

          <span
            className={
              order.delivered
                ? "font-semibold text-emerald-600"
                : "font-semibold text-red-400"
            }
          >
            {order.delivered ? "تحویل شده" : "تحویل نشده"}
          </span>
        </div>

        {/* دکمه تغییر وضعیت */}
        {!order.delivered && (
          <button
            type="button"
            disabled={updateDeliveryMutation.isPending}
            onClick={() => updateDeliveryMutation.mutate()}
            className="w-full cursor-pointer rounded-xl bg-[#7c243d] px-4 py-3 font-semibold text-white transition hover:bg-[#681f34] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateDeliveryMutation.isPending
              ? "در حال ثبت..."
              : "تغییر وضعیت به تحویل شده"}
          </button>
        )}
      </div>
    </div>
  );
}
