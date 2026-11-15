
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Good } from "@/types/good";
import css from "./GoodsInfo.module.css";
import GoodInfo from "../GoodInfo/GoodInfo";

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
     {goods && (
  <ul>
    {goods.map((good) => (
      <li key={good._id}>
        <GoodInfo good={good} />
      </li>
    ))}
  </ul>
)}

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
