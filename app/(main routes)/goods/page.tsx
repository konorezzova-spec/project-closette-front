
"use client";

import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import css from "./PopularProducts.module.css";

import { fetchGoods, fetchCategories } from "@/lib/api/clientApi";
import type { Good } from "@/types/good";


import GoodsInfo from "@/components/GoodsInfo/GoodsInfo";

export default function GoodsPage() {

  const [category, setCategory] = useState("");
 const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [gender, setGender] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(10000);
  
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(1, 20),
  });

  const categories = categoriesData?.categories ?? [];

    const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "goods",
      category,
      selectedSizes,
      gender,
     appliedMaxPrice,
    ],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchGoods({
        page: pageParam,
        perPage: 12,
        ...(category && { category }),
         ...(selectedSizes.length > 0 && { size: selectedSizes }),
        ...(gender && { gender }),
        ...(appliedMaxPrice < 10000 && { maxPrice: appliedMaxPrice }), 
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.page < lastPage.data.totalPages
        ? lastPage.data.page + 1
        : undefined,
  });
  
  const goods: Good[] =
    data?.pages.flatMap((page) => page.data.goods) ?? [];

   const totalItems = data?.pages[0]?.data.totalItems ?? 0;

   const handleCategory = (name: string) => {
    const selectedCategory = categories.find(
      (item: { _id: string; name: string }) =>
        item.name.trim().toLowerCase() ===
        name.trim().toLowerCase()
    );

    setCategory(selectedCategory?._id ?? "");
  };

  // Очищення всіх фільтрів
  const clearAllFilters = () => {
    setCategory("");
    setSelectedSizes([]);
    setGender("");
    setMaxPrice(10000);
  };

  // Стани завантаження
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
          {/* FILTERS */}
          <aside className={css.sidebar}>
            <div className={css.filterHeader}>
              <h2>Фільтри</h2>

              <button
                type="button"
                onClick={clearAllFilters}
              >
                Очистити всі
              </button>
            </div>

            <p className={css.resultsCount}>
              Показано {goods.length} із {totalItems} товарів
            </p>

            {/* CATEGORY */}
            <section className={css.filterSection}>
              <ul className={css.filterList}>
                <li>
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                  >
                    Усі
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleCategory("Футболки та сорочки")
                    }
                  >
                    Футболки та сорочки
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleCategory("Штани та джинси")
                    }
                  >
                    Штани та джинси
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => handleCategory("Верхній одяг")}
                  >
                    Верхній одяг
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => handleCategory("Топи та майки")}
                  >
                    Топи та майки
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleCategory("Сукні та спідниці")
                    }
                  >
                    Сукні та спідниці
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleCategory("Домашній та спортивний одяг")
                    }
                  >
                    Домашній та спортивний одяг
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => handleCategory("Худі та кофти")}
                  >
                    Худі та кофти
                  </button>
                </li>
              </ul>
            </section>

            {/* SIZE */}
            <section className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Розмір</h3>

                <button
                  type="button"
                  onClick={() => setSelectedSizes([])}
                >
                  Очистити
                </button>
              </div>

             
<div className={css.checkboxList}>
  {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
    <label key={size}>
      <input
        type="checkbox"
        value={size}
        checked={selectedSizes.includes(size)}
        onChange={() =>
          setSelectedSizes((prev) =>
            prev.includes(size)
              ? prev.filter((item) => item !== size)
              : [...prev, size]
          )
        }
      />
      {size}
    </label>
  ))}
</div>

            </section>
            
            <section className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Ціна</h3>

                <button
                  type="button"
                  onClick={() => setMaxPrice(10000)}
                >
                  Очистити
                </button>
              </div>

              <div className={css.priceFilter}>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(Number(event.target.value))
                  }
                   onPointerUp={() => setAppliedMaxPrice(maxPrice)} 
      onTouchEnd={() => setAppliedMaxPrice(maxPrice)} 
      onKeyUp={() => setAppliedMaxPrice(maxPrice)} 
                />

                <div className={css.priceValues}>
                  <span>0</span>
                  <span>{maxPrice}</span>
                </div>
              </div>
            </section>

                       <section className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Стать</h3>

                <button
                  type="button"
                  onClick={() => setGender("")}
                >
                  Очистити
                </button>
              </div>

              <div className={css.checkboxList}>
                {[
                  { label: "Всі", value: "" },
                  { label: "Жіночий", value: "women" },
                  { label: "Чоловічий", value: "man" },
                  { label: "Унісекс", value: "unisex" },
                ].map((item) => (
                  <label key={item.value || "all"}>
                    <input
                      type="radio"
                      name="gender"
                      value={item.value}
                      checked={gender === item.value}
                      onChange={() => setGender(item.value)}
                    />

                    {item.label}
                  </label>
                ))}
              </div>
            </section>
          </aside>

                    <section className={css.productsSection}>
            <GoodsInfo
              goods={goods}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
