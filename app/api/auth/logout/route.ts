import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';

    const response = await axios.post(
      `${process.env.API_URL}/api/auth/logout`,
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      }
    );

    const setCookieHeader = response.headers['set-cookie'];

    const nextResponse = NextResponse.json(
      { message: 'Успішний вихід' },
      { status: 200 }
    );

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
      console.error('Помилка проксі-логауту:', error.response?.data || error.message);
      return NextResponse.json(
        { error: 'Не вдалося вийти з системи' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Невідома помилка:', error);
    return NextResponse.json(
      { error: 'Не вдалося вийти з системи' },
      { status: 500 }
    );
  }
}