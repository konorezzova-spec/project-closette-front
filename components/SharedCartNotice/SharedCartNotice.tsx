"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchGoodById } from "@/lib/api/clientApi";
import { useBasketStore } from "@/lib/store/basketStore";
import type { Size } from "@/types/good";
import type { OrderItem } from "@/types/order";
import css from "./SharedCartNotice.module.css";

const SIZES: Size[] = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const MAX_SHARED_ITEMS = 20;

type SharedPosition = { id: string; size: Size; quantity: number };

// "id-M-2,id-L-1" → [{ id, size: "M", quantity: 2 }, ...]
// Усе, що не схоже на правильну позицію, відкидаємо
const parseCart = (cart: string | null): SharedPosition[] => {
  if (!cart) return [];

  return cart
    .split(",")
    .slice(0, MAX_SHARED_ITEMS)
    .map(part => {
      const [id, size, quantity] = part.split("-");
      return { id, size: size as Size, quantity: Number(quantity) };
    })
    .filter(
      ({ id, size, quantity }) =>
        /^[a-f\d]{24}$/i.test(id) &&
        SIZES.includes(size) &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 99
    );
};

export default function SharedCartNotice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addItem = useBasketStore(state => state.addItem);

  const positions = parseCart(searchParams.get("cart"));

  const { data: sharedItems = [], isPending } = useQuery({
    queryKey: ["sharedCart", positions],
    enabled: positions.length > 0,
    queryFn: async (): Promise<OrderItem[]> => {
      const results = await Promise.allSettled(
        positions.map(position => fetchGoodById(position.id))
      );

      return results.flatMap((result, index) => {
        const { size, quantity } = positions[index];

        // Товар видалили або розміру більше немає — пропускаємо
        if (result.status === "rejected" || !result.value.size.includes(size)) {
          return [];
        }

        const good = result.value;
        return [
          {
            id: good._id,
            name: good.name,
            image: good.image,
            size,
            price: good.price.value,
            rating: good.rating,
            reviewsCount: good.reviewsCount,
            quantity,
          },
        ];
      });
    },
  });

  const closeNotice = () => router.replace("/order", { scroll: false });

  const handleAdd = () => {
    sharedItems.forEach(item => addItem(item));
    toast.success("Товари додано у ваш кошик");
    closeNotice();
  };

  if (positions.length === 0) return null;

  if (isPending) {
    return <p className={css.notice}>Завантажуємо кошик, яким з вами поділилися…</p>;
  }

  if (sharedItems.length === 0) {
    return (
      <div className={css.notice}>
        <p>На жаль, товарів із цього посилання вже немає в наявності.</p>
        <button type="button" className={css.secondary} onClick={closeNotice}>
          Закрити
        </button>
      </div>
    );
  }

  const total = sharedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={css.notice}>
      <p className={css.title}>З вами поділилися кошиком</p>

      <ul className={css.list}>
        {sharedItems.map(item => (
          <li key={`${item.id}-${item.size}`}>
            {item.name} · {item.size} × {item.quantity}
          </li>
        ))}
      </ul>

      <p>Разом: {total} грн</p>

      <div className={css.actions}>
        <button type="button" className={css.primary} onClick={handleAdd}>
          Додати в мій кошик
        </button>
        <button type="button" className={css.secondary} onClick={closeNotice}>
          Ні, дякую
        </button>
      </div>
    </div>
  );
}