"use client";

import { FiFilter, FiX } from "react-icons/fi";
import CategorySidebar from "./CategorySidebar";

type ProductFilters = {
  category: string;
  brand: string;
  search: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  inStock: boolean;
};

type CategoryFilterModalProps = {
  open: boolean;
  onClose: () => void;

  filters: ProductFilters;

  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onSearchChange: (search: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onInStockChange: (value: boolean) => void;

  onApply: () => void;
  onClear: () => void;
};

export default function CategoryFilterModal({
  open,
  onClose,
  filters,
  onCategoryChange,
  onBrandChange,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onRatingChange,
  onInStockChange,
  onApply,
  onClear,
}: CategoryFilterModalProps) {
  if (!open) return null;

  const handleApply = () => {
    onApply();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute bottom-0 right-0 max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-lg text-[#7c243d]" />

            <h2 className="font-bold text-[#292929]">
              فیلتر محصولات
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
          >
            <FiX />
          </button>
        </div>

        {/* Filter */}
        <div className="p-4">
          <CategorySidebar
            filters={filters}
            onCategoryChange={onCategoryChange}
            onBrandChange={onBrandChange}
            onSearchChange={onSearchChange}
            onMinPriceChange={onMinPriceChange}
            onMaxPriceChange={onMaxPriceChange}
            onRatingChange={onRatingChange}
            onInStockChange={onInStockChange}
            onApply={handleApply}
            onClear={onClear}
          />
        </div>
      </div>
    </div>
  );
}