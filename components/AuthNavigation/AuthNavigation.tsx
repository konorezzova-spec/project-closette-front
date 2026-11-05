"use client";

import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

interface AuthNavigationProps {
  onClick: () => void;
}

export default function AuthNavigation({ onClick }: AuthNavigationProps) {
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <li>
          <Link
            className={css.nav_auth}
            href="/order"
            prefetch={false}
            onClick={onClick}
          >
            Кабінет
          </Link>
        </li>
      ) : (
        <>
          <li>
            <Link
              className={css.nav_auth}
              href="/auth/login"
              prefetch={false}
              onClick={onClick}
            >
              Вхід
            </Link>
          </li>
          <li>
            <Link
              className={css.nav_auth_in}
              href="/auth/register"
              prefetch={false}
              onClick={onClick}
            >
              Реєстрація
            </Link>
          </li>
        </>
      )}
    </>
  );
}
