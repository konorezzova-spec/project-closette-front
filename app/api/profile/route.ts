import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    const backendResponse = await fetch(`${BACKEND_URL}/api/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error('Proxy GET /api/profile error:', error);
    return NextResponse.json(
      { message: 'Не вдалося завантажити дані. Спробуйте пізніше.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.cookies.get('token')?.value;

    const backendResponse = await fetch(`${BACKEND_URL}/api/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error('Proxy PUT /api/profile error:', error);
    return NextResponse.json(
      { message: 'Не вдалося оновити дані. Спробуйте пізніше.' },
      { status: 500 }
    );
  }
}