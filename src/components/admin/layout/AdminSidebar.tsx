"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBox,
  FiArchive,
  FiShoppingBag,
  FiLogOut,
  FiArrowRight,
} from "react-icons/fi";

const menuItems = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: FiHome,
  },
  {
    title: "محصولات",
    href: "/admin/products",
    icon: FiBox,
  },
  {
    title: "موجودی و قیمت",
    href: "/admin/inventory",
    icon: FiArchive,
  },
  {
    title: "سفارش‌ها",
    href: "/admin/orders",
    icon: FiShoppingBag,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-l bg-white">
      <Link
        href="/"
        className="mb-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <FiArrowRight size={18} />
        <span>بازگشت به سایت</span>
      </Link>
      <div className="p-5">
        <div className="mb-8 text-xl font-bold text-slate-900">فروشگاه</div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 border-t pt-5">
          <Link
            href="/admin/login"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
          >
            <FiLogOut size={20} />
            <span>خروج</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
