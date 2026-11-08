
"use client";

import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./PopularProducts.module.css";
import { fetchGoods } from "@/lib/api/clientApi";
import type { Good } from "@/types/good";

export default function GoodsPage() {
  
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["goods"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchGoods({
        page: pageParam,
        perPage: 12,
      }),
    getNextPageParam: (lastPage) =>
  lastPage.data.page < lastPage.data.totalPages
    ? lastPage.data.page + 1
    : undefined,
  });

   const goods: Good[] =
    data?.pages.flatMap((page) => page.data.goods) ?? [];

const totalItems = data?.pages[0]?.data.totalItems ?? 0;

  if (isLoading) {
    return <p>Завантаження товарів...</p>;
  }

  if (isError) {
    return <p>Помилка завантаження: {error.message}</p>;
  }

  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Всі товари</h1>

        <div className={css.catalog}>
          <aside className={css.sidebar}>
            <div className={css.filterHeader}>
              <h2>Фільтри</h2>
              <button type="button">Очистити всі</button>
            </div>

            <p className={css.resultsCount}>
              Показано {goods.length} із {totalItems} товарів
            </p>

            <section className={css.filterSection}>
              <h3>Категорії</h3>

              <ul className={css.filterList}>
                <li><button type="button">Усі</button></li>
                <li><button type="button">Футболки та сорочки</button></li>
                <li><button type="button">Штани та джинси</button></li>
                <li><button type="button">Верхній одяг</button></li>
                <li><button type="button">Топи та майки</button></li>
                <li><button type="button">Сукні та спідниці</button></li>
                <li><button type="button">Домашній та спортивний одяг</button></li>
                <li><button type="button">Худі та кофти</button></li>
              </ul>
            </section>

            <section className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Розмір</h3>
                <button type="button">Очистити</button>
              </div>

              <div className={css.checkboxList}>
                {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(
                  (size) => (
                    <label key={size}>
                      <input type="checkbox" value={size} />
                      {size}
                    </label>
                  )
                )}
              </div>
            </section>

            <section className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Ціна</h3>
                <button type="button">Очистити</button>
              </div>

              <div className={css.priceFilter}>
                <input type="range" min="0" max="100" />

                <div className={css.priceValues}>
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </section>

            <section className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Стать</h3>
                <button type="button">Очистити</button>
              </div>

              <div className={css.checkboxList}>
                {["Всі", "Жіночий", "Чоловічий", "Унісекс"].map(
                  (gender) => (
                    <label key={gender}>
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                      />
                      {gender}
                    </label>
                  )
                )}
              </div>
            </section>
          </aside>

          <section className={css.productsSection}>
            {goods.length === 0 ? (
              <p>Товарів поки немає.</p>
            ) : (
              <>
                <div className={css.productsGrid}>
                  {goods.map((good) => (
                    <article
                      key={good._id}
                      className={css.productCard}
                    >
                      <Link
                        href={`/goods/${good._id}`}
                        className={css.imageWrapper}
                      >
                        {good.image && (
                          <Image
                            src={good.image}
                            alt={good.name}
                            width={350}
                            height={350}
                            className={css.productImage}
                          />
                        )}
                      </Link>

                      <div className={css.productInfo}>
                        <div className={css.productDetails}>
                          <h3 className={css.productName}>
                            {good.name}
                          </h3>

                          <p className={css.price}>
                            {good.price.value} {good.price.currency}
                          </p>
                        </div>

                        <div className={css.rating}>
                          <span>★</span>
                          <span>
                            {good.feedbacks?.length ?? 0} відгуків
                          </span>
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
               
                {hasNextPage && (
                  <div className={css.loadMoreWrapper}>
                    <button
                      type="button"
                      className={css.loadMoreButton}
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage
                        ? "Завантаження..."
                        : "Показати більше"}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
