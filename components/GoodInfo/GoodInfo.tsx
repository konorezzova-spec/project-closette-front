import Image from "next/image";
import Link from "next/link";
import css from "./GoodInfo.module.css";
import { Good } from "@/types/good";

interface GoodInfoProps {
  good: Good;
}

export default function GoodInfo({ good }: GoodInfoProps) {
  return (
    <>
      {" "}
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
              <span className={css.star}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/icons/sprite.svg#star-filled" />
                </svg>
              </span>
              <p>{5}</p>
              <span className={css.comment}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/icons/sprite.svg#comment" />
                </svg>
              </span>
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
    </>
  );
}
