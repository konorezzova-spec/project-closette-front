
import { cookies } from "next/headers";
import { FetchParams, GoodsHttpResponse } from "./clientApi";
import { nextServer } from "./api";

export const fetchGoods = async (
  fetchParams: FetchParams
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