"use client";
import css from "./Rating.module.css";

type RatingProps = {
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
};

const Rating = ({ value, onChange, readOnly = false }: RatingProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;

    let icon = "star";

    if (value >= starNumber) {
      icon = "star-filled";
    } else if (value >= starNumber - 0.5) {
      icon = "star-half";
    }

    return (
      <button
        key={starNumber}
        type="button"
        className={css.starButton}
        disabled={readOnly || !onChange}
        onClick={() => onChange?.(starNumber)}
        aria-label={`${starNumber} з 5`}
      >
        <svg className={css.starIcon} viewBox="0 0 24 24">
          <use href={`/icons/sprite.svg#${icon}`} />
        </svg>
      </button>
    );
  });

  return <div className={css.rating}>{stars}</div>;
};

export default Rating;
