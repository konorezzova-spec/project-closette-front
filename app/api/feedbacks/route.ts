
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../api";
import { logErrorResponse } from "../_utils/utils";


export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const res = await api.get("/feedbacks", { params });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await api.post("/feedbacks", body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (isAxiosError<{ message?: string; error?: string }>(error)) {
    logErrorResponse(error.response?.data);
    return NextResponse.json(
      {
        error:
          error.response?.data?.message ??
          error.response?.data?.error ??
          error.message,
      },
      { status: error.response?.status ?? 500 },
    );
  }
  logErrorResponse({ message: (error as Error).message });
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}