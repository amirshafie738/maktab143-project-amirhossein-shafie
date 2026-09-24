"use client";

import { useEffect, useState } from "react";

type ProductImageUploadProps = {
  initialImage?: string;
  onImageChange: (file: File | null) => void;
  disabled?: boolean;
};

export default function ProductImageUpload({
  initialImage = "",
  onImageChange,
  disabled = false,
}: ProductImageUploadProps) {
  const [preview, setPreview] = useState(initialImage);

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    // فقط JPEG
    if (file.type !== "image/jpeg") {
      setError("فرمت تصویر باید JPEG باشد.");

      event.target.value = "";
      onImageChange(null);

      return;
    }

    // حداکثر 2MB
    if (file.size > 2 * 1024 * 1024) {
      setError("حجم تصویر نباید بیشتر از ۲ مگابایت باشد.");

      event.target.value = "";
      onImageChange(null);

      return;
    }

    // حذف Blob قبلی
    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    onImageChange(file);
  };

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        تصویر محصول
      </label>

      <input
        type="file"
        accept="image/jpeg"
        onChange={handleChange}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-300 p-3 disabled:cursor-not-allowed disabled:bg-slate-100"
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {preview && (
        <div className="mt-3 h-32 w-32 overflow-hidden rounded-xl border border-slate-200">
          <img
            src={
              preview.startsWith("/files/")
                ? `http://localhost:3001${preview}`
                : preview
            }
            alt="پیش‌نمایش محصول"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <p className="mt-1 text-xs text-slate-400">
        فقط تصویر JPEG و حداکثر ۲ مگابایت
      </p>
    </div>
  );
}
