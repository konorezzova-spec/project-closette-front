"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBasketStore } from "@/lib/store/basketStore";
import css from "./BasketModal.module.css";
import GoodsOrderList from "../GoodsOrderList/GoodsOrderList";
import { MessageNoInfo } from "../MessageNoInfo/MessageNoInfo";


export const BasketModal = () => {
  const router = useRouter();

  const basketItems = useBasketStore(state => state.items);
  
  const totalQuantity = useMemo(() => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  }, [basketItems]); 

  const closeModal = () => router.back();
  const goToGoods = () => router.replace("/goods");

  //відключаю скролл на хедері block-scroll

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // ========= end block-scroll


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };


  return (

    <div className={css.backdrop} onClick={handleBackdropClick}>

      <div className={css.modal} role="dialog" aria-modal="true">
        <div className={css.closeWrapper}>
          <button className={css.closeBtn} onClick={closeModal} aria-label="Закрити кошик">
            <svg className={css.iconClose} width="24" height="24">
              <use href="/icons/sprite.svg#close" />
            </svg>
          </button>
        </div>

        <h2 className={css.title}>Ваш кошик</h2>

       {totalQuantity === 0 ? (
          <MessageNoInfo
            message="Ваш кошик порожній, мершій до покупок!"
            buttonText="До покупок"
            onClick={goToGoods}
          />
         ): (
          <>
            <GoodsOrderList />

           <div className={css.actions}>
              <Link href="/goods" replace className={css.continueLink}>
                Продовжити покупки
              </Link>
              <Link href="/order" replace className={css.orderLink}>
                Оформити замовлення
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};