// import React, { useState } from "react";
// import { Rating } from "next-flex-rating";

// export default function ReviewForm() {
//   const [userRating, setUserRating] = useState(0);
//   return (
//     <div>
//       <h3>Rate This Product</h3>
//       <Rating
//         value={userRating}
//         size={48}
//         spacing={12}
//         color="#000000"
//         emptyColor="#CFD8DC"
//         onChange={setUserRating}
//       />
//       <p>Current rating: {userRating}</p>
//     </div>
//   );
// }

"use client";

import { Rating as FlexRating } from "next-flex-rating";

type RatingProps = {
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
};

const Rating = ({ value, onChange, readOnly = false }: RatingProps) => {
  return (
    <FlexRating
      value={value}
      size={24}
      spacing={4}
      color="#000000"
      emptyColor="#CFD8DC"
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

export default Rating;
