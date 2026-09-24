import { FiCheckCircle, FiShield } from "react-icons/fi";
import type { Product } from "@/types/product";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const features = [
    "بافت سبک و خوش‌استفاده",
    "مناسب روتین روزانه",
    "بسته‌بندی استاندارد و پلمپ",
  ];

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[400px_1fr]">
        {/* انتخاب مطمئن */}
        <div className="order-2 rounded-[25px] border border-[#e5ddd5] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] lg:order-1">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff8f5] text-[#7c243d]">
              <FiShield size={25} />
            </div>

            <h3 className="text-xl font-extrabold text-[#222]">
              انتخاب مطمئن
            </h3>

            <p className="mt-5 text-sm leading-8 text-[#666]">
              اطلاعات محصول از برچسب و منابع برند گردآوری می‌شود.
              ترکیبات ممکن است تغییر کنند؛ همیشه بسته‌بندی نهایی را
              بررسی کنید.
            </p>
          </div>
        </div>

        {/* جزئیات محصول */}
        <div className="order-1 text-right lg:order-2">
          <h2 className="text-3xl font-extrabold text-[#222]">
            جزئیات محصول
          </h2>

          <div
            className="mt-6 text-[15px] leading-8 text-[#666]"
            dangerouslySetInnerHTML={{
              __html: product.description ?? "",
            }}
          />

          {/* ویژگی‌ها */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-between rounded-[20px] border border-[#e7ded6] bg-white px-6 py-5 shadow-[0_6px_20px_rgba(0,0,0,0.03)]"
              >
                <FiCheckCircle
                  size={20}
                  className="text-[#78876c]"
                />

                <span className="font-bold text-[#333]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}