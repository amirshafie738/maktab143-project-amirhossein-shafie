import Link from "next/link";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          سفارش‌ها
        </h1>

        <div className="mt-6 flex gap-2 rounded-xl bg-white p-2 shadow-sm">
          <Link
            href="/admin/orders"
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            در حال انتظار
          </Link>

          <Link
            href="/admin/orders/delivered"
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            تکمیل شده
          </Link>
        </div>
      </div>

      {children}
    </section>
  );
}