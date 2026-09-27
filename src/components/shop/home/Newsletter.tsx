const Newsletter = () => {
    return (
      <section className="w-full px-4 py-10 md:px-8">
        <div
          dir="rtl"
          className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-8 rounded-[35px] bg-[#eee4db] px-6 py-10 md:flex-row md:px-12 lg:px-16"
        >
          {/* متن */}
          <div className="w-full text-center md:w-1/2 md:text-right">
            <span className="mb-3 block text-sm font-medium text-[#76243c]">
              نامه‌های کوتاه الویا
            </span>
  
            <h2 className="text-2xl font-bold leading-relaxed text-[#151515] md:text-3xl lg:text-4xl">
              انتخاب‌های تازه، فقط وقتی ارزش خبر شدن دارند.
            </h2>
          </div>
  
          {/* فرم */}
          <div className="w-full md:w-[48%]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-16 flex-1 rounded-2xl border border-gray-200 bg-white px-5 text-left text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#76243c]"
              />
  
              <button
                type="button"
                className="h-16 rounded-2xl bg-[#76243c] px-8 font-semibold text-white shadow-lg transition hover:bg-[#641d32]"
              >
                عضویت در خبرنامه
              </button>
            </div>
  
            <p className="mt-3 text-center text-sm text-gray-700 sm:text-right">
              فقط خبرهای مهم و پیشنهادهای منتخب، بدون پیام‌های مزاحم.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Newsletter;