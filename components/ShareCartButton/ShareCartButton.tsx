"use client";

import toast from "react-hot-toast";
import { useBasketStore } from "@/lib/store/basketStore";
import css from "./ShareCartButton.module.css";

export default function ShareCartButton() {
  const items = useBasketStore(state => state.items);

  const handleShare = async () => {
    if (items.length === 0) {
      toast.error("Кошик порожній — нема чим ділитися");
      return;
    }

    const cart = items
      .map(item => `${item.id}-${item.size}-${item.quantity}`)
      .join(",");
    const url = `${window.location.origin}/order?${new URLSearchParams({ cart })}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Мій кошик у Clothica", url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Посилання скопійовано — надішліть його подрузі");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Не вдалося поділитися посиланням");
    }
  };

  return (
    <button type="button" className={css.button} onClick={handleShare}>
      Поділитися кошиком
    </button>
  );
}