"use client";

import { useQuery } from "@tanstack/react-query";
import { FiFilter, FiSearch } from "react-icons/fi";

import { getCategories } from "@/api/categoty";
import { getBrands } from "@/api/brand";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategorySidebarProps = {
  filters: {
    category: string;
    brand: string;
    search: string;
    maxPrice: string;
    minPrice: string;
    inStock: boolean;
    minRating: string;
  };
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onSearchChange: (search: string) => void;
  onApply: () => void;
  onClear: () => void;
  onInStockChange: (value: boolean) => void;
  onRatingChange: (value: string) => void;
};

export default function CategorySidebar({
  filters,
  onCategoryChange,
  onBrandChange,
  onSearchChange,
  onApply,
  onClear,
  onMaxPriceChange,
  onMinPriceChange,
  onInStockChange,
  onRatingChange,
}: CategorySidebarProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return (
    <aside
      dir="rtl"
      className="w-full shrink-0 rounded-2xl border border-[#eadfd9] bg-white p-4 lg:w-60"
    >
      {/* عنوان فیلترها */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#292929]">فیلترها</h2>

        <FiFilter className="text-lg text-[#292929]" />
      </div>

      {/* جستجو */}
      <div className="mb-7">
        <label
          htmlFor="product-search"
          className="mb-3 block text-right text-sm font-bold text-[#292929]"
        >
          جستجو در محصولات
        </label>

        <div className="relative">
          <input
            id="product-search"
            type="text"
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="مثلاً سرم آبرسان"
            className="h-11 w-full rounded-xl border border-[#decfc7] bg-white px-3 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-[#7c243d]"
          />

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
        </div>
      </div>

      {/* دسته‌بندی */}
      <div className="mb-7 ">
        <label className="mb-3 block text-right text-sm font-bold text-[#292929]">
          دسته‌بندی
        </label>

        <Select
          value={filters.category}
          onValueChange={(selectedValue) => {
            if (selectedValue === null) return;

            onCategoryChange(selectedValue === "__all__" ? "" : selectedValue);
          }}
        >
          <SelectTrigger
            dir="rtl"
            className="h-14 w-full  flex-row-reverse justify-between rounded-2xl border-[#decfc7] bg-white px-4 py-5 text-sm text-[#333] shadow-none focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue placeholder="همه دسته‌بندی‌ها">
              {filters.category
                ? categories.find(
                    (item) => String(item.id) === filters.category
                  )?.name
                : "همه دسته‌بندی‌ها"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent dir="rtl">
            <SelectItem value="__all__">همه دسته‌بندی‌ها</SelectItem>

            {categories.map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* برند */}
      <div className="mb-7">
        <label className="mb-3 block text-right text-sm font-bold text-[#292929]">
          برند
        </label>

        <Select
          value={filters.brand}
          onValueChange={(selectedValue) => {
            if (selectedValue === null) return;

            onBrandChange(selectedValue === "__all__" ? "" : selectedValue);
          }}
        >
          <SelectTrigger
            dir="rtl"
            className="h-14 w-full flex-row-reverse justify-between rounded-2xl border-[#decfc7] py-5  bg-white px-4 text-sm text-[#333] shadow-none focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue placeholder="همه برندها" />
          </SelectTrigger>

          <SelectContent dir="rtl">
            <SelectItem value="__all__">همه برندها</SelectItem>

            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* بازه قیمت */}
      <div className="mb-7">
        <label className="mb-3 block text-right text-sm font-bold text-[#292929]">
          بازه قیمت (تومان)
        </label>

        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(event) => onMinPriceChange(event.target.value)}
            placeholder="از"
            aria-label="حداقل قیمت"
            className="h-11 w-1/2 rounded-xl border border-[#decfc7] px-3 text-sm outline-none focus:border-[#7c243d]"
          />

          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            placeholder="تا"
            aria-label="حداکثر قیمت"
            className="h-11 w-1/2 rounded-xl border border-[#decfc7] px-3 text-sm outline-none focus:border-[#7c243d]"
          />
        </div>
      </div>

      {/* حداقل امتیاز */}
      <div className="mb-7">
        <label className="mb-3 block text-right text-sm font-bold text-[#292929]">
          حداقل امتیاز
        </label>

        <Select
          value={filters.minRating}
          onValueChange={(selectedValue) => {
            if (selectedValue === null) return;

            onRatingChange(selectedValue === "__all__" ? "" : selectedValue);
          }}
        >
          <SelectTrigger
            dir="rtl"
            className="h-14 w-full flex-row-reverse justify-between rounded-2xl border-[#decfc7] py-5  bg-white px-4 text-sm text-[#333] shadow-none focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue placeholder="همه امتیازها" />
          </SelectTrigger>

          <SelectContent dir="rtl">
            <SelectItem value="__all__">همه امتیازها</SelectItem>

            <SelectItem value="4">۴ به بالا</SelectItem>
            <SelectItem value="3">۳ به بالا</SelectItem>
            <SelectItem value="2">۲ به بالا</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* فقط کالاهای موجود */}
      <div className="mb-7">
        <label
          htmlFor="in-stock"
          className="flex cursor-pointer items-center justify-between gap-3 text-sm text-[#333]"
        >
          <span>فقط کالاهای موجود</span>

          <input
            id="in-stock"
            type="checkbox"
            checked={filters.inStock}
            onChange={(event) => onInStockChange(event.target.checked)}
            className="h-5 w-5 shrink-0 cursor-pointer accent-[#7c243d]"
          />
        </label>
      </div>

      {/* اعمال فیلترها */}
      <button
        type="button"
        onClick={onApply}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#7c243d] text-sm font-bold text-white transition hover:bg-[#681f34]"
      >
        <FiFilter />
        اعمال فیلترها
      </button>

      {/* پاک کردن همه فیلترها */}
      <button
        type="button"
        onClick={onClear}
        className="mt-4 w-full text-center text-xs text-gray-500 transition hover:text-[#7c243d]"
      >
        پاک کردن همه فیلترها
      </button>
    </aside>
  );
}
