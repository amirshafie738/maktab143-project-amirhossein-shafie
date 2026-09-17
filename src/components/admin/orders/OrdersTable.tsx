import type { Order } from "@/types/order";

type OrdersTableProps = {
  orders: Order[];
};

export default function OrdersTable({
  orders,
}: OrdersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[1000px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-4 text-right font-semibold">
              #
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              مشتری
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              شماره تماس
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              مبلغ کل
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              تعداد محصولات
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              وضعیت
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="border-b border-slate-100 last:border-none"
            >
              <td className="px-4 py-4">
                {index + 1}
              </td>

              <td className="px-4 py-4 font-medium text-slate-700">
                {order.username} {order.lastname}
              </td>

              <td className="px-4 py-4 text-slate-600">
                {order.phone}
              </td>

              <td className="px-4 py-4">
                {order.prices.toLocaleString("fa-IR")} تومان
              </td>

              <td className="px-4 py-4">
                {order.products.length}
              </td>

              <td className="px-4 py-4">
                {order.delivered === "true" ? (
                  <span className="text-green-600">
                    تحویل داده شده
                  </span>
                ) : (
                  <span className="text-orange-500">
                    در انتظار تحویل
                  </span>
                )}
              </td>

              <td className="px-4 py-4">
                <button
                  type="button"
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