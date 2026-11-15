"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api/clientApi";
import type { Category } from "@/types/category";
import CategoryCard from "../CategoryCard/CategoryCard";
import css from "./CategoriesList.module.css";

function getSizes() {
  const isDesktop = window.matchMedia("(min-width: 1440px)").matches;
  return isDesktop ? { initial: 6, step: 3 } : { initial: 4, step: 2 };
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { initial } = getSizes();
    fetchCategories(1, initial)
      .then((data) => {
        setCategories(data.categories);
        setTotal(data.totalItems);
      })
      .catch(() => setError("Не вдалося завантажити категорії"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLoadMore = async () => {
    const { step } = getSizes();
    const nextPage = Math.floor(categories.length / step) + 1;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCategories(nextPage, step);
      setCategories((prev) => {
        const ids = new Set(prev.map((c) => c._id));
        return [...prev, ...data.categories.filter((c) => !ids.has(c._id))];
      });
      setTotal(data.totalItems);
    } catch {
      setError("Не вдалося завантажити категорії");
    } finally {
      setIsLoading(false);
    }
  };

  const hasMore = categories.length < total;

  return (
    <>
      {error && <p className={css.error}>{error}</p>}

      <ul className={css.list}>
        {categories.map((category) => (
          <li key={category._id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>

      {isLoading && <p className={css.loader}>Завантаження...</p>}

      {!isLoading && hasMore && (
        <button type="button" className={css.button} onClick={handleLoadMore}>
          Показати більше
        </button>
      )}
    </>
  );
}