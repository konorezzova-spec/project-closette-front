import { Good } from "@/types/good";
import { nextServer } from "./api";

export async function fetchGoodById(id: string): Promise<Good> {
  const response = await nextServer.get<Good>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/goods/${id}`
  );
  return response.data;
}
