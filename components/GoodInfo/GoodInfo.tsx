import Image from "next/image";
import Link from "next/link";
import css from "./GoodInfo.module.css";
import { Good } from "@/types/good";

interface GoodInfoProps {
  good: Good;
  rating?: number;
}

export default function GoodInfo({ good, rating }: GoodInfoProps) {
  return (
    <>
      <div className={css.goods_info}>
        <div className={css.image_container}>
          <Image
            src={
              good.image ||
              "https://res.cloudinary.com/rvojizer/image/upload/v1793091224/default-avatar.jpg"
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
              <div className={css.svg_wrapper}>
                <svg
                  className={css.star}
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#star-filled" />
                </svg>

                <p>{rating ?? 5}</p>

                <svg
                  className={css.comment}
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#comment" />
                </svg>

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
      </div>
    </>
  );
}
