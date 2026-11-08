
"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import css from "./PopularProducts.module.css";
import { fetchGoods } from "@/lib/api/clientApi";


export default function PopularProducts() {
  
 const { data, isLoading, isError, error } = useQuery({
  queryKey: ["goods", { page: 1, perPage: 12 }],
  queryFn: () => fetchGoods({ page: 1, perPage: 12 }),
});



const products = data?.data?.goods ?? [];

  const [activePage, setActivePage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updatePagination = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const page = Math.round(slider.scrollLeft / slider.clientWidth);
    setActivePage(page);
  };

  const getPageCount = () => {
    const slider = sliderRef.current;

    if (!slider || !slider.clientWidth) return 1;

    return Math.max(1, Math.ceil(slider.scrollWidth / slider.clientWidth));
  };

  const scrollToPage = (page: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollTo({
      left: page * slider.clientWidth,
      behavior: "smooth",
    });

    setActivePage(page);
  };

const formatPrice = (price: { value: number; currency: string }) =>
  new Intl.NumberFormat("uk-UA").format(price.value)

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>Популярні товари</h2>

          <Link href="/products" className={css.allProducts}>
            Всі товари
          </Link>
        </div>

                {isLoading && (
          <p className={css.message}>Завантаження товарів...</p>
        )}

        {isError && (
          <p className={css.error}>
            {error instanceof Error
              ? error.message
              : "Не вдалося завантажити товари"}
          </p>
        )}

        {!isLoading && !isError && products.length > 0 && (
          <>
            <div className={css.sliderWrapper}>
              <div
                className={css.productsList}
                ref={sliderRef}
                onScroll={updatePagination}
              >
                {products.map((product) => (
                  <article className={css.productCard} key={product._id}>
                    <Link
                      href={`/products/${product._id}`}
                      className={css.imageLink}
                    >
                     <div className={css.imageWrapper}>
  <Image
    src={product.image}
    alt={product.name}
    fill // 🟩
    sizes="(max-width: 768px) 100vw, 300px" // 🟩
    className={css.productImage}
  />
</div>
                    </Link>

                    <div className={css.productInfo}>
                      <div className={css.productTop}>
                        <div>
                          <h3 className={css.productName}>
                            {product.name}
                          </h3>
                          <p className={css.category}>
                            {product.category}
                          </p>
                        </div>

                        <p className={css.price}>
  {new Intl.NumberFormat("uk-UA").format(product.price.value)}{" "}
  {product.price.currency}
</p>
                      </div>

                      <div className={css.rating}>
                        <span className={css.stars}>
                          {"★".repeat(0)}
                        </span>

                        <span className={css.reviews}>
                          <span aria-hidden="true">▤</span>
                         {product.feedbacks?.length ?? 0}
                        </span>
                      </div>

                      <Link
                        href={`/products/${product._id}`}
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
                onClick={() =>
                  scrollToPage(Math.max(0, activePage - 1))
                }
                disabled={activePage === 0}
                aria-label="Попередні товари"
              >
                ←
              </button>

              <button
                type="button"
                className={`${css.arrow} ${css.next}`}
                onClick={() =>
                  scrollToPage(
                    Math.min(getPageCount() - 1, activePage + 1),
                  )
                }
                disabled={activePage >= getPageCount() - 1}
                aria-label="Наступні товари"
              >
                →
              </button>
            </div>

            <div className={css.pagination}>
              {Array.from({ length: getPageCount() }).map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`${css.dot} ${
                    activePage === index ? css.activeDot : ""
                  }`}
                  onClick={() => scrollToPage(index)}
                  aria-label={`Сторінка ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <p className={css.message}>
            Популярних товарів поки немає.
          </p>
        )}
      </div>
    </section>
  );
}