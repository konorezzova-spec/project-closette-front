import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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