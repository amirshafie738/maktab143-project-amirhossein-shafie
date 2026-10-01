import { api } from "./axios";
import type { Order } from "@/types/order";

export type CreateOrderData = {
  username: string;
  lastname: string;
  address: string;
  phone: string;
  expectAt: number;
  products: {
    id: number;
    name: string;
    count: string;
    price: string;
    image: string;
  }[];
  prices: number;
  delivered: boolean;
  paymentStatus: "pending" | "success" | "failed";
};

type GetOrdersParams = {
  page?: number;
  limit?: number;
  delivered?: string;
  sortOrder?: "asc" | "desc";
};

type OrdersResponse = {
  data: Order[];
  total: number;
};

// ایجاد سفارش
export async function createOrder(data: CreateOrderData): Promise<Order> {
  const response = await api.post<Order>("/orders", data);

  return response.data;
}

// تغییر وضعیت پرداخت
export async function updateOrderPaymentStatus(
  id: number,
  paymentStatus: "pending" | "success" | "failed"
): Promise<Order> {
  const response = await api.patch<Order>(`/orders/${id}`, { paymentStatus });

  return response.data;
}
// تغییر وضعیت تحویل سفارش
export async function updateOrderDeliveryStatus(
  id: number,
  delivered: boolean
): Promise<Order> {
  const response = await api.patch<Order>(`/orders/${id}`, { delivered });

  return response.data;
}

// دریافت یک سفارش
export async function getOrder(id: number): Promise<Order> {
  const response = await api.get<Order>(`/orders/${id}`);

  return response.data;
}

// دریافت لیست سفارش‌ها
export async function getOrders({
  page = 1,
  limit = 5,
  delivered = "",
  sortOrder = "desc",
}: GetOrdersParams = {}): Promise<OrdersResponse> {
  const response = await api.get<Order[]>("/orders", {
    params: {
      _page: page,
      _limit: limit,
      paymentStatus: "success",
      ...(delivered && { delivered}),

      _sort: "createdAt",
      _order: sortOrder,
    },
  });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}

// حذف سفارش
export async function deleteOrder(id: number): Promise<void> {
  await api.delete(`/orders/${id}`);
}
