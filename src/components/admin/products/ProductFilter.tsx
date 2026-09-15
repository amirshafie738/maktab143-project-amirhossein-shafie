"use client";

import { FiFilter } from "react-icons/fi";

type ProductFilterProps = {
  category: string;
  categories: {
    id: number;
    name: string;
  }[];
  onCategoryChange: (value: string) => void;
};

export default function ProductFilter({
  category,
  categories,
  onCategoryChange,
}: ProductFilterProps) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <FiFilter size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">
              فیلتر محصولات
            </h2>

            <p className="text-xs text-slate-400">
              محصولات را بر اساس دسته‌بندی نمایش بده
            </p>
          </div>
        </div>

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
          className="h-11 min-w-[220px] cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
        >
          <option value="">همه دسته‌بندی‌ها</option>

          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}