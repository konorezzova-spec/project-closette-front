import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchCategories, fetchGoods } from "@/lib/api/serverApi";
import GoodsPageClient from "./GoodsPage.client";
import type { GoodsFilters } from "@/types/filters";

interface GoodPageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    size?: string | string[];
    gender?: string;
    maxPrice?: string;
  }>;
}

export default async function GoodPage({
  params,
  searchParams,
}: GoodPageProps) {
  const { slug } = await params;
  const search = await searchParams;

  const category = slug[0] === "all" ? undefined : slug[0];

  const size = search.size
    ? Array.isArray(search.size)
      ? search.size
      : [search.size]
    : [];

  const gender = search.gender || undefined;

  const parsedMaxPrice = Number(search.maxPrice);

  const maxPrice =
    search.maxPrice &&
    Number.isFinite(parsedMaxPrice) &&
    parsedMaxPrice >= 0 &&
    parsedMaxPrice <= 10000
      ? parsedMaxPrice
      : undefined;

  const categoriesRow = await fetchCategories(1, 20);
  const categories = categoriesRow.categories ?? [];

  const queryClient = new QueryClient();

  const filters: GoodsFilters = {
    category,
    size,
    gender,
    maxPrice,
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["Goods", filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchGoods({
        page: pageParam,
        perPage: 12,
        ...filters,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodsPageClient categories={categories} initialFilters={filters} />
    </HydrationBoundary>
  );
}
