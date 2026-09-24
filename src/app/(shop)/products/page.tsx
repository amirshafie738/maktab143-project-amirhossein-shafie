"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiFilter } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

import CategoryFilterModal from "@/components/shop/products/CategoryFilterModal";
import ProductList from "@/components/shop/products/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import CategorySidebar from "@/components/shop/products/CategorySidebar";
import { getFilteredProducts } from "@/api/shop/products";
type ProductFilters = {
  category: string;
  brand: string;
  search: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  minRating: string;
};
const FILTER_STORAGE_KEY = "shop-filters";

type SavedFilterState = {
  filters: ProductFilters;
  sort: string;
};
export default function ProductsPage() {

  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category") ?? "";

  const isFirstCategoryRender = useRef(true);

  // وضعیت فیلتر موبایل
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // شماره صفحه
  const [page, setPage] = useState(1);

  // تعداد محصول در هر صفحه
  const limit = 9;

  // sort
  const [sort, setSort] = useState("");

  // دسته‌بندی و برند انتخاب‌شده
const [filters, setFilters] = useState<ProductFilters>({
  category: categoryFromUrl,
  brand: "",
  search: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  inStock: false,
});
const [appliedFilters, setAppliedFilters] =
  useState<ProductFilters>({
    category: categoryFromUrl,
    brand: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    inStock: false,
  });

  // لوکال استوریج
  useEffect(() => {
    // اگر دسته‌بندی از URL آمده باشد،
    // localStorage نباید آن را overwrite کند.
    if (categoryFromUrl) {
      return;
    }
  
    const savedFilters =
      localStorage.getItem(FILTER_STORAGE_KEY);
  
    if (!savedFilters) return;
  
    try {
      const parsed: SavedFilterState =
        JSON.parse(savedFilters);
  
      setFilters(parsed.filters);
      setAppliedFilters(parsed.filters);
      setSort(parsed.sort || "newest");
    } catch (error) {
      console.error("خطا در خواندن فیلترها:", error);
  
      localStorage.removeItem(FILTER_STORAGE_KEY);
    }
  }, [categoryFromUrl]);
  
  useEffect(() => {
    // در اولین render، مقدار category
    // از useState گرفته شده و نیازی به تغییر دوباره نیست.
    if (isFirstCategoryRender.current) {
      isFirstCategoryRender.current = false;
      return;
    }
  
    // وقتی از Header یک دسته‌بندی جدید انتخاب شد
    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl,
    }));
  
    setAppliedFilters((prev) => ({
      ...prev,
      category: categoryFromUrl,
    }));
  
    setPage(1);
  }, [categoryFromUrl]);

  // تابع حذف فیلتر ها
  const handleClearFilters = () => {
    const emptyFilters: ProductFilters = {
      category: "",
      brand: "",
      search: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      inStock: false,
    };

    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setSort("newest");
    setPage(1);

    localStorage.removeItem(FILTER_STORAGE_KEY);
  };
  // دریافت محصولات
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shop-products", page, appliedFilters, sort],

    queryFn: () =>
      getFilteredProducts({
        page,
        limit,
        ...appliedFilters,
        sort,
      }),
  });
  const products = data?.data ?? [];

  // تعداد صفحات
  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <main className="min-h-screen bg-[#fcfaf8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* عنوان صفحه */}
        <div className="mb-14 flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#292929]">
              انتخاب‌های دقیق برای روتین شما
            </h1>

            <span className="mt-1 block text-base text-gray-500">
              میان محصولات مراقبت پوست، آرایش، مو و عطر جست‌وجو کنید و با
              فیلترهای کاربردی به انتخاب مناسب
            </span>
          </div>

          {/* فیلتر موبایل */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-[#decfc7] bg-white px-4 text-sm font-semibold text-[#292929] lg:hidden"
          >
            <FiFilter className="text-[#7c243d]" />
            فیلترها
          </button>
        </div>

        {/* محتوای صفحه */}
        <div className="flex items-start gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <CategorySidebar
              filters={filters}
              onCategoryChange={(category) =>
                setFilters((prev) => ({
                  ...prev,
                  category,
                }))
              }
              onBrandChange={(brand) =>
                setFilters((prev) => ({
                  ...prev,
                  brand,
                }))
              }
              onSearchChange={(search) =>
                setFilters((prev) => ({
                  ...prev,
                  search,
                }))
              }
              onMinPriceChange={(minPrice) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice,
                }))
              }
              onMaxPriceChange={(maxPrice) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice,
                }))
              }
              onInStockChange={(inStock) =>
                setFilters((prev) => ({
                  ...prev,
                  inStock,
                }))
              }
              onRatingChange={(minRating) =>
                setFilters((prev) => ({
                  ...prev,
                  minRating,
                }))
              }
              onApply={() => {
                setPage(1);
                setAppliedFilters(filters);

                localStorage.setItem(
                  FILTER_STORAGE_KEY,
                  JSON.stringify({
                    filters,
                    sort,
                  })
                );
              }}
              onClear={handleClearFilters}
            />
          </div>

          {/* محصولات */}
          <section className="min-w-0 flex-1">
            {/* تعداد و مرتب‌سازی */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {(data?.total ?? 0).toLocaleString("fa-IR")} محصول
              </span>

              <div className="flex items-center gap-2">
                <span className="hidden text-sm font-semibold sm:block">
                  مرتب‌سازی:
                </span>

                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                </select>
              </div>
            </div>

            {/* وضعیت دریافت */}
            {isLoading && (
              <div className="py-20 text-center text-gray-500">
                در حال دریافت محصولات...
              </div>
            )}

            {/* خطا */}
            {isError && (
              <div className="py-20 text-center text-red-500">
                دریافت محصولات با خطا مواجه شد.
              </div>
            )}

            {/* لیست محصولات */}
            {!isLoading && !isError && <ProductList products={products} />}

            {/* صفحه‌بندی */}
            {!isLoading && !isError && totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            )}
          </section>
        </div>
      </div>

      {/* فیلتر موبایل */}
      <CategoryFilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onCategoryChange={(value) =>
          setFilters((prev) => ({ ...prev, category: value }))
        }
        onBrandChange={(value) =>
          setFilters((prev) => ({ ...prev, brand: value }))
        }
        onSearchChange={(value) =>
          setFilters((prev) => ({ ...prev, search: value }))
        }
        onMinPriceChange={(value) =>
          setFilters((prev) => ({ ...prev, minPrice: value }))
        }
        onMaxPriceChange={(value) =>
          setFilters((prev) => ({ ...prev, maxPrice: value }))
        }
        onRatingChange={(value) =>
          setFilters((prev) => ({ ...prev, minRating: value }))
        }
        onInStockChange={(value) =>
          setFilters((prev) => ({ ...prev, inStock: value }))
        }
        onApply={() => {
          setPage(1);
          setAppliedFilters(filters);

          localStorage.setItem(
            FILTER_STORAGE_KEY,
            JSON.stringify({
              filters,
              sort,
            })
          );
        }}
        onClear={handleClearFilters}
      />
    </main>
  );
}
