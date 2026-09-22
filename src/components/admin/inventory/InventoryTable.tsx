"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

type InventoryChange = {
  id: number;
  price: number;
  quantity: number;
};

type InventoryTableProps = {
  products: Product[];
  onChangesChange: (changes: InventoryChange[]) => void;
};

export default function InventoryTable({
  products,
  onChangesChange,
}: InventoryTableProps) {
  
  const [editing, setEditing] = useState<{
    id: number;
    field: "price" | "quantity";
  } | null>(null);

  const [draftValues, setDraftValues] = useState<
    Record<number, { price: number; quantity: number }>
  >({});

  const getValue = (
    product: Product,
    field: "price" | "quantity"
  ) => {
    return draftValues[product.id]?.[field] ?? product[field];
  };

  const startEditing = (
    product: Product,
    field: "price" | "quantity"
  ) => {
    setDraftValues((prev) => ({
      ...prev,
      [product.id]: {
        price: prev[product.id]?.price ?? product.price,
        quantity:
          prev[product.id]?.quantity ?? product.quantity,
      },
    }));

    setEditing({
      id: product.id,
      field,
    });
  };

  const handleChange = (
    product: Product,
    field: "price" | "quantity",
    value: number
  ) => {
    const currentPrice =
      draftValues[product.id]?.price ?? product.price;
  
    const currentQuantity =
      draftValues[product.id]?.quantity ?? product.quantity;
  
    const updated = {
      price: field === "price" ? value : currentPrice,
      quantity:
        field === "quantity"
          ? value
          : currentQuantity,
    };
  
    setDraftValues((prev) => ({
      ...prev,
      [product.id]: updated,
    }));
  
    const changes = Object.entries({
      ...draftValues,
      [product.id]: updated,
    })
      .map(([id, values]) => ({
        id: Number(id),
        price: values.price,
        quantity: values.quantity,
      }))
      .filter((change) => {
        const originalProduct = products.find(
          (product) => product.id === change.id
        );
  
        if (!originalProduct) return false;
  
        return (
          change.price !== originalProduct.price ||
          change.quantity !== originalProduct.quantity
        );
      });
  
    onChangesChange(changes);
  };
  const handleEscape = (
    product: Product,
    field: "price" | "quantity"
  ) => {
    const currentValues = draftValues[product.id];
  
    if (!currentValues) {
      setEditing(null);
      return;
    }
  
    const updated = {
      ...currentValues,
      [field]: product[field],
    };
  
    setDraftValues((prev) => ({
      ...prev,
      [product.id]: updated,
    }));
  
    const changes = Object.entries({
      ...draftValues,
      [product.id]: updated,
    })
      .map(([id, values]) => ({
        id: Number(id),
        price: values.price,
        quantity: values.quantity,
      }))
      .filter((change) => {
        const originalProduct = products.find(
          (product) => product.id === change.id
        );
  
        if (!originalProduct) return false;
  
        return (
          change.price !== originalProduct.price ||
          change.quantity !== originalProduct.quantity
        );
      });
  
    onChangesChange(changes);
  
    setEditing(null);
  };

  const finishEditing = () => {
    setEditing(null);
  };

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
          {products.map((product, index) => {
            const price = getValue(product, "price");
            const quantity = getValue(
              product,
              "quantity"
            );

            const isEditingPrice =
              editing?.id === product.id &&
              editing.field === "price";

            const isEditingQuantity =
              editing?.id === product.id &&
              editing.field === "quantity";

            return (
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

                {/* قیمت */}
                <td className="px-4 py-4">
                  {isEditingPrice ? (
                    <input
                      autoFocus
                      type="number"
                      value={price}
                      onChange={(event) =>
                        handleChange(
                          product,
                          "price",
                          Number(event.target.value)
                        )
                      }
                      onBlur={finishEditing}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          handleEscape(product, "price");
                        }
                      
                        if (event.key === "Enter") {
                          finishEditing();
                        }
                      }}
                      className="w-32 rounded-lg border border-slate-400 px-2 py-1 outline-none focus:border-slate-700"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(product, "price")
                      }
                      className="cursor-pointer text-blue-600 underline"
                    >
                      {price.toLocaleString("fa-IR")} تومان
                    </button>
                  )}
                </td>

                {/* موجودی */}
                <td className="px-4 py-4">
                  {isEditingQuantity ? (
                    <input
                      autoFocus
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(event) =>
                        handleChange(
                          product,
                          "quantity",
                          Number(event.target.value)
                        )
                      }
                      onBlur={finishEditing}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          handleEscape(product, "quantity");
                        }
                      
                        if (event.key === "Enter") {
                          finishEditing();
                        }
                      }}
                      className="w-24 rounded-lg border border-slate-400 px-2 py-1 outline-none focus:border-slate-700"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(
                          product,
                          "quantity"
                        )
                      }
                      className="cursor-pointer text-blue-600 underline"
                    >
                      {quantity.toLocaleString("fa-IR")}
                    </button>
                  )}
                </td>

                {/* وضعیت */}
                <td className="px-4 py-4">
                  {quantity > 0 ? (
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}