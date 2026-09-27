import Link from "next/link";
import {
  FiArrowLeft,
  FiHeadphones,
  FiPackage,
  FiShield,
} from "react-icons/fi";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div
        className="relative min-h-screen overflow-hidden rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/mahvara-hero.png')",
        }}
      >
        {/* محتوا */}
        <div className="relative z-10 flex min-h-screen items-center justify-start">
          <div className="w-full max-w-xl px-8 py-12 text-right sm:px-12 lg:mr-10 lg:px-8">
            
            <p className="mb-5 text-sm font-semibold text-rose-900">
              ✨ انتخاب تازه الویا
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              زیبایی،
              <br />
              وقتی روشن
              <br />
              انتخاب
              <br />
              می‌شود.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-stone-600 sm:text-base">
              محصولات اصل مراقبت پوست و آرایش، با اطلاعات شفاف و
              انتخابی دقیق برای روتینی که واقعاً با شما هماهنگ است.
            </p>

            {/* دکمه‌ها */}
            <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-rose-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-950"
              >
                مشاهده فروشگاه
                <FiArrowLeft size={17} />
              </Link>

              <button
                type="button"
                className="rounded-full border border-stone-300 bg-transparent px-6 py-3 text-sm font-bold text-stone-800 transition hover:bg-white/50"
              >
                ساخت روتین پوستی
              </button>
            </div>

            {/* ویژگی‌ها */}
            <div className="mt-7 flex flex-wrap justify-end gap-x-6 gap-y-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <FiShield className="text-rose-900" />
                <span>تضمین اصالت</span>
              </div>

              <div className="flex items-center gap-2">
                <FiPackage className="text-rose-900" />
                <span>بسته‌بندی امن</span>
              </div>

              <div className="flex items-center gap-2">
                <FiHeadphones className="text-rose-900" />
                <span>راهنمای خرید</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}