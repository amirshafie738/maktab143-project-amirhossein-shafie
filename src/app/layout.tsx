import "./globals.css";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";

import QueryProvider from "@/providers/QueryProvider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
