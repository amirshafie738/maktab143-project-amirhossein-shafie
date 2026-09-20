import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function proxy(
  request: NextRequest
) {
  const pathname =
    request.nextUrl.pathname;

  // صفحه لاگین آزاد است
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // گرفتن Access Token از Cookie
  const token =
    request.cookies.get("accessToken")?.value;

  // اگر اصلاً Token نداریم
  if (!token) {
    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  // فقط وجود Cookie را بررسی می‌کنیم
  // اعتبار Token را Axios و Backend مدیریت می‌کنند
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};