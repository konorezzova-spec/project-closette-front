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
  orderNumber: OrderStatus;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}