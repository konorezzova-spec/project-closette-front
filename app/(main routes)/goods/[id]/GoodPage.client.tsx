"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchGoodById } from "@/lib/api/clientApi";

import css from "./GoodPage.client.module.css";
import GoodForPurchase from "./GoodForPurchase/GoodForPurchase";

const GoodPageClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: good,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["good", id],
    queryFn: () => fetchGoodById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !good) return <p>Something went wrong.</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        {/* <GoodGallery good={good} /> */}
        <GoodForPurchase good={good} />
        {/* <GoodReviews /> */}
      </div>
    </main>
  );
};

export default GoodPageClient;
