"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

import type { RootState } from "@/redux/store";
import { createOrder } from "@/api/orders";

import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/schemas/checkoutSchema";

export default function Checkout() {
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [submitError, setSubmitError] = useState("");

  // تاریخ امروز
  const today = new DateObject({
    calendar: persian,
  });

  // حداقل سه روز بعد
  const minDeliveryDate = new DateObject(today).add(3, "days");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      deliveryDate: "",
      description: "",
    },
  });

  const deliveryDate = watch("deliveryDate");

  // مبلغ نهایی
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // ایجاد سفارش
  const createOrderMutation = useMutation({
    mutationFn: createOrder,

    onSuccess: (order) => {
      router.push(`/payment?orderId=${order.id}`);
    },

    onError: (error) => {
      console.error("Create order error:", error);

      setSubmitError("ثبت سفارش با خطا مواجه شد. دوباره تلاش کنید.");
    },
  });

  // ارسال فرم
  // ارسال فرم
  const handleSubmitForm = async (data: CheckoutFormValues) => {
    setSubmitError("");

    const englishDate = data.deliveryDate.replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    );

    const deliveryDateObject = new DateObject({
      date: englishDate,
      calendar: persian,
      format: "YYYY/MM/DD",
    });
    await createOrderMutation.mutateAsync({
      username: data.firstName,
      lastname: data.lastName,
      phone: data.phone,
      address: data.address,

      expectAt: deliveryDateObject.toDate().getTime(),

      products: cartItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        count: String(item.quantity),
        price: String(item.product.price),
        image: item.product.thumbnail,
      })),

      prices: totalPrice,

      delivered: false,

      paymentStatus: "pending",
    });
  };

  return (
    <main className="min-h-screen bg-[#fcfaf8]">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* فرم */}
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="rounded-[25px] border border-[#e5ddd5] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-8"
          >
            <h1 className="text-2xl font-extrabold text-[#292929]">
              اطلاعات ارسال
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              اطلاعات گیرنده را برای ارسال سفارش وارد کنید.
            </p>

            {/* نام و نام خانوادگی */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {/* نام */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#333]">
                  نام
                </label>

                <input
                  type="text"
                  {...register("firstName")}
                  className="h-12 w-full rounded-xl border border-[#ddd5ce] bg-white px-4 text-right text-sm outline-none transition focus:border-[#7c243d]"
                />

                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* نام خانوادگی */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#333]">
                  نام خانوادگی
                </label>

                <input
                  type="text"
                  {...register("lastName")}
                  className="h-12 w-full rounded-xl border border-[#ddd5ce] bg-white px-4 text-right text-sm outline-none transition focus:border-[#7c243d]"
                />

                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* تلفن و آدرس */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {/* تلفن */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#333]">
                  تلفن همراه
                </label>

                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="09123456789"
                  className="h-12 w-full rounded-xl border border-[#ddd5ce] bg-white px-4 text-right text-sm outline-none transition focus:border-[#7c243d]"
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* آدرس */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#333]">
                  آدرس
                </label>

                <input
                  type="text"
                  {...register("address")}
                  className="h-12 w-full rounded-xl border border-[#ddd5ce] bg-white px-4 text-right text-sm outline-none transition focus:border-[#7c243d]"
                />

                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* تاریخ تحویل */}
            <div className="mt-5 sm:w-1/2">
              <label className="mb-2 block text-sm font-bold text-[#333]">
                تاریخ تحویل
              </label>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                minDate={minDeliveryDate}
                format="YYYY/MM/DD"
                value={deliveryDate}
                onChange={(date) => {
                  setValue("deliveryDate", date?.format("YYYY/MM/DD") ?? "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                inputClass="h-12 w-full rounded-xl border border-[#ddd5ce] bg-white px-4 text-right text-sm outline-none transition focus:border-[#7c243d]"
                placeholder="تاریخ تحویل را انتخاب کنید"
              />

              {errors.deliveryDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.deliveryDate.message}
                </p>
              )}
            </div>

            {/* توضیحات */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-[#333]">
                توضیحات سفارش{" "}
                <span className="font-normal text-gray-400">(اختیاری)</span>
              </label>

              <textarea
                {...register("description")}
                rows={4}
                placeholder="اگر توضیحی درباره سفارش دارید..."
                className="w-full resize-none rounded-xl border border-[#ddd5ce] bg-white px-4 py-3 text-right text-sm outline-none transition focus:border-[#7c243d]"
              />
            </div>

            {/* دکمه پرداخت */}
            <div className="mt-8 border-t border-[#eee7e1] pt-6">
              {submitError && (
                <p className="mb-4 text-sm text-red-500">{submitError}</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="rounded-full bg-[#7c243d] px-10 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#681f34] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {createOrderMutation.isPending
                    ? "در حال ثبت سفارش..."
                    : "پرداخت"}
                </button>
              </div>
            </div>
          </form>

          {/* خلاصه سفارش */}
          <aside className="h-fit rounded-[25px] border border-[#e5ddd5] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h2 className="text-lg font-extrabold text-[#292929]">
              خلاصه پرداخت
            </h2>

            <div className="mt-6 space-y-5 text-sm">
              {/* جمع کالاها */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">جمع کالاها</span>

                <span className="font-bold text-[#333]">
                  {totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              {/* تخفیف */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">تخفیف</span>

                <span className="font-bold text-[#333]">—</span>
              </div>

              {/* ارسال */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">ارسال</span>

                <span className="font-bold text-[#333]">رایگان</span>
              </div>
            </div>

            {/* مبلغ نهایی */}
            <div className="mt-6 border-t border-[#eee7e1] pt-5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#333]">مبلغ نهایی</span>

                <span className="text-lg font-extrabold text-[#7c243d]">
                  {totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-gray-400">
              مبلغ نهایی بر اساس قیمت و موجودی فعلی محصولات محاسبه می‌شود.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
