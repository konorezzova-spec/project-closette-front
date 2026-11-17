"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import css from "./GoodsPage.module.css";
import { fetchGoods } from "@/lib/api/clientApi";
import type { Good } from "@/types/good";
import type { Category } from "@/types/category";
import GoodsInfo from "@/components/GoodsInfo/GoodsInfo";
import Container from "@/components/Container/Container";
// import Link from "next/link";
// import PriceFilter from "@/components/PriceFilter/PriceFilter";
import { GoodsFilters } from "@/types/filters";
import GoodsFilter from "@/components/GoodsFilter/GoodsFilter";

interface GoodsPageClientProps {
  categories: Category[];
  initialFilters: GoodsFilters;
}

export default function GoodsPageClient({
  categories,
  initialFilters,
}: GoodsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Фільтри з URL
  const selectedSizes = searchParams.getAll("size");
  const gender = searchParams.get("gender") ?? "";

  // Ціна з URL
  const maxPriceParam = searchParams.get("maxPrice");
  const parsedMaxPrice = Number(maxPriceParam);

  const maxPriceFromUrl =
    maxPriceParam &&
    Number.isFinite(parsedMaxPrice) &&
    parsedMaxPrice >= 0 &&
    parsedMaxPrice <= 10000
      ? parsedMaxPrice
      : 10000;

  // Оновлення URL
  const updateParams = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);

    if (Array.isArray(value)) {
      value.forEach(item => params.append(key, item));
    } else if (value) {
      params.set(key, value);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  // Зміна розміру
  const handleSizeChange = (size: string) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(item => item !== size)
      : [...selectedSizes, size];

    updateParams("size", updatedSizes);
  };

  // Зміна статі
  const handleGenderChange = (value: string) => {
    updateParams("gender", value);
  };

  // Очищення всіх фільтрів
  const clearAllFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  // Параметри фільтрації
  const filters: GoodsFilters = {
    category: initialFilters.category,
    size: selectedSizes,
    gender: gender || undefined,
    maxPrice: maxPriceFromUrl < 10000 ? maxPriceFromUrl : undefined,
  };

  // Завантаження товарів
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["Goods", filters],
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    retry: 1,
    queryFn: ({ pageParam }) =>
      fetchGoods({
        page: pageParam,
        perPage: 12,
        ...filters,
      }),
    getNextPageParam: lastPage =>
      lastPage.data.page < lastPage.data.totalPages
        ? lastPage.data.page + 1
        : undefined,
  });

  // Усі завантажені товари
  const goods: Good[] = data?.pages.flatMap(page => page.data.goods) ?? [];

  // Загальна кількість товарів
  const totalItems = data?.pages[0]?.data.totalItems ?? 0;

  return (
    <Container className={css.section}>
      <h1 className={css.title}>Всі товари</h1>
      <div className={css.container}>
        <GoodsFilter
          clearAllFilters={clearAllFilters}
          goods={goods}
          totalItems={totalItems}
          categories={categories}
          selectedSizes={selectedSizes}
          maxPriceFromUrl={maxPriceFromUrl}
          gender={gender}
          updateParams={updateParams}
          handleSizeChange={handleSizeChange}
          handleGenderChange={handleGenderChange}
        />
        <div className={css.productsSection}></div>
        {isLoading && <p>Завантаження товарів...</p>}
        {isError && <p>Помилка завантаження: {error.message}</p>}
        {goods.length > 0 && (
          <GoodsInfo
            goods={goods}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </Container>
  );
}
