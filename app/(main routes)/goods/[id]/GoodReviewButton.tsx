"use client";

import GoodReviews from "@/components/GoodReviews/GoodReviews";
import { useState } from "react";

interface Props {
  productId: string;
}

export default function GoodReviewButton({ productId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Залишити відгук
      </button>
      {isOpen && (
        <GoodReviews
          productId={productId}
          onClose={() => setIsOpen(false)}
          onSuccess={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
