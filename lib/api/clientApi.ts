import { Good } from "@/types/good";
import { nextServer } from "./api";

export interface fetchParams {
  page: number;
  perPage: number;
  category?: string;
  size?: string;
  price?: number;
  gender?: string;
}
export interface GoodsHttpResponse {
  data: { goods: Good[] };
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export const fetchGoods = async (
  fetchParams: fetchParams
): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params: fetchParams,
  });

  return data;
};

export async function fetchGoodById(id: string): Promise<Good> {
  const response = await nextServer.get<Good>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/goods/${id}`
  );
  return response.data;
}
