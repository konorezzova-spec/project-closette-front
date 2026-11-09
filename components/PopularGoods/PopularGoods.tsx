"use client";

import { useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, A11y, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";

import Container from "@/components/Container/Container";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Good } from "@/types/good";
import Image from "next/image";
import css from "./PopularGoods.module.css";
import { fetchGoods } from "@/lib/api/clientApi";
import Link from "next/link";
import star from "/public/star-filled.svg";
import comment from "/public/comment.svg";
import right from "/public/arrow_forward.svg";
import left from "/public/arrow_back.svg";

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
    <Container className={css.container}>
      <div className={css.header}>
        <h2>Популярні товари</h2>

        <Link href="/goods" className={css.header_link}>
          Всі товари
        </Link>
      </div>

      {isLoading && <Loader />}

      {isError && <ErrorMessage message={error.message} />}

      {goods.length > 0 && (
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
                <div className={css.image_container}>
                  <Image
                    src={
                      good.image ||
                      "https://res.cloudinary.com/rvojizer/image/upload/v1793553598/Default_dish.webp"
                    }
                    alt={good.name}
                    className={css.image}
                    fill
                    sizes="(min-width: 1440px) 25vw, (min-width: 768px) 50vw, 100vw"
                  ></Image>
                </div>
                <div className={css.lower_group}>
                  <div className={css.bottom}>
                    <div className={css.left_side}>
                      <p className={css.good_name}>{good.name}</p>
                      <div className={css.img_wrapper}>
                        <Image
                          src={star}
                          alt="Rating"
                          className={css.image}
                          width={16}

                          height={16}
                        ></Image>
                        <p>{5}</p>
                        <Image
                          src={comment}
                          alt="Comments"
                          className={css.image}
                          width={16}

                          height={16}
                        ></Image>
                        <p>{good.feedbacks.length}</p>
                      </div>
                    </div>
                    <div className={css.price}>
                      <p>{`${good.price.value} ${good.price.currency}`}</p>
                    </div>
                  </div>
                  <Link className={css.detale} href={`/goods/${good._id}`}>
                    Детальніше
                  </Link>
                </div>
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
                alt="Comments"
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
                alt="Comments"
                className={css.image}
                width={24}

                height={24}
              ></Image>
            </button>
          </div>
        </>
      )}

      {goods.length === 0 && <p>Товарів поки немає.</p>}
    </Container>
  );
}
