"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchGoods } from "@/lib/api/clientApi";
import css from "./PopularProducts.module.css";

export default function PopularProducts() {
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popular-products", { page: 1, perPage: 12 }],
    queryFn: () => fetchGoods({ page: 1, perPage: 12 }),
  });
  const goods = data?.data.goods ?? [];

  const getPageCount = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider || !slider.clientWidth) return 1;
    return Math.max(1, Math.ceil(slider.scrollWidth / slider.clientWidth));
  }, []);

  const updatePagination = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider || !slider.clientWidth) return;

    const pageCount = getPageCount();
    const page = Math.round(slider.scrollLeft / slider.clientWidth);
    setPageCount(pageCount);
    setActivePage(Math.min(pageCount - 1, page));
  }, [getPageCount]);

  const scrollToPage = useCallback((page: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const targetPage = Math.max(0, Math.min(getPageCount() - 1, page));
    slider.scrollTo({
      left: targetPage * slider.clientWidth,
      behavior: "smooth",
    });
    setActivePage(targetPage);
  }, [getPageCount]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new ResizeObserver(updatePagination);
    observer.observe(slider);
    slider.addEventListener("scroll", updatePagination);
    window.addEventListener("resize", updatePagination);

    return () => {
      observer.disconnect();
      slider.removeEventListener("scroll", updatePagination);
      window.removeEventListener("resize", updatePagination);
    };
  }, [goods.length, updatePagination]);

  if (isLoading) {
    return <p className={css.message}>Завантаження товарів...</p>;
  }

  if (isError) {
    return <p className={css.error}>Помилка завантаження: {error.message}</p>;
  }

  if (goods.length === 0) {
    return <p className={css.message}>Популярних товарів поки немає.</p>;
  }

  return (
    <section className={css.section} aria-labelledby="popular-products-title">
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title} id="popular-products-title">
            Популярні товари
          </h2>
          <Link href="/goods" className={css.allProducts}>
            Всі товари
          </Link>
        </div>

        <div className={css.sliderWrapper}>
          <div className={css.productsList} ref={sliderRef}>
            {goods.map((good) => (
              <article className={css.productCard} key={good._id}>
                <Link
                  href={`/goods/${good._id}`}
                  className={css.imageLink}
                  aria-label={good.name}
                >
                  <div className={css.imageWrapper}>
                    {good.image && (
                      <Image
                        src={good.image}
                        alt={good.name}
                        width={350}
                        height={420}
                        className={css.productImage}
                      />
                    )}
                  </div>
                </Link>
                <div className={css.productInfo}>
                  <div className={css.productDetails}>
                    <h3 className={css.productName}>{good.name}</h3>
                    <p className={css.price}>
                      {good.price.value} {good.price.currency}
                    </p>
                  </div>
                  <div className={css.rating}>
                    <span>{good.feedbacks?.length ?? 0} відгуків</span>
                  </div>
                  <Link
                    href={`/goods/${good._id}`}
                    className={css.detailsButton}
                  >
                    Детальніше
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className={`${css.arrow} ${css.prev}`}
            onClick={() => scrollToPage(activePage - 1)}
            disabled={activePage === 0}
            aria-label="Попередні товари"
          >
            ←
          </button>
          <button
            type="button"
            className={`${css.arrow} ${css.next}`}
            onClick={() => scrollToPage(activePage + 1)}
            disabled={activePage >= pageCount - 1}
            aria-label="Наступні товари"
          >
            →
          </button>
        </div>

        <div className={css.pagination}>
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              type="button"
              key={index}
              className={`${css.dot} ${
                activePage === index ? css.activeDot : ""
              }`}
              onClick={() => scrollToPage(index)}
              aria-label={`Сторінка ${index + 1}`}
              aria-current={activePage === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
