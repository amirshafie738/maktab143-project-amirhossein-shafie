"use client";

import Link from "next/link";
import { useRef } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/hero/hero-1.jpg",
    title: (
      <>
        زیبایی طبیعی،
        <br />
        اعتماد ماندگار
      </>
    ),
    description: "محصولات زیبایی باکیفیت برای درخششی که مخصوص شماست.",
    button: "مشاهده محصولات",
    href: "/products",
  },
  {
    image: "/images/hero/hero-2.jpg",
    title: (
      <>
        آرایشی که
        <br />
        زیبایی شما را کامل می‌کند
      </>
    ),
    description: "محصولات آرایشی باکیفیت برای هر لحظه از زندگی شما.",
    button: "مشاهده مجموعه",
    href: "/products?category=3",
  },
  {
    image: "/images/hero/hero-3.jpg",
    title: (
      <>
        مراقبت از مو،
        <br />
        مراقبت از خود
      </>
    ),
    description: "محصولاتی برای موهایی سالم، زیبا و درخشان.",
    button: "مشاهده محصولات",
    href: "/products?category=2",
  },
];

export default function HeroSlider() {
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop
        speed={800}
        dir="rtl"
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-16/7 min-h-100 overflow-hidden sm:min-h-125">
              <img
                src={slide.image}
                alt="محصولات زیبایی الویا"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-l from-transparent via-black/5 to-black/35" />

              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-10 lg:px-16">
                <div className="max-w-xl text-right">
                  <p className="mb-5 text-sm font-semibold text-[#7c243d]">
                    مجموعه زیبایی الویا
                  </p>

                  <h2 className="text-4xl font-black leading-tight text-[#292929] sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>

                  <p className="mt-6 max-w-lg text-sm leading-8 text-[#555] sm:text-base">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.href}
                    className="mt-7 inline-flex items-center rounded-full bg-[#7c243d] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#681f34]"
                  >
                    {slide.button}
                    <span className="mr-2 text-lg">←</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه قبلی */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute  cursor-pointer right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#333] shadow-md transition hover:scale-105 hover:bg-white"
        aria-label="اسلاید قبلی"
      >
        <span className="text-3xl leading-none">‹</span>
      </button>

      {/* دکمه بعدی */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute left-5  cursor-pointer top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#333] shadow-md transition hover:scale-105 hover:bg-white"
        aria-label="اسلاید بعدی"
      >
        <span className="text-3xl leading-none">›</span>
      </button>
    </section>
  );
}