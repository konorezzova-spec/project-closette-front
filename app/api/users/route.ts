import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') ?? '';

    const response = await axios.get(`${process.env.API_URL}/api/users`, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Помилка проксі користувача:', error.response?.data ?? error.message);
      return NextResponse.json(
        { error: 'Не вдалося завантажити профіль' },
        { status: error.response?.status ?? 500 }
      );
    }

    console.error('Невідома помилка:', error);
    return NextResponse.json(
      { error: 'Не вдалося завантажити профіль' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') ?? '';
    const body = await request.json();

    const response = await axios.patch(`${process.env.API_URL}/api/users`, body, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Помилка проксі оновлення профілю:', error.response?.data ?? error.message);
      return NextResponse.json(
        { error: 'Не вдалося оновити профіль' },
        { status: error.response?.status ?? 500 }
      );
    }

    console.error('Невідома помилка:', error);
    return NextResponse.json(
      { error: 'Не вдалося оновити профіль' },
      { status: 500 }
    );
  }
}