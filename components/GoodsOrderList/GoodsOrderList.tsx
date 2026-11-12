"use client";

import Image from "next/image";
import css from "./GoodsOrderList.module.css";
import type { OrderItem } from "@/types/order";
import { useBasketStore } from "@/lib/store/basketStore";

export default function GoodsOrderList() {
  const items = useBasketStore(state => state.items);
  const removeItem = useBasketStore(state => state.removeItem);
  const updateQuantity = useBasketStore(state => state.updateQuantity);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const delivery = 0;
  const total = subtotal + delivery;

  const handleQuantityChange = (item: OrderItem, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(item.id, item.size, quantity);
    }
  };

  const handleRemove = (item: OrderItem) => {
    removeItem(item.id, item.size);
  }

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {items.map(item => (
          <li key={`${item.id}-${item.size}`} className={css.item}>
            <Image
              src={item.image}
              alt={item.name}
              width={82}
              height={101}
              className={css.image}
            />
            <div className={css.content}>
              <div className={css.details}>
                <h3 className={css.name}>{item.name}</h3>
                <div className={css.meta}>
                  <span className={css.metaItem}>
                    <svg width="16" height="16" aria-hidden="true">
                      <use href="/icons/sprite.svg#star-filled" />
                    </svg>
                    {item.rating}
                  </span>
                  <span className={css.metaItem}>
                    <svg width="16" height="16" aria-hidden="true">
                      <use href="/icons/sprite.svg#comment" />
                    </svg>
                    {item.reviewsCount}
                  </span>
                  <span className={css.metaItem}>Розмір: {item.size}</span>
                </div>
              </div>
                <p className={css.price}>{item.price} грн</p>
             
              <div className={css.actions}>
                <input
                  className={css.quantity}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e=>handleQuantityChange(item, e.target.valueAsNumber)}
                  aria-label="Кількість товару"
                />
                <button
                  type="button"
                  className={css.deleteBtn}
                  onClick={()=>handleRemove(item)}
                  aria-label="Видалити товар з кошика"
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use href="/icons/sprite.svg#delete" />
                  </svg>
                </button>
              </div>
            </div>

          </li>
        ))}

      </ul>
      <dl className={css.summary}>
        <div className={css.row}>
          <dt>Проміжний підсумок</dt>
          <dd>{ subtotal} грн</dd>
        </div>
        <div className={css.row}>
          <dt>Доставка</dt>
          <dd>{delivery} грн</dd>
        </div>
        <div className={`${ css.row } ${css.total}`}>
          <dt>Всього</dt>
          <dd>{total} грн</dd>
        </div>
      </dl>
    </div>
  )
}