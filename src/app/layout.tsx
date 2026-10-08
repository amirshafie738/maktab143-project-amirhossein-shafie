import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";



const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی",
  icons:{
    icon:"/images/brand/elvia.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <QueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
