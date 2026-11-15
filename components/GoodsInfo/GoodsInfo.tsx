
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Good } from "@/types/good";
import css from "./GoodsInfo.module.css";

interface GoodsInfoProps {
  goods: Good[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function GoodsInfo({
  goods,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: GoodsInfoProps) {
  if (goods.length === 0) {
    return <p>Товарів поки немає.</p>;
  }

  return (
    <>
      <div className={css.productsGrid}>
        {goods.map((good) => (
          <article key={good._id} className={css.productCard}>
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
                  loading="eager"
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
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Завантаження..."
              : "Показати більше"}
          </button>
        </div>
      )}
    </>
  );
}
