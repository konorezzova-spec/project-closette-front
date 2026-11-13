// "use client";

// import { Rating as FlexRating } from "next-flex-rating";

// type RatingProps = {
//   value: number;
//   onChange?: (rating: number) => void;
//   readOnly?: boolean;
// };

// const ThumbIcon = () => (
//   <svg
//     id="star"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//   >
//     <path
//       d="M12.0001 17.4425L7.33807 20.2542C7.18091 20.3496 7.01732 20.3921 6.84732 20.3817C6.67749 20.3714 6.52624 20.3186 6.39357 20.2232C6.26091 20.1281 6.16241 20.0048 6.09807 19.8535C6.03391 19.7023 6.02041 19.5314 6.05757 19.3407L7.28857 14.0287L3.17682 10.4417C3.02749 10.3132 2.93632 10.1682 2.90332 10.0065C2.87032 9.84499 2.87449 9.68757 2.91582 9.53423C2.95316 9.3809 3.03916 9.25149 3.17382 9.14599C3.30832 9.04032 3.47091 8.97915 3.66157 8.96248L9.09832 8.48748L11.2043 3.46949C11.279 3.29565 11.392 3.16623 11.5433 3.08123C11.6945 2.99623 11.8467 2.95374 12.0001 2.95374C12.1534 2.95374 12.3057 2.99623 12.4568 3.08123C12.6082 3.16623 12.7212 3.29565 12.7958 3.46949L14.9018 8.48748L20.3446 8.96248C20.5312 8.97915 20.6918 9.04032 20.8263 9.14599C20.961 9.25149 21.047 9.3809 21.0843 9.53423C21.1257 9.68757 21.1298 9.84499 21.0968 10.0065C21.0638 10.1682 20.9727 10.3132 20.8233 10.4417L16.7116 14.0287L17.9426 19.3407C17.9797 19.5314 17.9662 19.7023 17.9021 19.8535C17.8377 20.0048 17.7392 20.1281 17.6066 20.2232C17.4739 20.3186 17.3227 20.3714 17.1528 20.3817C16.9828 20.3921 16.8192 20.3496 16.6621 20.2542L12.0001 17.4425Z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const Rating = ({ value, onChange, readOnly = false }: RatingProps) => {
//   return (
//     <FlexRating
//       value={value}
//       size={24}
//       spacing={4}
//       icon={<ThumbIcon />}
//       emptyIcon={<ThumbIcon />}
//       color="#000000"
//       emptyColor="#CFD8DC"
//       onChange={onChange}
//       readOnly={readOnly}
//     />
//   );
// };

// export default Rating;

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
