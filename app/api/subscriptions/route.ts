import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../api";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { data, status } = await api.post("/subscriptions", {
      email,
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Subscription failed" },
        { status: error.response?.status ?? 502 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
