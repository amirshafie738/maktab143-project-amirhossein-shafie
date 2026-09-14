import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import QueryProvider from "@/providers/QueryProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html
      lang="fa"
      dir="rtl"
      className={cn("font-sans", geist.variable)}
    >
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}