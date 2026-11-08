"use client";

import { useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";

import Container from "@/components/Container/Container";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Good } from "@/types/good";
import Image from "next/image";
import css from "./PopularGoods.module.css";
import { fetchGoods } from "@/lib/api/clientApi";

export default function PopularGoods() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["PopularGoods", { page: 1, perPage: 12 }],
    queryFn: () => fetchGoods({ page: 1, perPage: 12 }),
    retry: 1,
    placeholderData: keepPreviousData,
  });
  const goods: Good[] = data?.data?.goods ?? [];
  console.log("DATA:", data);
  console.log("GOODS:", goods);

  const handleSlideChange = (swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <Container>
      <div className="popularGoodsHeader">
        <h2>Популярні товари</h2>

        <button type="button">Всі товари</button>
      </div>

      {isLoading && <Loader />}

      {isError && <ErrorMessage message={error.message} />}

      {goods.length > 0 && (
        <>
          <Swiper
            modules={[Keyboard, A11y]}
            onSwiper={swiper => {
              swiperRef.current = swiper;
              handleSlideChange(swiper);
            }}
            onSlideChange={handleSlideChange}
            keyboard={{
              enabled: true,
            }}
            a11y={{
              prevSlideMessage: "Previous slide",
              nextSlideMessage: "Next slide",
            }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {goods.map(good => (
              <SwiperSlide key={good._id}>
                <Image
                  src={
                    good.image ||
                    "https://res.cloudinary.com/rvojizer/image/upload/v1793553598/Default_dish.webp"
                  }
                  alt="Good image"
                  className={css.image}
                  width="335"
                  height="413"
                ></Image>
                <div className={css.left_side}>
                  <p className={css.good_name}>{good.name}</p>
                </div>
                <div className={css.price}>
                  <p>{`${good.price.value} ${good.price.value}`}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="popularGoodsNavigation">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isBeginning}
              aria-label="Попередні товари"
            >
              ←
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isEnd}
              aria-label="Наступні товари"
            >
              →
            </button>
          </div>
        </>
      )}

      {goods.length === 0 && <p>Товарів поки немає.</p>}
    </Container>
  );
}
