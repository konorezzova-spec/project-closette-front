"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, A11y, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import right from "/public/arrow_forward.svg";
import left from "/public/arrow_back.svg";
import css from "./GoodsLists.module.css";
import { Good } from "@/types/good";
import GoodInfo from "@/components/GoodInfo/GoodInfo";

interface GoodsListsProps {
  goods: Good[];
}

export default function GoodsLists({ goods }: GoodsListsProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
    <>
      <Swiper
        modules={[Keyboard, A11y, Pagination]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
          handleSlideChange(swiper);
        }}
        onSlideChange={handleSlideChange}
        keyboard={{ enabled: true }}
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
            <GoodInfo good={good} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.popularGoodsNavigation}>
        <button
          type="button"
          className={css.btn_left}
          onClick={handlePrev}
          disabled={isBeginning}
          aria-label="Previous goods"
        >
          <Image
            src={left}
            alt="Previous goods"
            className={css.image}
            width={24}
            height={24}
          ></Image>
        </button>

        <button
          type="button"
          className={css.btn_right}
          onClick={handleNext}
          disabled={isEnd}
          aria-label="Next goods"
        >
          <Image
            src={right}
            alt="Next goods"
            className={css.image}
            width={24}
            height={24}
          ></Image>
        </button>
      </div>
    </>
  );
}
