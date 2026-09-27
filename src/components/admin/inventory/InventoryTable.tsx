"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

// نوع تغییرات موجودی
export type InventoryChange = {
  id: number;
  price: number;
  quantity: number;
};

// Props کامپوننت
type InventoryTableProps = {
  products: Product[];
  onChangesChange: (changes: InventoryChange[]) => void;

  // محصولاتی که با موفقیت ذخیره شده‌اند
  savedProductIds: number[];
};

export default function InventoryTable({
  products,
  onChangesChange,
  savedProductIds,
}: InventoryTableProps) {
  // مشخص می‌کند کدام فیلدها در حالت ویرایش هستند
  const [editing, setEditing] = useState<
    Record<
      number,
      {
        price?: boolean;
        quantity?: boolean;
      }
    >
  >({});

  // مقدار موقت قیمت و موجودی
  const [draftValues, setDraftValues] = useState<
    Record<
      number,
      {
        price: number;
        quantity: number;
      }
    >
  >({});

  // بعد از ذخیره موفق، Inputهای آن محصول بسته می‌شوند
  useEffect(() => {
    if (savedProductIds.length === 0) return;

    setEditing((prev) => {
      const updated = { ...prev };

      savedProductIds.forEach((id) => {
        delete updated[id];
      });

      return updated;
    });

    setDraftValues((prev) => {
      const updated = { ...prev };

      savedProductIds.forEach((id) => {
        delete updated[id];
      });

      return updated;
    });
  }, [savedProductIds]);

  // گرفتن مقدار فعلی
  const getValue = (
    product: Product,
    field: "price" | "quantity"
  ) => {
    return (
      draftValues[product.id]?.[field] ??
      product[field]
    );
  };

  // شروع ویرایش یک فیلد
  const startEditing = (
    product: Product,
    field: "price" | "quantity"
  ) => {
    // مقدار اولیه را در draft قرار می‌دهیم
    setDraftValues((prev) => ({
      ...prev,
      [product.id]: {
        price:
          prev[product.id]?.price ??
          product.price,

        quantity:
          prev[product.id]?.quantity ??
          product.quantity,
      },
    }));

    // فقط همان فیلد را وارد حالت ویرایش می‌کنیم
    setEditing((prev) => ({
      ...prev,
      [product.id]: {
        ...prev[product.id],
        [field]: true,
      },
    }));
  };

  // تغییر مقدار Input
  const handleChange = (
    product: Product,
    field: "price" | "quantity",
    value: number
  ) => {
    const currentPrice =
      draftValues[product.id]?.price ??
      product.price;

    const currentQuantity =
      draftValues[product.id]?.quantity ??
      product.quantity;

    const updated = {
      price:
        field === "price"
          ? value
          : currentPrice,

      quantity:
        field === "quantity"
          ? value
          : currentQuantity,
    };

    // ذخیره مقدار جدید در draft
    setDraftValues((prev) => ({
      ...prev,
      [product.id]: updated,
    }));

    // ساخت لیست محصولات تغییرکرده
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

        if (!originalProduct) {
          return false;
        }

        return (
          change.price !==
            originalProduct.price ||
          change.quantity !==
            originalProduct.quantity
        );
      });

    // ارسال تغییرات به InventoryPage
    onChangesChange(changes);
  };

  // لغو ویرایش با Escape
  const handleEscape = (
    product: Product,
    field: "price" | "quantity"
  ) => {
    const currentValues =
      draftValues[product.id];

    if (!currentValues) {
      setEditing((prev) => ({
        ...prev,
        [product.id]: {
          ...prev[product.id],
          [field]: false,
        },
      }));

      return;
    }

    // برگرداندن فقط همان فیلد به مقدار اصلی
    const updated = {
      ...currentValues,
      [field]: product[field],
    };

    // ذخیره مقدار اصلاح‌شده
    setDraftValues((prev) => ({
      ...prev,
      [product.id]: updated,
    }));

    // دوباره لیست تغییرات را محاسبه می‌کنیم
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

        if (!originalProduct) {
          return false;
        }

        return (
          change.price !==
            originalProduct.price ||
          change.quantity !==
            originalProduct.quantity
        );
      });

    onChangesChange(changes);

    // فقط همان Input بسته شود
    setEditing((prev) => ({
      ...prev,
      [product.id]: {
        ...prev[product.id],
        [field]: false,
      },
    }));
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[700px] text-sm">
        {/* عنوان ستون‌ها */}
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
            // مقدار فعلی
            const price = getValue(
              product,
              "price"
            );

            const quantity = getValue(
              product,
              "quantity"
            );

            // آیا قیمت در حال ویرایش است؟
            const isEditingPrice =
              editing[product.id]?.price === true;

            // آیا موجودی در حال ویرایش است؟
            const isEditingQuantity =
              editing[product.id]?.quantity ===
              true;

            return (
              <tr
                key={product.id}
                className="border-b border-slate-100 last:border-none"
              >
                {/* شماره */}
                <td className="px-4 py-4">
                  {(index + 1).toLocaleString(
                    "fa-IR"
                  )}
                </td>

                {/* نام محصول */}
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
                      className="w-32 rounded-lg border border-blue-500 px-3 py-2 outline-none"
                      onChange={(event) =>
                        handleChange(
                          product,
                          "price",
                          Number(
                            event.target.value
                          )
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Escape"
                        ) {
                          handleEscape(
                            product,
                            "price"
                          );
                        }

                        // Enter هیچ کاری نمی‌کند
                        if (
                          event.key === "Enter"
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(
                          product,
                          "price"
                        )
                      }
                      className="cursor-pointer text-blue-600 underline"
                    >
                      {price.toLocaleString(
                        "fa-IR"
                      )}{" "}
                      تومان
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
                      className="w-28 rounded-lg border border-blue-500 px-3 py-2 outline-none"
                      onChange={(event) =>
                        handleChange(
                          product,
                          "quantity",
                          Number(
                            event.target.value
                          )
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Escape"
                        ) {
                          handleEscape(
                            product,
                            "quantity"
                          );
                        }

                        // Enter هیچ کاری نمی‌کند
                        if (
                          event.key === "Enter"
                        ) {
                          event.preventDefault();
                        }
                      }}
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
                      {quantity.toLocaleString(
                        "fa-IR"
                      )}
                    </button>
                  )}
                </td>

                {/* وضعیت موجودی */}
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