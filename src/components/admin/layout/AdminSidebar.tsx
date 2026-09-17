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
  FiX,
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

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay - فقط موبایل */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed right-0 top-0 z-50 h-screen w-64 shrink-0
          border-l bg-white
          transition-transform duration-300
          lg:static lg:z-auto lg:block lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* دکمه بستن موبایل */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <FiX size={22} />
        </button>

        <div className="p-5">
          <Link
            href="/"
            onClick={onClose}
            className="mb-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <FiArrowRight size={18} />
            <span>بازگشت به سایت</span>
          </Link>

          <div className="mb-8 text-xl font-bold text-slate-900">
            فروشگاه
          </div>

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
                  onClick={onClose}
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
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
            >
              <FiLogOut size={20} />
              <span>خروج</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}