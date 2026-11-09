// components/BasketModal/BasketModal.tsx
'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useBasketStore } from "@/lib/store/basketStore";
import css from './BasketModal.module.css';

// TODO: Видалити після інтеграції з API каталогу
import { mockProductsCatalog } from '@/lib/mockData'; 

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
  
  // Використовуємо новий стор
  const basketItems = useBasketStore(state => state.items);
  const removeItem = useBasketStore(state => state.removeItem);
  const updateQuantity = useBasketStore(state => state.updateQuantity);

  const totalQuantity = useMemo(() => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  }, [basketItems]);

  const subtotal = useMemo(() => {
    return basketItems.reduce((total, item) => {
      // Шукаємо по item.id, а не item.goodId
      const product = mockProductsCatalog.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [basketItems]);

  const closeModal = () => router.back();

  //! відключаю скролл на хедері block-scroll

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
  // !========= end block-scroll


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  

  return (
   
    <div className={css.backdrop} onClick={handleBackdropClick}>
      
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
              <div className={css.goodsList}>
                {basketItems.map((item) => {
                  const product = mockProductsCatalog.find(p => p.id === item.id);
                  
                  if (!product) return null;

                  const uniqueKey = `${item.id}-${item.size}`;

                  return (
                    <div key={uniqueKey} className={css.card}>
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
                        
                      
                        {item.size && <p className={css.size}>Розмір: {item.size}</p>}
                        
                        <div className={css.rating}>
                          <svg className={css.iconStar} width="16" height="16">
                            <use href="/basket/sprite.svg#icon-star" />
                          </svg>
                          <span>{product.rating}</span>

                          <svg className={css.iconComment} width="16" height="16">
                            <use href="/basket/sprite.svg#icon-comment" />
                          </svg>
                          <span>{product.reviewsCount}</span>
                        </div>

                        <p className={css.price}>{product.price * item.quantity} грн</p>
                        
                        <div className={css.controls}>
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className={css.quantityInput}
                            aria-label="Кількість товару"
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value, 10);
                              if (!isNaN(newQuantity) && newQuantity > 0) {
                               
                                updateQuantity(item.id, item.size, newQuantity);
                              }
                            }}
                          />
                          <button 
                            className={css.deleteBtn} 
                            aria-label="Видалити товар" 
                           
                            onClick={() => removeItem(item.id, item.size)}
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
     
    </div>
     
  );
};