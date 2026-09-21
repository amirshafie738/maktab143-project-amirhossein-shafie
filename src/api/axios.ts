import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string> | null = null;

// ================================
// قبل از ارسال هر درخواست
// ================================
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken =
      localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.token = accessToken;
    }
  }

  return config;
});

// ================================
// بعد از دریافت پاسخ
// ================================
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // اگر 401 گرفتیم
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Axios فقط در مرورگر می‌تواند localStorage را بخواند
      if (typeof window === "undefined") {
        return Promise.reject(error);
      }

      const refreshToken =
        localStorage.getItem("refreshToken");

      // Refresh Token نداریم
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        window.location.href = "/admin/login";

        return Promise.reject(error);
      }

      try {
        // اگر قبلاً یک Refresh در حال انجام است
        // همان درخواست را استفاده می‌کنیم
        if (!refreshPromise) {
          refreshPromise = axios
            .post<{ accessToken: string }>(
              "http://localhost:3001/auth/refresh-token",
              {},
              {
                headers: {
                  refreshToken,
                },
              }
            )
            .then((response) => {
              return response.data.accessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        // منتظر Access Token جدید می‌مانیم
        const newAccessToken =
          await refreshPromise;

        // ================================
        // ذخیره Access Token جدید
        // ================================

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        // Cookie را هم آپدیت می‌کنیم
        document.cookie =
          `accessToken=${newAccessToken}; path=/`;

        // Token جدید روی درخواست قبلی
        originalRequest.headers.token =
          newAccessToken;

        // دوباره همان درخواست را بفرست
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh Token هم معتبر نیست

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        window.location.href =
          "/admin/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);