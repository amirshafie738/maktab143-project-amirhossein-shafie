import { api } from "./axios";
import type { Order } from "@/types/order";

type GetOrdersParams = {
  page?: number;
  limit?: number;
};

type OrdersResponse = {
  data: Order[];
  total: number;
};

export async function getOrders({
  page = 1,
  limit = 5,
}: GetOrdersParams = {}): Promise<OrdersResponse> {
  const response = await api.get<Order[]>("/orders", {
    params: {
      _page: page,
      _limit: limit,
    },
  });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}