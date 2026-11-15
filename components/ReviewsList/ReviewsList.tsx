"use client";

import { useRef, useState } from "react";
import { Keyboard, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import { Feedback } from "../../types/feedback";
import Rating from "../Rating/Rating";

import "swiper/css";
import css from "./ReviewsList.module.css";

const MAX_REVIEWS = 10;

type ReviewsListProps = {
  reviews?: Feedback[];
  title?: string;
  showButton?: boolean;
  onLeaveReview?: () => void;
};

export default function ReviewsList({
  reviews = [],
  title = "Відгуки клієнтів",
  showButton = true,
  onLeaveReview,
}: ReviewsListProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const items = reviews.slice(0, MAX_REVIEWS);
  const isEmpty = items.length === 0;

  const syncState = (swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className={css.reviewsSection}>
      <div className={`${css.headerWrapper} ${isEmpty ? css.headerEmpty : ""}`}>
        <h2 className={css.title}>{title}</h2>
        {showButton && (
          <button
            type="button"
            className={css.reviewButton}
            onClick={onLeaveReview}
          >
            Залишити відгук
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className={css.emptyContainer}>
          <p className={css.emptyText}>У цього товару ще немає відгуків</p>
          <button
            type="button"
            className={`${css.reviewButton} ${css.emptyButton}`}
            onClick={onLeaveReview}
          >
            Залишити відгук
          </button>
        </div>
      ) : (
        <div className={css.swiperContainer}>
          <Swiper
            modules={[Keyboard, A11y]}
            onSwiper={swiper => {
              swiperRef.current = swiper;
              syncState(swiper);
            }}
            onSlideChange={syncState}
            onBreakpoint={syncState}
            onResize={syncState}
            keyboard={{ enabled: true }}
            a11y={{
              prevSlideMessage: "Попередній відгук",
              nextSlideMessage: "Наступний відгук",
            }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1440: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className={css.swiper}
          >
            {items.map(review => (
              <SwiperSlide key={review._id || review.id} className={css.slide}>
                <div className={css.reviewCard}>
                  <Rating value={review.rating} readOnly />
                  <p className={css.reviewText}>
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <h4 className={css.author}>{review.author || review.name}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.navigationWrapper}>
            <button
              type="button"
              className={css.navButton}
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Попередній відгук"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={css.navButton}
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Наступний відгук"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
