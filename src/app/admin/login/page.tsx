"use client";

import { FiLock, FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  loginSchema,
  type LoginFormData,
} from "@/schemas/loginSchema";

import { login } from "@/api/auth";

export default function AdminLoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
  
      localStorage.setItem(
        "accessToken",
        response.accessToken
      );
  
      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );
  
      document.cookie = `accessToken=${response.accessToken}; path=/`;
      document.cookie = `refreshToken=${response.refreshToken}; path=/`;
  
      router.push("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            پنل مدیریت
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            برای ورود اطلاعات خود را وارد کنید
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                نام کاربری
              </label>

              <div className="relative">
                <FiUser
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="نام کاربری را وارد کنید"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-4 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              {/* Error space is always reserved */}
              <p className="mt-1 h-5 text-sm text-red-500">
                {errors.username?.message}
              </p>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                رمز عبور
              </label>

              <div className="relative">
                <FiLock
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="رمز عبور را وارد کنید"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-4 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              {/* Error space is always reserved */}
              <p className="mt-1 h-5 text-sm text-red-500">
                {errors.password?.message}
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-slate-800 text-white font-medium transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "در حال ورود..." : "ورود"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}