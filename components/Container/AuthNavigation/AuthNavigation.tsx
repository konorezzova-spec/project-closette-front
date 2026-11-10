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
        <ul className={css.auth_ul}>
          <li>
            <Link
              className={css.auth_li_cabinet}
              href="/order"
              prefetch={false}
              onClick={onClick}
            >
              Кабінет
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={css.auth_ul}>
          <li>
            <Link
              className={css.auth_li}
              href="/auth/login"
              prefetch={false}
              onClick={onClick}
            >
              Вхід
            </Link>
          </li>
          <li>
            <Link
              className={css.auth_in_li}
              href="/auth/register"
              prefetch={false}
              onClick={onClick}
            >
              Реєстрація
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
