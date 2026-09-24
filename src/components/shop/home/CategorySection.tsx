import Link from "next/link";

const categories = [
  {
    title: "مراقبت پوست",
    description: "از پاکسازی تا محافظت روزانه",
    image: "/images/category-skincare.png",
    href: "/products?category=1",
  },
  {
    title: "آرایش",
    description: "رنگ‌هایی برای زیبایی طبیعی",
    image: "/images/category-makeup.png",
    href: "/products?category=3",
  },
  {
    title: "مراقبت مو",
    description: "روتین موهای سالم و درخشان",
    image: "/images/category-hair.png",
    href: "/products?category=2",
  },
  {
    title: "عطر",
    description: "رایحه‌ای که امضای شماست",
    image: "/images/category-fragrance.png",
    href: "/products?category=4",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[#fcfaf7] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* عنوان */}
        <div className="mb-8 flex items-end justify-between">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-bold text-[#333] transition hover:text-[#7c243d]"
          >
            مشاهده همه
            <span className="text-lg">←</span>
          </Link>

          <div className="text-right">
            <p className="mb-2 text-sm font-bold text-[#7c243d]">
              انتخاب بر اساس دسته
            </p>

            <h2 className="text-3xl font-extrabold text-[#222] sm:text-4xl">
              هر چیزی که روتین شما نیاز دارد
            </h2>
          </div>
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-[28px]"
            >
              <div className="aspect-[0.9]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* لایه تیره */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* متن */}
              <div className="absolute bottom-0 right-0 left-0 p-6 text-right text-white">
                <h3 className="text-2xl font-extrabold">
                  {category.title}
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}