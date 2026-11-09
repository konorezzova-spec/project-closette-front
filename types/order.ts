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