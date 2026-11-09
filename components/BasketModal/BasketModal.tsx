// components/BasketModal/BasketModal.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import css from './BasketModal.module.css';

import { useOrderStore } from "@/lib/store/basketStore";

// Підключаємо іконки напряму з public (не працює)
/* import closeIcon from "/public/header/close.svg";
import commentIcon from "/public/basket/comment.svg";
import iconTrash from "/public/basket/iconTrash.svg";
import starBasket from "/public/basket/starBasket.svg"; */

interface BasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


export const BasketModal: React.FC<BasketModalProps> = ({ isOpen, onClose, children }) => {
  const router = useRouter();

  //  товари з Zustand
   const goodsOrderList = useOrderStore(
    state => state.draft.goodsOrderList
  );

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


// щоб не закривалась при кліку на неї
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} role="dialog" aria-modal="true">

        
        <div className={css.closeWrapper}>
          <button className={css.closeBtn} onClick={closeModal} aria-label="Закрити кошик">
            <svg viewBox="0 0 24 24" className={css.iconClose}>
              <path d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z" />
            </svg>
          </button>
        </div>

        <h2 className={css.title}>Ваш кошик</h2>


        {goodsOrderList.length === 0 ? (
          <div className={css.emptyContainer}>
            <p className={css.emptyText}>Ваш кошик порожній, мерщій до покупок!</p>
            <Link href="/goods" onClick={closeModal} className={css.emptyBtn}>
              До покупок
            </Link>
          </div>
        ) : (
         <>
        
        <div className={css.goodsList}>
          {goodsOrderList.map((item) => (
            <div key={item.goodId} className={css.card}>
              <div className={css.imageThumb}>
                {/* Заглушка зображення */}
                <Image
                  src="/images/hoodie-mock.jpg"
                  alt="Класичне худі Clothica"
                  fill
                  className={css.image}
                />
              </div>
              <div className={css.info}>
                <h3 className={css.goodsTitle}>Класичне худі Clothica</h3>
                <div className={css.rating}>
                  <svg className={css.iconStar} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00005 11.6279L4.89205 13.5024C4.78727 13.566 4.67822 13.5943 4.56488 13.5874C4.45166 13.5805 4.35083 13.5453 4.26238 13.4817C4.17394 13.4183 4.10827 13.3361 4.06538 13.2353C4.0226 13.1345 4.0136 13.0205 4.03838 12.8934L4.85905 9.35208L2.11788 6.96075C2.01833 6.87508 1.95755 6.77836 1.93555 6.67058C1.91355 6.56292 1.91633 6.45797 1.94388 6.35575C1.96877 6.25353 2.0261 6.16725 2.11588 6.09692C2.20555 6.02647 2.31394 5.98569 2.44105 5.97458L6.06555 5.65792L7.46955 2.31258C7.51933 2.19669 7.59466 2.11042 7.69555 2.05375C7.79633 1.99708 7.89783 1.96875 8.00005 1.96875C8.10227 1.96875 8.20377 1.99708 8.30455 2.05375C8.40544 2.11042 8.48077 2.19669 8.53055 2.31258L9.93455 5.65792L13.563 5.97458C13.6875 5.98569 13.7945 6.02647 13.8842 6.09692C13.974 6.16725 14.0313 6.25353 14.0562 6.35575C14.0838 6.45797 14.0865 6.56292 14.0645 6.67058C14.0425 6.77836 13.9818 6.87508 13.8822 6.96075L11.141 9.35208L11.9617 12.8934C11.9865 13.0205 11.9775 13.1345 11.9347 13.2353C11.8918 13.3361 11.8262 13.4183 11.7377 13.4817C11.6493 13.5453 11.5484 13.5805 11.4352 13.5874C11.3219 13.5943 11.2128 13.566 11.108 13.5024L8.00005 11.6279Z" />
                  </svg>
                  <span>5</span>

                  <svg className={css.iconComment} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.49973 9.33414H11.4997C11.6414 9.33414 11.7602 9.28591 11.8561 9.18947C11.9518 9.09314 11.9997 8.97369 11.9997 8.83114C11.9997 8.68869 11.9518 8.57025 11.8561 8.4758C11.7602 8.38136 11.6414 8.33414 11.4997 8.33414H4.49973C4.35807 8.33414 4.23934 8.38236 4.14357 8.4788C4.04768 8.57514 3.99973 8.69458 3.99973 8.83714C3.99973 8.97958 4.04768 9.09802 4.14357 9.19247C4.23934 9.28691 4.35807 9.33414 4.49973 9.33414ZM4.49973 7.16747H11.4997C11.6414 7.16747 11.7602 7.11925 11.8561 7.0228C11.9518 6.92647 11.9997 6.80702 11.9997 6.66447C11.9997 6.52202 11.9518 6.40358 11.8561 6.30913C11.7602 6.21469 11.6414 6.16747 11.4997 6.16747H4.49973C4.35807 6.16747 4.23934 6.21569 4.14357 6.31214C4.04768 6.40847 3.99973 6.52791 3.99973 6.67047C3.99973 6.81291 4.04768 6.93136 4.14357 7.0258C4.23934 7.12025 4.35807 7.16747 4.49973 7.16747ZM4.49973 5.0008H11.4997C11.6414 5.0008 11.7602 4.95258 11.8561 4.85614C11.9518 4.7598 11.9997 4.64036 11.9997 4.4978C11.9997 4.35536 11.9518 4.23691 11.8561 4.14247C11.7602 4.04802 11.6414 4.0008 11.4997 4.0008H4.49973C4.35807 4.0008 4.23934 4.04902 4.14357 4.14547C4.04768 4.2418 3.99973 4.36125 3.99973 4.5038C3.99973 4.64625 4.04768 4.76469 4.14357 4.85914C4.23934 4.95358 4.35807 5.0008 4.49973 5.0008ZM2.3689 12.1005C2.06223 12.1005 1.79634 11.9879 1.57123 11.7626C1.34601 11.5375 1.2334 11.2716 1.2334 10.965V2.36997C1.2334 2.06219 1.34601 1.79536 1.57123 1.56947C1.79634 1.34347 2.06223 1.23047 2.3689 1.23047H13.6306C13.9383 1.23047 14.2052 1.34347 14.4311 1.56947C14.6571 1.79536 14.7701 2.06219 14.7701 2.36997V13.4036C14.7701 13.6523 14.6527 13.825 14.4179 13.9216C14.1831 14.0184 13.9773 13.977 13.8004 13.7975L12.1034 12.1005H2.3689ZM12.5367 10.965L13.6306 12.1628V2.36997H2.3689V10.965H12.5367Z" />
                  </svg>
                  <span>2</span>
                </div>

                <p className={css.price}>1499 грн</p>
                <div className={css.controls}>
                  <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    className={css.quantityInput}
                    aria-label="Кількість товару"
                  />
                  <button className={css.deleteBtn} aria-label="Видалити товар">
                    <svg className={css.iconTrash} viewBox="0 0 17 19" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.836 18.4125C2.36183 18.4125 1.95842 18.2467 1.62575 17.9153C1.29308 17.5837 1.12675 17.1817 1.12675 16.7092V2.56075H0.85175C0.61125 2.56075 0.409167 2.4785 0.2455 2.314C0.0818335 2.1495 0 1.94642 0 1.70475C0 1.46308 0.0818335 1.2615 0.2455 1.1C0.409167 0.938333 0.61125 0.857501 0.85175 0.857501H4.957C4.957 0.613001 5.03892 0.408917 5.20275 0.24525C5.36642 0.0817499 5.56842 0 5.80875 0H10.9028C11.1431 0 11.3452 0.082917 11.509 0.24875C11.6727 0.41475 11.7545 0.617668 11.7545 0.857501H15.8658C16.1063 0.857501 16.3083 0.939751 16.472 1.10425C16.6357 1.26875 16.7175 1.47183 16.7175 1.7135C16.7175 1.95517 16.6357 2.15683 16.472 2.3185C16.3083 2.48 16.1063 2.56075 15.8658 2.56075H15.5908V16.7092C15.5908 17.1817 15.4244 17.5837 15.0918 17.9153C14.7591 18.2467 14.3557 18.4125 13.8815 18.4125H2.836ZM13.8815 2.56075H2.836V16.7092H13.8815V2.56075ZM6.26125 14.607C6.48892 14.607 6.67858 14.5299 6.83025 14.3758C6.98192 14.2214 7.05775 14.0326 7.05775 13.8092V5.42975C7.05775 5.20642 6.98017 5.01767 6.825 4.8635C6.66983 4.70917 6.48 4.632 6.2555 4.632C6.02583 4.632 5.83517 4.70917 5.6835 4.8635C5.53183 5.01767 5.456 5.20642 5.456 5.42975V13.8092C5.456 14.0326 5.53325 14.2214 5.68775 14.3758C5.84242 14.5299 6.03358 14.607 6.26125 14.607ZM10.4692 14.607C10.6941 14.607 10.8833 14.5299 11.037 14.3758C11.1907 14.2214 11.2675 14.0326 11.2675 13.8092V5.42975C11.2675 5.20642 11.1894 5.01767 11.032 4.8635C10.8771 4.70917 10.686 4.632 10.46 4.632C10.2338 4.632 10.0439 4.70917 9.89025 4.8635C9.73658 5.01767 9.65975 5.20642 9.65975 5.42975V13.8092C9.65975 14.0326 9.73842 14.2214 9.89575 14.3758C10.0531 14.5299 10.2443 14.607 10.4692 14.607Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      
             {/* Статичні блоки підсумків та кнопок, які відображаються завжди */}
        <div className={css.summaryContainer}>
          <div className={css.summaryRow}>
            <span className={css.summaryLabel}>Проміжний підсумок</span>
            <span className={css.summaryValue}>5 996 грн</span>
          </div>

          <div className={css.summaryRow}>
            <span className={css.summaryLabel}>Доставка</span>
            <span className={css.summaryValue}>За тарифами перевізника</span>
          </div>

          <div className={`${css.summaryRow} ${css.totalRow}`}>
            <span className={css.totalLabel}>Всього</span>
            <span className={css.totalValue}>5 996 грн</span>
          </div>
        </div>

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
  )};
