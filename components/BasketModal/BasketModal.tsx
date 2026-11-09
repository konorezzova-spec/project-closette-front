// components/BasketModal/BasketModal.tsx
'use client';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import css from './BasketModal.module.css';
import { RemoveScroll } from 'react-remove-scroll';

import { useOrderStore } from "@/lib/store/basketStore";

// TODO: Видалити після інтеграції з API каталогу
import { mockProductsCatalog } from '@/lib/mockData';



// Окремий компонент для порожнього кошика
const MessageNoInfo = ({ onClose }: { onClose: () => void }) => (
  <div className={css.emptyContainer}>
    <p className={css.emptyText}>Ваш кошик порожній, мерщій до покупок!</p>
    <Link href="/goods" onClick={onClose} className={css.emptyBtn}>
      До покупок
    </Link>
  </div>
);

export const BasketModal = () => {
  const router = useRouter();

  const goodsOrderList = useOrderStore(state => state.draft.goodsOrderList);
  const deleteGood = useOrderStore(state => state.deleteGood);
  const updateQuantity = useOrderStore(state => state.updateQuantity);


  // 1. Рахуємо загальну кількість 
  const totalQuantity = useMemo(() => {
    return goodsOrderList.reduce((total, good) => total + good.quantity, 0);
  }, [goodsOrderList]);

  // Обчислення загальної суми з кешуванням
  const subtotal = useMemo(() => {
    return goodsOrderList.reduce((total, item) => {
      // TODO: Замінити mockProductsCatalog на реальні дані з глобального стору каталогу
      const product = mockProductsCatalog.find(p => p.id === item.goodId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [goodsOrderList]);

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // щоб модалка не закривалась при кліку на неї
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <RemoveScroll>
        <div className={css.modal} role="dialog" aria-modal="true">

          <div className={css.closeWrapper}>
            <button className={css.closeBtn} onClick={closeModal} aria-label="Закрити кошик">
             <svg className={css.iconClose} width="24" height="24">
    <use href="/basket/sprite.svg#icon-close" />
  </svg>
             
             
            </button>
          </div>

          <h2 className={css.title}>Ваш кошик</h2>

          {totalQuantity === 0 ? (
            <MessageNoInfo onClose={closeModal} />
          ) : (
            <>
            {/* Список товарів - рендериться ТІЛЬКИ якщо кошик не порожній */}
              <div className={css.goodsList}>
                {goodsOrderList.map((item) => {
                  const product = mockProductsCatalog.find(p => p.id === item.goodId);
                  
                  if (!product) return null;

                  return (
                    <div key={item.goodId} className={css.card}>
                      <div className={css.imageThumb}>
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className={css.image}
                        />
                      </div>
                      <div className={css.info}>
                        <h3 className={css.goodsTitle}>{product.title}</h3>
                        
                        <div className={css.rating}>
                            <svg className={css.iconStar} width="16" height="16">
                                <use href="/basket/sprite.svg#icon-star" />
                              </svg>
                          
                          <span>{product.reviewsCount}</span>
                          <svg className={css.iconComment} width="16" height="16">
                                <use href="/basket/sprite.svg#icon-comment" />
                              </svg>

                                             
                          <span>{product.reviewsCount}</span>
                        </div>

                        <p className={css.price}>{product.price * item.quantity} грн</p>
                        
                        <div className={css.controls}>
                          <input
                            type="number"
                            defaultValue={item.quantity}
                            min="1"
                            className={css.quantityInput}
                            aria-label="Кількість товару"
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value, 10);
                              if (!isNaN(newQuantity)) {
                                updateQuantity(item.goodId, newQuantity);
                              }
                            }}
                          />
                          <button
                          className={css.deleteBtn}
                          aria-label="Видалити товар"
                          onClick={() => deleteGood(item.goodId)}
                          >
                            <svg className={css.iconTrash} width="17" height="19">
                              <use href="/basket/sprite.svg#icon-trash" />
                            </svg>
                           
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={css.summaryContainer}>
                <div className={css.summaryRow}>
                  <span className={css.summaryLabel}>Проміжний підсумок</span>
                  <span className={css.summaryValue}>{subtotal} грн</span>
                </div>

                <div className={css.summaryRow}>
                  <span className={css.summaryLabel}>Доставка</span>
                  <span className={css.summaryValue}>За тарифами перевізника</span>
                </div>

                <div className={`${css.summaryRow} ${css.totalRow}`}>
                  <span className={css.totalLabel}>Всього</span>
                  <span className={css.totalValue}>{subtotal} грн</span>
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
      </RemoveScroll>
    </div>
  );
};