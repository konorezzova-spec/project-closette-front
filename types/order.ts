import type { Size } from "./good";

export interface OrderItem{
  id: string;
  name: string;
  image: string;
  size: Size;
  price: number;
  rating: number;
  reviewsCount: number;
  quantity: number;
}

export interface CreateOrderParams {
  name: string;
  surname: string;
  tel: string;
  city: string;
  postOffice: number;
  comment?: string;
  amount: number;
  goodsOrderList: {
    goodId: string;
    size: Size;
    quantity: number;
  }[];
}

export type OrderStatus = "inProcess" | "completing" | "done" | "canceled";

export interface Order extends CreateOrderParams {
  _id: string;
  orderNumber: number;
  status: OrderStatus
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrder extends Omit<Order, "goodsOrderList">{
  goodsOrderList: {
    goodId: { _id: string; name: string } | null;
    size: Size;
    quantity: number;
  }[];
}

export interface AdminOrdersResponse {
  orders: AdminOrder[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}