
import { cookies } from "next/headers";
import { FetchGoodsParams, GoodsHttpResponse } from "./clientApi";
import { nextServer } from "./api";
import { Good } from "@/types/good";

export const fetchGoods = async (
  fetchParams: FetchGoodsParams
): Promise<GoodsHttpResponse> => {
   const cookieStore = await cookies();
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params: fetchParams,
    headers: {
           Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export async function fetchGoodById(id: string): Promise<Good> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Good>(`/goods/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}
