"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      {" "}
      <h1>404 - Сторінку не знайдено</h1>
      <p>Перепрошуємо, але такої сторінки не існує.</p>
    </>
  );
}
