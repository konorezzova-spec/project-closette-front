import { NextResponse, NextRequest } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";
import { cookies } from "next/headers"; // ← добавить к импортам



const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message },
        {status:error.response?.status??500}
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
}


const BACKEND_URL = process.env.BACKEND_URL;

/**
 * ==========================================
 * Функціонал: Отримання списку замовлень (GET)
 * ==========================================
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    const backendResponse = await fetch(`${BACKEND_URL}/api/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error('Proxy GET /api/orders error:', error);
    return NextResponse.json(
      { message: 'Не вдалося завантажити замовлення. Спробуйте пізніше.' },
      { status: 500 }
    );
  }
}

/**
 * ========================================== */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    const { data, status } = await api.post("/orders", body, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(data, { status });

  } catch (error) {
      return handleError(error);
  }
}