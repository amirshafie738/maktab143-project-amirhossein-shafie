import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import type { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-4xl text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-4 text-right font-semibold">#</th>

            <th className="px-4 py-4 text-right font-semibold">محصول</th>

            <th className="px-4 py-4 text-right font-semibold">برند</th>

            <th className="px-4 py-4 text-right font-semibold">قیمت</th>

            <th className="px-4 py-4 text-right font-semibold">موجودی</th>

            <th className="px-4 py-4 text-right font-semibold">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="border-b border-slate-100 last:border-none"
            >
              {/* شماره */}
              <td className="px-4 py-4">{index + 1}</td>

              {/* محصول */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={`http://localhost:3001${product.thumbnail}`}

                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-slate-700">
                    {product.name}
                  </span>
                </div>
              </td>

              {/* برند */}
              <td className="px-4 py-4 text-slate-600">{product.brand}</td>

              {/* قیمت */}
              <td className="px-4 py-4 font-medium">
                {product.price.toLocaleString("fa-IR")} تومان
              </td>

              {/* موجودی */}
              <td className="px-4 py-4">
                <span
                  className={
                    product.quantity > 0 ? "text-green-600" : "text-red-500"
                  }
                >
                  {product.quantity}
                </span>
              </td>

              {/* عملیات */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="مشاهده"
                    className="cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <FiEye size={18} />
                  </button>

                  <button
                    type="button"
                    title="ویرایش"
                    className="cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    type="button"
                    title="حذف"
                    className="cursor-pointer rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
