import type { Order } from "@/types/order";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

type OrdersTableProps = {
  orders: Order[];
  sortOrder: "asc" | "desc";
  onSort: () => void;
  onView: (order: Order) => void;
};

export default function OrdersTable({
  orders,
  sortOrder,
  onSort,
  onView,
}: OrdersTableProps) {
  const formatDate = (date: number) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-250 text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-4 text-right font-semibold">#</th>

            <th className="px-4 py-4 text-right font-semibold">مشتری</th>

            <th className="px-4 py-4 text-right font-semibold">شماره تماس</th>

            <th className="px-4 py-4 text-right font-semibold">مبلغ کل</th>
            {/* مرتب‌سازی تاریخ */}

            <th className="px-4 py-4 text-right font-semibold">
              <button
                type="button"
                onClick={onSort}
                className="inline-flex cursor-pointer items-center gap-1"
              >
                <span>تاریخ ثبت سفارش</span>

                {sortOrder === "desc" ? (
                  <FiArrowDown size={16} />
                ) : (
                  <FiArrowUp size={16} />
                )}
              </button>
            </th>

            <th className="px-4 py-4 text-right font-semibold">وضعیت</th>

            <th className="px-4 py-4 text-right font-semibold">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="border-b border-slate-100 last:border-none"
            >
              <td className="px-4 py-4">
                {(index + 1).toLocaleString("fa-IR")}
              </td>

              <td className="px-4 py-4 font-medium text-slate-700">
                {order.username} {order.lastname}
              </td>

              <td className="px-4 py-4 text-slate-600">{order.phone}</td>

              <td className="px-4 py-4">
                {order.prices.toLocaleString("fa-IR")} تومان
              </td>

              <td className="px-4 py-4 text-slate-600">
                {formatDate(order.createdAt)}
              </td>

              <td className="px-4 py-4">
                <span
                  className={
                    order.delivered ? "text-emerald-600" : "text-red-400"
                  }
                >
                  {order.delivered ? "تحویل شده" : "تحویل نشده"}
                </span>
              </td>

              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => onView(order)}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
                >
                  مشاهده
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
