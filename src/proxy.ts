import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function proxy(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;

  const token =
    request.cookies.get("accessToken")?.value;

  // اگر کاربر قبلاً لاگین کرده
  // و دوباره وارد صفحه login شد
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  // اگر کاربر لاگین نکرده،
  // اجازه نمایش صفحه login را بده
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // برای سایر صفحات admin
  // اگر token نداریم → login
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // token داریم → اجازه ورود
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};