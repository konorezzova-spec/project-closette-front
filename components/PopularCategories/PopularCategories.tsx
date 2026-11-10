"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import Container from "@/components/Container/Container";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { fetchCategories } from "@/lib/api/clientApi";

import css from "./PopularCategories.module.css";

export default function PopularCategories() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["popularCategories"],
    queryFn: () => fetchCategories(1, 3),
  });

  const categories = data?.categories ?? [];

  return (
    <Container className={css.section}>
      <div className={css.header_wrap}>
        <h2 className={css.title}>Популярні категорії</h2>

        <Link href="/categories" className={css.link}>
          Всі категорії
        </Link>
      </div>

      {isPending && <p>Завантаження категорій...</p>}

      {isError && <p>Не вдалося завантажити категорії.</p>}

      {!isPending && !isError && categories.length === 0 && (
        <p>Категорій поки немає.</p>
      )}

      <ul className={css.list}>
        {categories.map(category => (
          <li className={css.list_item} key={category._id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
