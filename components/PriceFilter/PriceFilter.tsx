"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./PriceFilter.module.css";

interface PriceFilterProps {
  initialValue: number;
}

export default function PriceFilter({ initialValue }: PriceFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePrice = useDebouncedCallback((price: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (price < 10000) {
      params.set("maxPrice", String(price));
    } else {
      params.delete("maxPrice");
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, 200);

  // Синхронізація з URL

  const [maxPrice, setMaxPrice] = useState(initialValue);
  const [previousInitialValue, setPreviousInitialValue] =
    useState(initialValue);

  if (initialValue !== previousInitialValue) {
    setPreviousInitialValue(initialValue);
    setMaxPrice(initialValue);
    updatePrice.cancel();
  }

  const handlePriceChange = (value: number) => {
    setMaxPrice(value);
    updatePrice(value);
  };

  return (
    <div>
      <label htmlFor="price">Максимальна ціна: {maxPrice} грн</label>

      <input
        id="price"
        type="range"
        className={css.input}
        min={0}
        max={10000}
        step={100}
        value={maxPrice}
        style={
          {
            "--progress": `${(maxPrice / 10000) * 100}%`,
          } as React.CSSProperties
        }
        onChange={event => handlePriceChange(Number(event.target.value))}
      />
    </div>
  );
}
