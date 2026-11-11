import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { error } from "console";

export async function GET() {
  return Response.json({ message: "OK" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post("/feedbacks", body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: "Fail to create feedback", details: error.response?.data },
        {
          status: error.response?.status ?? 502,
        }
      );
    }
  }
  return NextResponse.json(
    {
      error: "Internal Server Error",
    },
    {
      status: 500,
    }
  );
}
