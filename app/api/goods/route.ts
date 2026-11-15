import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get("perPage") ?? 12);
    const rawTag = request.nextUrl.searchParams.get("category") ?? "";
    const category = rawTag === "All" ? "" : rawTag;

    const sizes = request.nextUrl.searchParams.getAll("size");
    const maxPrice = Number(request.nextUrl.searchParams.get("maxPrice") ?? "");
    const gender = request.nextUrl.searchParams.get("gender") ?? "";

    const res = await api.get("/goods", {
      params: {
        page,
        perPage,
        ...(category && { category }),
        ...(sizes.length > 0 && { size: sizes }),
        ...(maxPrice && { maxPrice }),
        ...(gender && { gender }),
      },
      paramsSerializer: { indexes: null },

      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
