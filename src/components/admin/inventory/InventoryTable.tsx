import type { Product } from "@/types/product";

type InventoryTableProps = {
  products: Product[];
};

export default function InventoryTable({
  products,
}: InventoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-4 text-right font-semibold">
              #
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              محصول
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              قیمت
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              موجودی
            </th>

            <th className="px-4 py-4 text-right font-semibold">
              وضعیت
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="border-b border-slate-100 last:border-none"
            >
              <td className="px-4 py-4">
              {(index + 1).toLocaleString("fa-IR")}
              </td>

              <td className="px-4 py-4 font-medium text-slate-700">
                {product.name}
              </td>

              <td className="px-4 py-4">
                {product.price.toLocaleString("fa-IR")} تومان
              </td>

              <td className="px-4 py-4">
              {product.quantity?.toLocaleString("fa-IR") ?? "0"}
              </td>

              <td className="px-4 py-4">
                {product.quantity > 0 ? (
                  <span className="text-green-600">
                    موجود
                  </span>
                ) : (
                  <span className="text-red-500">
                    ناموجود
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}