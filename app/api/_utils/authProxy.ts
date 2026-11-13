import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../api";
import { logErrorResponse } from "./utils";

/**
 * Пересилає POST-запит із браузера на Express-бекенд (API_URL/api + path)
 * і повертає відповідь разом із cookie сесії, які поставив бекенд.
 */
export async function forwardPost(
  path: string,
  request: Request,
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const apiRes = await api.post(path, body);

    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    const cookies = apiRes.headers["set-cookie"];
    if (Array.isArray(cookies)) {
      for (const cookie of cookies) {
        response.headers.append("set-cookie", cookie);
      }
    }
    return response;
  } catch (error) {
    if (isAxiosError<{ message?: string }>(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.response?.data?.message ?? error.message },
        { status: error.response?.status ?? 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}