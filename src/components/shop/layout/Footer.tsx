import Link from "next/link";
import { FiShield } from "react-icons/fi";

const mahvaraLinks = [
  { title: "درباره ما", href: "#" },
  { title: "تماس با ما", href: "#" },
  { title: "مجله", href: "#" },
  { title: "سوالات متداول", href: "#" },
];

const shoppingLinks = [
  { title: "شرایط ارسال", href: "#" },
  { title: "بازگشت کالا", href: "#" },
  { title: "قوانین و مقررات", href: "#" },
  { title: "حریم خصوصی", href: "#" },
];

const accountLinks = [
  { title: "ورود و ثبت‌نام", href: "/admin/login" },
  { title: "سفارش‌های من", href: "#" },
  { title: "علاقه‌مندی‌ها", href: "#" },
  { title: "پیگیری سفارش", href: "#" },
];

export default function Footer() {
  return (
    <footer dir="rtl" className="mt-20 bg-[#f5eee5] text-[#6f6259]">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Mahvara */}
        <div className="text-right">
          <Link
            href="/"
            className="flex items-center justify-center"
          >
            <div className="h-12  w-28 lg:h-20 lg:w-32 mb-5">
              <img
                src="/images/brand/elvia-logo.png"
                alt="ELVIA"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          <p className="max-w-[390px] text-[15px] leading-8">
            انتخاب روشن برای زیبایی روزمره؛ محصولات معتبر، اطلاعات شفاف و تجربه
            خریدی آرام.
          </p>
        </div>

        {/* Mahvara Links */}
        <div>
          <h3 className="mb-6 text-[17px] font-bold text-[#292929]">الویا</h3>

          <ul className="space-y-4">
            {mahvaraLinks.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="text-[15px] transition-colors hover:text-[#7d2945]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shopping Guide */}
        <div>
          <h3 className="mb-6 text-[17px] font-bold text-[#292929]">
            راهنمای خرید
          </h3>

          <ul className="space-y-4">
            {shoppingLinks.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="text-[15px] transition-colors hover:text-[#7d2945]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="mb-6 text-[17px] font-bold text-[#292929]">
            حساب شما
          </h3>

          <ul className="space-y-4">
            {accountLinks.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="text-[15px] transition-colors hover:text-[#7d2945]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#ddd3c9]">
        <div className="mx-auto flex max-w-[1440px] flex-col-reverse gap-4 px-10 py-5 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span>© ۱۴۰۵ الویا — نسخه نمایشی حرفه‌ای، همه حقوق محفوظ است.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>خرید امن، اطلاعات شفاف، احترام به حریم خصوصی</span>
            <FiShield size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
}
