"use client";

import { FiFilter, FiX } from "react-icons/fi";
import CategorySidebar from "./CategorySidebar";

type CategoryFilterModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CategoryFilterModal({
  open,
  onClose,
}: CategoryFilterModalProps) {
  if (!open) return null;

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
          <CategorySidebar />
        </div>

      </div>
    </div>
  );
}