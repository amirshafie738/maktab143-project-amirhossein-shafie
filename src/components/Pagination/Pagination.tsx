type PaginationProps = {
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  };
  
  export default function Pagination({
    page,
    totalPages,
    setPage,
  }: PaginationProps) {
    if (totalPages <= 1) {
      return null;
    }
  
    return (
      <div className="mt-6 flex items-center justify-center gap-2">
  
        {/* قبلی */}
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          قبلی
        </button>
  
        {/* صفحات کم */}
        {totalPages <= 7 ? (
          Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`rounded-lg px-4 py-2 ${
                page === pageNumber
                  ? "bg-slate-800 text-white"
                  : "border border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              {pageNumber.toLocaleString("fa-IR")}
            </button>
          ))
        ) : (
          <>
            {/* صفحه اول */}
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`rounded-lg px-4 py-2 ${
                page === 1
                  ? "bg-slate-800 text-white"
                  : "border border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              1
            </button>
  
            {/* ... سمت اول */}
            {page > 4 && (
              <span className="px-2 text-slate-500">
                ...
              </span>
            )}
  
            {/* صفحات اطراف صفحه فعلی */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .filter((pageNumber) => {
                return (
                  pageNumber !== 1 &&
                  pageNumber !== totalPages &&
                  Math.abs(pageNumber - page) <= 2
                );
              })
              .map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`rounded-lg px-4 py-2 ${
                    page === pageNumber
                      ? "bg-slate-800 text-white"
                      : "border border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  {pageNumber.toLocaleString("fa-IR")}
                </button>
              ))}
  
            {/* ... سمت دوم */}
            {page < totalPages - 3 && (
              <span className="px-2 text-slate-500">
                ...
              </span>
            )}
  
            {/* صفحه آخر */}
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              className={`rounded-lg px-4 py-2 ${
                page === totalPages
                  ? "bg-slate-800 text-white"
                  : "border border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
  
        {/* بعدی */}
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          بعدی
        </button>
      </div>
    );
  }