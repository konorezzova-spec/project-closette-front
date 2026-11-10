
import { nextServer } from "./api";
import type { Good } from "@/types/good";

export interface FetchGoodsParams {
  page: number;
  perPage: number;
  category?: string;
  size?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface GoodsResponse {
  goods: Good[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface GoodsHttpResponse {
  status: number;
  message: string;
  data: GoodsResponse;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
}

export interface CategoriesHttpResponse {
  status: number;
  message: string;
  data: {
    categories: Category[];
    totalItems: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export const fetchGoods = async (params: FetchGoodsParams) => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params,
  });

  return data;
};

export const fetchCategories = async () => {
  const { data } = await nextServer.get<CategoriesHttpResponse>(
    "/categories",
    {
      params: {
        page: 1,
        perPage: 20,
      },
    }
  );

  return data;
};
