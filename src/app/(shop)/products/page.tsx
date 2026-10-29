
"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiFilter } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

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

const EMPTY_FILTERS: ProductFilters = {
  category: "",
  brand: "",
  search: "",
  minPrice: "",
  maxPrice: "",
  inStock: false,
  minRating: "",
};

const DEFAULT_SORT = "newest";
const PRODUCTS_PER_PAGE = 9;

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // خواندن تمام فیلترهای اعمال‌شده از URL
  const categoryFromUrl = searchParams.get("category") ?? "";
  const brandFromUrl = searchParams.get("brand") ?? "";
  const searchFromUrl = searchParams.get("search") ?? "";
  const minPriceFromUrl = searchParams.get("minPrice") ?? "";
  const maxPriceFromUrl = searchParams.get("maxPrice") ?? "";
  const minRatingFromUrl = searchParams.get("minRating") ?? "";
  const inStockFromUrl = searchParams.get("inStock") === "true";

  // شماره صفحه از URL
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  // مرتب‌سازی از URL
  const allowedSorts = [
    "newest",
    "oldest",
    "price-asc",
    "price-desc",
  ];

  const requestedSort = searchParams.get("sort");

  const sort =
    requestedSort && allowedSorts.includes(requestedSort)
      ? requestedSort
      : DEFAULT_SORT;

  // وضعیت باز بودن فیلتر موبایل
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // مقادیر موقتی فرم فیلترها
  const [filters, setFilters] = useState<ProductFilters>({
    ...EMPTY_FILTERS,
    category: categoryFromUrl,
    brand: brandFromUrl,
    search: searchFromUrl,
    minPrice: minPriceFromUrl,
    maxPrice: maxPriceFromUrl,
    minRating: minRatingFromUrl,
    inStock: inStockFromUrl,
  });

  // هماهنگ کردن فرم با URL
  // این بخش هنگام باز کردن لینک یا استفاده از Back و Forward اجرا می‌شود.
  useEffect(() => {
    setFilters({
      category: categoryFromUrl,
      brand: brandFromUrl,
      search: searchFromUrl,
      minPrice: minPriceFromUrl,
      maxPrice: maxPriceFromUrl,
      minRating: minRatingFromUrl,
      inStock: inStockFromUrl,
    });
  }, [
    categoryFromUrl,
    brandFromUrl,
    searchFromUrl,
    minPriceFromUrl,
    maxPriceFromUrl,
    minRatingFromUrl,
    inStockFromUrl,
  ]);

  // ساخت URL از روی فیلترها
  const buildProductsUrl = (params: URLSearchParams) => {
    const query = params.toString();

    return query ? `/products?${query}` : "/products";
  };

  // اعمال تمام فیلترها
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    const filterParams: Record<string, string> = {
      category: filters.category,
      brand: filters.brand,
      search: filters.search.trim(),
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
    };

    Object.entries(filterParams).forEach(([key, value]) => {
      if (value.trim() === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // فقط در صورت فعال بودن فیلتر موجودی، پارامتر را نگه می‌داریم.
    if (filters.inStock) {
      params.set("inStock", "true");
    } else {
      params.delete("inStock");
    }

    // بعد از تغییر فیلتر، صفحه اول نمایش داده شود.
    params.delete("page");

    router.push(buildProductsUrl(params));
    setIsFilterOpen(false);
  };

  // پاک کردن فیلترها، مرتب‌سازی و صفحه‌بندی
  const handleClearFilters = () => {
    setFilters({ ...EMPTY_FILTERS });
    setIsFilterOpen(false);

    router.push("/products");
  };

  // تغییر صفحه بدون از دست دادن فیلترهای دیگر
  const setPage: Dispatch<SetStateAction<number>> = (value) => {
    const nextPage =
      typeof value === "function" ? value(page) : value;

    const params = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    router.push(buildProductsUrl(params));
  };

  // تغییر مرتب‌سازی بدون از دست دادن فیلترها
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === DEFAULT_SORT) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    // پس از تغییر مرتب‌سازی به صفحه اول برمی‌گردیم.
    params.delete("page");

    router.push(buildProductsUrl(params));
  };

  // فیلترهای نهایی همیشه از URL خوانده می‌شوند.
  const appliedFilters: ProductFilters = {
    category: categoryFromUrl,
    brand: brandFromUrl,
    search: searchFromUrl,
    minPrice: minPriceFromUrl,
    maxPrice: maxPriceFromUrl,
    minRating: minRatingFromUrl,
    inStock: inStockFromUrl,
  };

  // دریافت محصولات با استفاده از پارامترهای URL
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "shop-products",
      page,
      PRODUCTS_PER_PAGE,
      appliedFilters,
      sort,
    ],
    queryFn: () =>
      getFilteredProducts({
        page,
        limit: PRODUCTS_PER_PAGE,
        ...appliedFilters,
        sort,
      }),
  });

  const products = data?.data ?? [];
  const totalProducts = data?.total ?? 0;

  const totalPages = Math.ceil(
    totalProducts / PRODUCTS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-[#fcfaf8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* عنوان صفحه */}
        <div className="mb-14 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#292929]">
              انتخاب‌های دقیق برای روتین شما
            </h1>

            <span className="mt-1 block text-base text-gray-500">
              میان محصولات مراقبت پوست، آرایش، مو و عطر جست‌وجو کنید
              و با فیلترهای کاربردی به انتخاب مناسب برسید.
            </span>
          </div>

          {/* دکمه فیلتر موبایل */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[#decfc7] bg-white px-4 text-sm font-semibold text-[#292929] lg:hidden"
          >
            <FiFilter className="text-[#7c243d]" />
            فیلترها
          </button>
        </div>

        {/* محتوای صفحه */}
        <div className="flex items-start gap-6">
          {/* سایدبار دسکتاپ */}
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
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          </div>

          {/* فهرست محصولات */}
          <section className="min-w-0 flex-1">
            {/* تعداد محصولات و مرتب‌سازی */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="text-sm text-gray-500">
                {totalProducts.toLocaleString("fa-IR")} محصول
              </span>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="product-sort"
                  className="hidden text-sm font-semibold sm:block"
                >
                  مرتب‌سازی:
                </label>

                <select
                  id="product-sort"
                  value={sort}
                  onChange={(event) =>
                    handleSortChange(event.target.value)
                  }
                  className="h-10 rounded-xl border border-[#decfc7] bg-white px-3 text-sm outline-none focus:border-[#7c243d]"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                </select>
              </div>
            </div>

            {/* وضعیت دریافت محصولات */}
            {isLoading && (
              <div className="py-20 text-center text-gray-500">
                در حال دریافت محصولات...
              </div>
            )}

            {/* خطای دریافت محصولات */}
            {isError && (
              <div className="py-20 text-center text-red-500">
                دریافت محصولات با خطا مواجه شد.
              </div>
            )}

            {/* لیست محصولات */}
            {!isLoading && !isError && (
              <ProductList products={products} />
            )}

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

      {/* مودال فیلتر موبایل */}
      <CategoryFilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
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
        onRatingChange={(minRating) =>
          setFilters((prev) => ({
            ...prev,
            minRating,
          }))
        }
        onInStockChange={(inStock) =>
          setFilters((prev) => ({
            ...prev,
            inStock,
          }))
        }
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </main>
  );
}
