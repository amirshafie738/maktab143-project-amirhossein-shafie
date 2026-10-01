"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type ProductSliderProps = {
  images: string[];
  productName: string;
  imageUrl: (image: string) => string;
};

export default function ProductSlider({
  images,
  productName,
  imageUrl,
}: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-[28px] border border-[#eee8e2] bg-white text-sm text-[#999]">
        تصویری وجود ندارد
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full">
      {/* اسلایدر اصلی */}
      <div className="group relative overflow-hidden rounded-[28px] border border-[#eee8e2] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        {/* عکس */}
        <div className="aspect-square w-full bg-white">
          <img
            src={imageUrl(images[currentIndex])}
            alt={productName}
            className="h-full w-full object-contain p-4 transition duration-500 sm:p-8"
          />
        </div>

        {/* دکمه قبلی */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="تصویر قبلی"
            className="
              absolute
              right-4
              top-1/2
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#eee8e2]
              bg-white
              text-[#555]
              shadow-sm
              transition
              hover:border-[#7c243d]
              hover:bg-[#7c243d]
              hover:text-white
            "
          >
            <FiChevronRight size={20} />
          </button>
        )}

        {/* دکمه بعدی */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="تصویر بعدی"
            className="
              absolute
              left-4
              top-1/2
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#eee8e2]
              bg-white
              text-[#555]
              shadow-sm
              transition
              hover:border-[#7c243d]
              hover:bg-[#7c243d]
              hover:text-white
            "
          >
            <FiChevronLeft size={20} />
          </button>
        )}

        {/* شماره عکس */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-[#eee8e2] bg-white px-4 py-1.5 text-xs font-bold text-[#555] shadow-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* تصاویر کوچک */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`
                h-18
                w-18
                shrink-0
                overflow-hidden
                rounded-[16px]
                border-2
                bg-white
                p-1
                transition-all

                ${
                  currentIndex === index
                    ? "border-[#7c243d] shadow-[0_4px_15px_rgba(124,36,61,0.12)]"
                    : "border-[#eee8e2] hover:border-[#cfc3ba]"
                }
              `}
            >
              <img
                src={imageUrl(image)}
                alt={`${productName} ${index + 1}`}
                className="h-full w-full rounded-[11px] object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
