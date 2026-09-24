"use client";

import { useQuery } from "@tanstack/react-query";
import { FiChevronDown, FiFilter, FiSearch } from "react-icons/fi";

import { getCategories } from "@/api/categoty";
import { getBrands } from "@/api/brand";

type CategorySidebarProps = {
  filters: {
    category: string;
    brand: string;
    search: string;
    maxPrice:string;
    minPrice:string;
  };
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onSearchChange: (search: string) => void;
  onApply: () => void;
};

export default function CategorySidebar({
  filters,
  onCategoryChange,
  onBrandChange,
  onSearchChange,
  onApply,
  onMaxPriceChange,
  onMinPriceChange,
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
    <aside className="w-full shrink-0 rounded-2xl border border-[#eadfd9] bg-white p-4 lg:w-60">
      {/* عنوان */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#292929]">فیلترها</h2>

        <FiFilter className="text-lg text-[#292929]" />
      </div>

      {/* جستجو */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-[#292929]">
          جستجو در محصولات
        </label>

        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="مثلاً سرم آبرسان"
            className="h-11 w-full rounded-xl border border-[#decfc7] bg-white px-3 pr-10 text-sm outline-none placeholder:text-gray-400 focus:border-[#7c243d]"
          />

          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* دسته‌بندی */}
      <FilterSelect
        title="دسته‌بندی"
        value={filters.category}
        options={[
          {
            id: "",
            name: "همه دسته‌بندی‌ها",
          },
          ...categories.map((item) => ({
            id: String(item.id),
            name: item.name,
          })),
        ]}
        onChange={onCategoryChange}
      />

      {/* برند */}
      <FilterSelect
        title="برند"
        value={filters.brand}
        options={[
          {
            id: "",
            name: "همه برندها",
          },
          ...brands.map((brand) => ({
            id: brand,
            name: brand,
          })),
        ]}
        onChange={onBrandChange}
      />

      {/* قیمت */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-[#292929]">
          بازه قیمت (تومان)
        </label>

        <div className="flex gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(event) => onMinPriceChange(event.target.value)}
            placeholder="از"
            className="h-11 w-1/2 rounded-xl border border-[#decfc7] px-3 text-sm outline-none focus:border-[#7c243d]"
          />

          <input
            type="number"
            value={filters.maxPrice}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            placeholder="تا"
            className="h-11 w-1/2 rounded-xl border border-[#decfc7] px-3 text-sm outline-none focus:border-[#7c243d]"
          />
        </div>
      </div>

      {/* امتیاز */}
      <FilterSelect
        title="حداقل امتیاز"
        value="همه امتیازها"
        options={["همه امتیازها", "۴ به بالا", "۳ به بالا", "۲ به بالا"]}
      />

      {/* چک‌باکس */}
      <div className="mb-5 space-y-4">
        <label className="flex cursor-pointer items-center justify-between text-sm text-[#333]">
          <span>فقط کالاهای موجود</span>

          <input type="checkbox" className="h-4 w-4 accent-[#7c243d]" />
        </label>

        <label className="flex cursor-pointer items-center justify-between text-sm text-[#333]">
          <span>فقط محصولات تخفیف‌دار</span>

          <input type="checkbox" className="h-4 w-4 accent-[#7c243d]" />
        </label>
      </div>

      {/* اعمال */}
      <button
        type="button"
        onClick={onApply}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#7c243d] text-sm font-bold text-white transition hover:bg-[#681f34]"
      >
        <FiFilter />
        اعمال فیلترها
      </button>

      {/* پاک کردن */}
      <button
        type="button"
        className="mt-4 w-full text-center text-xs text-gray-500 transition hover:text-[#7c243d]"
      >
        پاک کردن همه فیلترها
      </button>
    </aside>
  );
}

type FilterOption =
  | string
  | {
      id: string;
      name: string;
    };

type FilterSelectProps = {
  title: string;
  value: string;
  options: FilterOption[];
  onChange?: (value: string) => void;
};

function FilterSelect({ title, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-[#292929]">
        {title}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-[#decfc7] bg-white px-3 pl-9 text-sm text-[#333] outline-none focus:border-[#7c243d]"
        >
          {options.map((option) => {
            const optionValue = typeof option === "string" ? option : option.id;

            const optionLabel =
              typeof option === "string" ? option : option.name;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-600" />
      </div>
    </div>
  );
}
