
import { cookies } from "next/headers";
import { fetchParams, GoodsHttpResponse } from "./clientApi";
import { nextServer } from "./api";

export const fetchGoods = async (
  fetchParams: fetchParams
): Promise<GoodsHttpResponse> => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params: fetchParams,
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};