"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";

const menuItems = [
  {
    title: "فروشگاه",
    href: "/products",
  },
  {
    title: "مراقبت پوست",
    href: "#",
  },
  {
    title: "آرایش",
    href: "#",
  },
  {
    title: "مراقبت مو",
    href: "#",
  },
  {
    title: "عطر",
    href: "#",
  },
  {
    title: "مجله سایت",
    href: "#",
  },
];

export default function Heder() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white">
        <div className="mx-auto flex h-[80px] max-w-[1440px] items-center px-6">
          
          {/* لوگو */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7d2945]">
              <span className="text-xl text-white">☾</span>
            </div>

            <div className="flex flex-col items-center leading-none">
              <span className="text-[22px] font-bold text-[#292929]">
               تست
              </span>

              <span className="mt-1 text-[7px] tracking-[3px] text-gray-400">
                amir
              </span>
            </div>
          </Link>

          {/* منو */}
          <nav className="mr-8 hidden items-center gap-7 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="whitespace-nowrap text-sm font-semibold text-[#292929] transition-colors hover:text-[#7d2945]"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* سرچ */}
          <div className="mx-auto hidden w-full max-w-[550px] md:block">
            <div className="flex h-[54px] items-center rounded-full border border-[#e5e1dd] bg-[#faf9f7] px-5">
              <FiSearch
                size={21}
                className="shrink-0 text-[#777]"
              />

              <input
                type="text"
                placeholder="جستجوی محصول، برند یا نیاز پوستی"
                className="mr-3 w-full bg-transparent text-right text-sm text-gray-700 outline-none placeholder:text-[#8b8580]"
              />

              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-xs text-gray-400 shadow-sm">
                /
              </span>
            </div>
          </div>

          {/* آیکون‌ها */}
          <div className="mr-6 flex shrink-0 items-center gap-6">
            
            <button
              type="button"
              className="text-[#292929] transition hover:text-[#7d2945]"
            >
              <FiSearch size={24} />
            </button>

            <Link
              href="/admin/login"
              className="text-[#292929] transition hover:text-[#7d2945]"
            >
              <FiUser size={24} />
            </Link>

            {/* سبد خرید */}
            <Link
              href="/cart"
              className="relative text-[#292929] transition hover:text-[#7d2945]"
            >
              <FiShoppingBag size={24} />

              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7d2945] px-1 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            {/* دکمه منو */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="text-[#292929] transition hover:text-[#7d2945]"
            >
              <FiMenu size={25} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[450px] max-w-[90vw] bg-[#fffdf9] transition-transform duration-300 ${
          isMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header Drawer */}
        <div className="flex items-center justify-between border-b border-[#eee9e3] px-7 py-6">
          
          {/* بستن */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#292929] transition hover:text-[#7d2945]"
          >
            <FiX size={25} />
          </button>

          {/* لوگو */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7d2945]">
              <span className="text-lg text-white">☾</span>
            </div>

            <div className="flex flex-col items-center leading-none">
              <span className="text-xl font-bold">
                تست
              </span>

              <span className="mt-1 text-[6px] tracking-[3px] text-gray-400">
                amir
              </span>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="px-7">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex h-[66px] items-center justify-start border-b border-[#eee9e3] text-[16px] font-semibold text-[#292929] transition hover:text-[#7d2945]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Login */}
        <div className="px-7 pt-9">
          <Link
            href="/admin/login"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[58px] items-center justify-center rounded-full border border-[#cfc5bd] text-[16px] font-bold text-[#292929] transition hover:bg-[#7d2945] hover:text-white"
          >
            ورود به حساب کاربری
          </Link>
        </div>
      </aside>
    </>
  );
}