"use client";

import css from "./GoodForPurchase.module.css";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useState } from "react";
import type { Good } from "@/types/good";

const splitDescription = (description: string) => {
  const sentences = description.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

  const paragraphs = [];

  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join(" "));
  }

  return paragraphs;
};

type GoodForPurchaseProps = {
  good: Good;
};

const GoodForPurchase = ({ good }: GoodForPurchaseProps) => {
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState<string>("1");

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.thumb}>
            <Image
              className={css.img}
              src={good.image}
              alt={good.name}
              width={640}
              height={700}
            />
          </div>

          <div className={css.wrapper}>
            <Breadcrumbs productName={good.name} />
            <h3 className={css.title}>{good.name}</h3>
            <p className={css.price}>
              {good.price.value}
              {good.price.currency}
            </p>
            <p className={css.prevDescription}>{good.prevDescription}</p>
            <div className={css.sizeSelector}>
              <p>Розмір</p>
              <div className={css.selectWrapper}>
                <select
                  className={css.sizeSelect}
                  value={selectedSize}
                  onChange={event => setSelectedSize(event.target.value)}
                >
                  {good.size.map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <span className={css.selectArrow}></span>
              </div>
            </div>
            <div className={css.cartActions}>
              {/* <button type="button" onClick={handleAddToCart}></button> */}
              <button className={css.btn} type="button">
                Додати в кошик
              </button>
              <div className={css.quantity}>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <button className={css.btn} type="button">
              Купити зараз
            </button>
            <p className={css.delivery}>
              Безкоштовна доставка для замовлень від 1000 грн
            </p>
            <p className={css.descrpt}>Опис</p>
            {/* <p className={css.description}>{mockGood.description}</p> */}
            <div className={css.description}>
              {splitDescription(good.description).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p>Основні характеристики</p>
            <ul className={css.characteristics}>
              {good.characteristics.map(characteristic => (
                <li key={characteristic}>{characteristic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GoodForPurchase;
