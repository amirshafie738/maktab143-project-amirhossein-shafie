
import {
  NextRequest,
  NextResponse,
} from "next/server";

const API_URL = "http://localhost:3001";

async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          refreshToken,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.accessToken ?? null;
  } catch (error) {
    console.error(
      "Refresh access token error:",
      error
    );

    return null;
  }
}

export async function proxy(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;

  const accessToken =
    request.cookies.get("accessToken")?.value;

  const refreshToken =
    request.cookies.get("refreshToken")?.value;

  // ==========================================
  // صفحه Login
  // ==========================================

  if (pathname === "/admin/login") {
    // Access Token داریم
    if (accessToken) {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    // Access Token نداریم
    // اما Refresh Token داریم
    if (refreshToken) {
      const newAccessToken =
        await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        const response =
          NextResponse.redirect(
            new URL("/admin", request.url)
          );

        response.cookies.set(
          "accessToken",
          newAccessToken,
          {
            path: "/",
          }
        );

        return response;
      }
    }

    return NextResponse.next();
  }

  // ==========================================
  // صفحات Admin
  // ==========================================

  // Access Token داریم
  if (accessToken) {
    return NextResponse.next();
  }

  // Access Token نداریم و Refresh Token هم نداریم
  if (!refreshToken) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // ==========================================
  // گرفتن Access Token جدید
  // ==========================================

  const newAccessToken =
    await refreshAccessToken(refreshToken);

  // Refresh Token نامعتبر یا منقضی شده
  if (!newAccessToken) {
    const response =
      NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  }

  // ==========================================
  // ذخیره Access Token جدید در Cookie
  // ==========================================

  const response = NextResponse.next();

  response.cookies.set(
    "accessToken",
    newAccessToken,
    {
      path: "/",
    }
  );

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};

