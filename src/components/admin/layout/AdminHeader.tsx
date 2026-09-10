import { FiBell, FiUser } from "react-icons/fi";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="text-lg font-bold text-slate-900">
          پنل مدیریت
        </h1>

        <div className="flex items-center gap-5">
          <button className="text-slate-600 hover:text-slate-900">
            <FiBell size={20} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <FiUser size={18} />
            </div>

            <span className="text-sm font-medium">
              مدیر
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}