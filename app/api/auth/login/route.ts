import { NextResponse } from 'next/server';

export async function GET() {
  return Response.json({ message: "OK" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({ message: "Login OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}