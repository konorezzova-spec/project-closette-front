"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Container from "@/components/Container/Container";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Good } from "@/types/good";
import css from "./PopularGoods.module.css";
import { fetchGoods } from "@/lib/api/clientApi";
import Link from "next/link";
import GoodsLists from "../GoodsLists/GoodsLists";

export default function PopularGoods() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["PopularGoods", { page: 1, perPage: 12 }],
    queryFn: () => fetchGoods({ page: 1, perPage: 12 }),
    retry: 1,
    placeholderData: keepPreviousData,
  });
  const goods: Good[] = data?.data?.goods ?? [];

  return (
    <Container id="goods" className={css.container}>
      <div className={css.header}>
        <h2>Популярні товари</h2>

        <Link href="/goods" className={css.header_link}>
          Всі товари
        </Link>
      </div>

      {isLoading && <Loader />}

      {isError && <ErrorMessage message={error.message} />}

      {goods.length > 0 && <GoodsLists goods={goods} />}

      {goods.length === 0 && <p>Товарів поки немає.</p>}
    </Container>
  );
}
