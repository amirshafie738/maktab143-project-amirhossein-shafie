import { Product } from "@/types/product";
import { api } from "./axios";

export type DashboardStats = {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  outOfStockProducts: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await api.get<DashboardStats>(
    "/admin/dashboard/stats"
  );

  return response.data;
}

export type SalesData = {
  date: string;
  sales: number;
};

export async function getDashboardSales(): Promise<SalesData[]> {
  const response = await api.get<SalesData[]>(
    "/admin/dashboard/sales"
  );

  return response.data;
}
export type OrderStatusData = {
    status: string;
    count: number;
  };
  
  export async function getDashboardOrderStatus(): Promise<
    OrderStatusData[]
  > {
    const response = await api.get<OrderStatusData[]>(
      "/admin/dashboard/order-status"
    );
  
    return response.data;
  }
  export async function getDashboardLowStock(): Promise<Product[]> {
    const response = await api.get<Product[]>(
      "/admin/dashboard/low-stock"
    );
  
    return response.data;
  }

  export type TopProduct = Product & {
    soldCount: number;
  };
  
  export async function getDashboardTopProducts(): Promise<TopProduct[]> {
    const response = await api.get<TopProduct[]>(
      "/admin/dashboard/top-products"
    );
  
    return response.data;
  }