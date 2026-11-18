import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/admin"];
const publicRoutes = [
  "auth",
  "basket",
  "categories",
  "goods",
  "homePage",
  "order",
];

export async function proxy(request: NextRequest) {
  // Шлях, на який користувач намагається перейти
  const { pathname } = request.nextUrl;
  // Перевіряємо чи маршрут публічний, чи приватний
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );
  //Отримуємо cookie
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken) {
    if (refreshToken) {
      // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
      // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (parsed.value) {
            cookieStore.set(parsed.name, parsed.value, parsed);
          }
        }

        // Якщо сесія все ще активна:
        // для публічного маршруту — виконуємо редірект на головну.
        // важливо — передаємо нові cookie далі, щоб оновити їх у браузері
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        // для приватного маршруту — дозволяємо доступ
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    // Якщо refreshToken або сесії немає:
    // публічний маршрут — дозволяємо доступ
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // приватний маршрут — редірект на сторінку входу
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Якщо accessToken існує:
  // публічний маршрут — виконуємо редірект на головну
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // приватний маршрут — дозволяємо доступ
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/profile",
    "/admin/:path*",
    "/auth/:path*",
    "/basket",
    "/categories",
    "/goods/:path*",
    "/homePage",
    "/order",
  ],
};
