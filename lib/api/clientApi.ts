import type { Good } from "@/types/good";
import type { CreateGoodReviewValues, GoodReview } from "@/types/good";

import type { CategoriesResponse } from "@/types/category";

import type { CreateOrderParams, Order } from "@/types/order";

import { nextServer } from "./api";

export interface FetchParams {
  page: number;
  perPage: number;
  category?: string;
  size?: string;
  price?: number;
  gender?: string;
}

// 🟩 Структура відповіді API
export interface GoodsHttpResponse {
  status: number;
  message: string;
  data: {
    goods: Good[];
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
}

// 🟩 Запит товарів
export const fetchGoods = async (
  fetchParams: FetchParams
): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params: fetchParams,
  });

  return data;
};

export async function fetchGoodById(id: string): Promise<Good> {
  const response = await nextServer.get<Good>(`/goods/${id}`);
  return response.data;
}

export async function fetchCategories(
  page: number,
  perPage: number
): Promise<CategoriesResponse> {
  const { data } = await nextServer.get("/categories", {
    params: { page, perPage },
  });
  return data.data;
}


export const createOrder = async (params: CreateOrderParams):Promise<Order> => {
  const response = await nextServer.post<Order>("/orders", params);
  return response.data;
};

export async function addGoodReview(body: CreateGoodReviewValues) {
  const { data } = await nextServer.post<GoodReview>("/feedbacks", body);
  return data;
}
