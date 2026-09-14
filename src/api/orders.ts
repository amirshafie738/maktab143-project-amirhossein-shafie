import { api } from "./axios";
import type { Order } from "@/types/order";

export async function getOrders(): Promise<Order[]> {
  const response = await api.get<Order[]>("/orders");

  return response.data;
}