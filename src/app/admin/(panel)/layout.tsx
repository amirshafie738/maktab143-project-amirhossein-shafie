"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}