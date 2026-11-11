// components/BasketModal/BasketModal.tsx
'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBasketStore } from "@/lib/store/basketStore";
import css from './BasketModal.module.css';
import GoodsOrderList from '../GoodsOrderList/GoodsOrderList';

// TODO: додати після розробки 
// import MessageNoInfo from '../MessageNoInfo/MessageNoInfo';


// ! ------------------
// TODO: 1 Видалити після інтеграції з готовим компонентом MessageNoInfo

// Тимчасовий інтерфейс для сумісності з ТЗ
interface MessageNoInfoProps {
  message: string;
  btnText: string;
  href: string;
  onClose?: () => void;
}
// TODO: 2 Видалити після інтеграції з готовим компонентом MessageNoInfo

const MessageNoInfo = ({ message, btnText, href, onClose }: MessageNoInfoProps) => (
  <div className={css.emptyContainer}>
    <p className={css.emptyText}>{message}</p>
    <Link href={href} onClick={onClose} className={css.emptyBtn}>
      {btnText}
    </Link>
  </div>
);
// ! ------------------


export const BasketModal = () => {
  const router = useRouter();

  // Використовуємо стор
  const basketItems = useBasketStore(state => state.items);
  

  // const totalQuantity = 4; для тесту пустого кошика

  
  const totalQuantity = useMemo(() => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  }, [basketItems]); 

    const closeModal = () => router.back();

  //відключаю скролл на хедері block-scroll

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
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
            message="Ваш кошик порожній"
            btnText="До покупок"
            href="/goods"
            onClose={closeModal}
          />
         ): (
          <>
            <GoodsOrderList />

           <div className={css.actions}>
              <Link href="/goods" onClick={closeModal} className={css.continueLink}>
                Продовжити покупки
              </Link>
              <Link href="/order" onClick={closeModal} className={css.orderLink}>
                Оформити замовлення
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};