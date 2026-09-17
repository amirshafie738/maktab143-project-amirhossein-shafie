"use client";

import { FiChevronDown, FiFilter, FiSearch } from "react-icons/fi";

export default function CategorySidebar() {
  return (
    <aside className="w-full shrink-0 rounded-2xl border border-[#eadfd9] bg-white p-4 lg:w-60">
      {/* عنوان فیلتر */}
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
            placeholder="مثلاً سرم آبرسان"
            className="h-11 w-full rounded-xl border border-[#decfc7] bg-white px-3 pr-10 text-sm outline-none placeholder:text-gray-400 focus:border-[#7c243d]"
          />

          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* دسته بندی */}
      <FilterSelect
        title="دسته‌بندی"
        value="مراقبت پوست"
        options={["مراقبت پوست", "آرایش", "مراقبت مو", "عطر"]}
      />

      {/* برند */}
      <FilterSelect
        title="برند"
        value="همه برندها"
        options={["همه برندها", "لورآل", "نوتروژینا", "اوردینری"]}
      />

      {/* نوع محصول */}
      <FilterSelect
        title="نوع محصول"
        value="همه انواع"
        options={["همه انواع", "کرم", "سرم", "شوینده", "ماسک"]}
      />
      {/* بازه قیمت */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-[#292929]">
          بازه قیمت (تومان)
        </label>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="از"
            className="h-11 w-1/2 rounded-xl border border-[#decfc7] px-3 text-sm outline-none focus:border-[#7c243d]"
          />

          <input
            type="number"
            placeholder="تا"
            className="h-11 w-1/2 rounded-xl border border-[#decfc7] px-3 text-sm outline-none focus:border-[#7c243d]"
          />
        </div>
      </div>

      {/* حداقل امتیاز */}
      <FilterSelect
        title="حداقل امتیاز"
        value="همه امتیازها"
        options={["همه امتیازها", "۴ به بالا", "۳ به بالا", "۲ به بالا"]}
      />

      {/* چک باکس ها */}
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

      {/* اعمال فیلتر */}
      <button
        type="button"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#7c243d] text-sm font-bold text-white transition hover:bg-[#681f34]"
      >
        <FiFilter />
        اعمال فیلترها
      </button>

      {/* پاک کردن فیلترها */}
      <button
        type="button"
        className="mt-4 w-full text-center text-xs text-gray-500 transition hover:text-[#7c243d]"
      >
        پاک کردن همه فیلترها
      </button>
    </aside>
  );
}

type FilterSelectProps = {
  title: string;
  value: string;
  options: string[];
};

function FilterSelect({ title, value, options }: FilterSelectProps) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-[#292929]">
        {title}
      </label>

      <div className="relative">
        <select
          defaultValue={value}
          className="h-11 w-full appearance-none rounded-xl border border-[#decfc7] bg-white px-3 pl-9 text-sm text-[#333] outline-none focus:border-[#7c243d]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-600" />
      </div>
    </div>
  );
}
