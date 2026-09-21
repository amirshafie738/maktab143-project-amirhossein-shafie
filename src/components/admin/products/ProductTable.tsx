import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

import type { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];

  onEdit: (product: Product) => void;

  onDelete: (id: number) => void;
};

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-4xl text-sm">
        <thead>
          <tr className="border-b bg-slate-50 text-right text-slate-600">
            <th className="px-4 py-3">#</th>

            <th className="px-4 py-3">محصول</th>

            <th className="px-4 py-3">برند</th>

            <th className="px-4 py-3">قیمت</th>

            <th className="px-4 py-3">موجودی</th>

            <th className="px-4 py-3">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="border-b last:border-b-0 hover:bg-slate-50"
            >
              <td className="px-4 py-3">{index + 1}</td>
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
              <td className="px-4 py-3 font-medium">{product.name}</td>

              <td className="px-4 py-3">{product.brand}</td>

              <td className="px-4 py-3">
                {product.price.toLocaleString("fa-IR")}
              </td>

              <td className="px-4 py-3">
                {product.quantity.toLocaleString("fa-IR")}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="مشاهده"
                    className="cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <FiEye />
                  </button>

                  <button
                    type="button"
                    title="ویرایش"
                    onClick={() => onEdit(product)}
                    className="cursor-pointer rounded-lg p-2 text-blue-500 hover:bg-blue-50"
                  >
                    <FiEdit />
                  </button>

                  <button
                    type="button"
                    title="حذف"
                    onClick={() => onDelete(product.id)}
                    className="cursor-pointer rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                محصولی پیدا نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
