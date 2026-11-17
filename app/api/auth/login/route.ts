import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieHeader = request.headers.get('cookie') || '';

    // Пересилаємо запит на реальний бекенд
    const response = await axios.post(
      `${process.env.API_URL}/api/auth/login`,
      body,
      {
        headers: {
          Cookie: cookieHeader,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const setCookieHeader = response.headers['set-cookie'];
    const nextResponse = NextResponse.json(response.data, { status: 200 });

    if (setCookieHeader) {
      if (Array.isArray(setCookieHeader)) {
        setCookieHeader.forEach((cookie) => {
          nextResponse.headers.append('Set-Cookie', cookie);
        });
      } else {
        nextResponse.headers.set('Set-Cookie', setCookieHeader);
      }
    }

    return nextResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || error.response?.data?.error || 'Помилка авторизації' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}