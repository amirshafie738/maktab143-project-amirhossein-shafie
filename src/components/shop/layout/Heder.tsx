"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import type { RootState } from "@/redux/store";
import { searchProducts } from "@/api/product";

const menuItems = [
  {
    title: "فروشگاه",
    href: "/products",
  },
  {
    title: "مراقبت پوست",
    href: "/products?category=1",
  },
  {
    title: "آرایش",
    href: "/products?category=3",
  },
  {
    title: "مراقبت مو",
    href: "/products?category=2",
  },
  {
    title: "عطر",
    href: "/products?category=4",
  },
  {
    title: "مجله سایت",
    href: "#",
  },
];

export default function Heder() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  //debounced
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // بررسی ورود کاربر
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    setIsLoggedIn(!!token);
  }, []);
  //9۰۰ میلی‌ثانیه دوباره تایپ کرد، تایمر قبلی لغو میشه.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 900);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // جستجوی محصولات
  const { data: searchResults = [], isLoading: isSearching } = useQuery({
    queryKey: ["search-products", debouncedSearch],
    queryFn: () => searchProducts(debouncedSearch),
    enabled: isSearchOpen,
  });

  // باز کردن سرچ
  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMenuOpen(false);
  };

  // بستن سرچ
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 w-full bg-white">
        <div className="mx-auto flex h-19 max-w-8xl items-center justify-between px-4 lg:h-20 lg:px-6">
          {/* ================= MOBILE MENU ================= */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center text-[#292929] transition hover:text-[#7d2945] lg:hidden"
          >
            <FiMenu size={24} />
          </button>

          {/* ================= LOGO ================= */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <div className="h-12 w-24 lg:h-18 lg:w-32">
              <img
                src="/images/brand/elvia-logo.png"
                alt="ELVIA"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
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

          {/* ================= DESKTOP SEARCH ================= */}
          <div className="mx-auto hidden w-full max-w-96 md:block lg:block">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-14 w-full items-center rounded-full border border-[#e5e1dd] bg-[#faf9f7] px-5 text-right"
            >
              <FiSearch size={21} className="shrink-0 text-[#777]" />

              <span className="mr-3 w-full text-right text-sm text-[#8b8580]">
                جستجوی محصول، برند
              </span>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-xs text-gray-400 shadow-sm">
                /
              </span>
            </button>
          </div>

          {/* ================= ICONS ================= */}
          <div className="flex shrink-0 items-center gap-5 lg:mr-6 lg:gap-6">
            {/* Search */}
            <button
              type="button"
              onClick={openSearch}
              className="text-[#292929] transition hover:text-[#7d2945]"
            >
              <FiSearch size={23} />
            </button>

            {/* User */}
            <Link
              href={isLoggedIn ? "/admin" : "/admin/login"}
              className="text-[#292929] transition hover:text-[#7d2945]"
            >
              <FiUser size={23} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-[#292929] transition hover:text-[#7d2945]"
            >
              <FiShoppingBag size={23} />

              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7d2945] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </Link>

            {/* Desktop Menu */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="hidden text-[#292929] transition hover:text-[#7d2945] lg:block"
            >
              <FiMenu size={25} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= SEARCH ================= */}

      {isSearchOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={closeSearch}
            className="fixed inset-0 z-60 bg-black/35 backdrop-blur-[2px]"
          />

          {/* Search Modal */}
          <div className="fixed left-1/2 top-14 z-70 w-[calc(100%-24px)] max-w-3xl -translate-x-1/2 overflow-hidden rounded-[28px] bg-white shadow-2xl">
            {/* Search Header */}
            <div className="flex items-center gap-4 border-b border-[#eee9e3] px-5 py-5 sm:px-7">
              {/* بستن */}
              <button
                type="button"
                onClick={closeSearch}
                className="shrink-0 text-[#292929] transition hover:text-[#7d2945]"
              >
                <FiX size={26} />
              </button>

              {/* Input */}
              <div className="flex h-14 min-w-0 flex-1 items-center border-2 border-[#c49ba8] px-4">
                <input
                  autoFocus
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="جستجوی محصول، برند "
                  className="w-full bg-transparent text-right text-sm text-[#333] outline-none placeholder:text-[#999]"
                />

                <FiSearch size={23} className="mr-3 shrink-0 text-[#777]" />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-7">
              {/* عنوان */}
              <p className="mb-5 text-right text-sm font-bold text-[#777]">
                {searchValue.trim() ? "نتایج جستجو" : "محصولات پیشنهادی"}
              </p>

              {/* Loading */}
              {isSearching && (
                <div className="py-10 text-center text-sm text-[#999]">
                  در حال جستجو...
                </div>
              )}

              {/* Results */}
              {!isSearching && searchResults.length > 0 && (
                <div className="space-y-3">
                  {searchResults.map((product) => {
                    const imageUrl = product.thumbnail.startsWith("/files/")
                      ? `http://localhost:3001${product.thumbnail}`
                      : product.thumbnail;

                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={closeSearch}
                        className="flex items-center justify-between gap-4 rounded-2xl p-3 transition hover:bg-[#faf7f4]"
                      >
                        {/* محصول */}
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f1ece6]">
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="min-w-0 text-right">
                            <p className="truncate text-sm font-bold text-[#292929]">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-[#999]">
                              {product.brand}
                            </p>
                          </div>
                        </div>

                        {/* قیمت */}
                        <span className="shrink-0 text-sm font-bold text-[#292929]">
                          {product.price.toLocaleString("fa-IR")} تومان
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* بدون نتیجه */}
              {!isSearching &&
                searchValue.trim() &&
                searchResults.length === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-sm font-semibold text-[#555]">
                      محصولی پیدا نشد
                    </p>

                    <p className="mt-2 text-xs text-[#999]">
                      عبارت دیگری را جستجو کنید.
                    </p>
                  </div>
                )}
            </div>
          </div>
        </>
      )}

      {/* ================= MENU OVERLAY ================= */}

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      {/* ================= DRAWER ================= */}

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-md max-w-[90vw] bg-[#fffdf9] transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
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
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="h-12 w-24 lg:h-18 lg:w-32">
              <img
                src="/images/brand/elvia-logo.png"
                alt="ELVIA"
                className="h-full w-full object-contain"
              />
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
              className="flex h-16 items-center justify-start border-b border-[#eee9e3] text-[16px] font-semibold text-[#292929] transition hover:text-[#7d2945]"
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
            className="flex h-14 items-center justify-center rounded-full border border-[#cfc5bd] text-[16px] font-bold text-[#292929] transition hover:bg-[#7d2945] hover:text-white"
          >
            ورود به حساب کاربری
          </Link>
        </div>
      </aside>
    </>
  );
}
