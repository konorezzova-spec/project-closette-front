"use client";

import css from "./GoodForPurchase.module.css";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Good, Size } from "@/types/good";
import { useBasketStore } from "@/lib/store/basketStore";
import Rating from "@/components/Rating/Rating";
import toast from "react-hot-toast";

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
  const [selectedSize, setSelectedSize] = useState<Size>(
    good.size.includes("L")?"L":good.size[0]
  );
  const [quantity, setQuantity] = useState<string>("1");
  const router = useRouter();
  const addItem = useBasketStore(state => state.addItem);

  const addToBasket = () => {
    const count = Number(quantity);

    if (!Number.isInteger(count) || count < 1) {
      toast.error("Вкажіть кількість: ціле число від 1");
      return;
    }

    addItem({
      id: good._id,
      name: good.name,
      image: good.image,
      size: selectedSize,
      price: good.price.value,
      rating: 3.5, // TODO: заменить на реальный рейтинг, когда он появится
      reviewsCount: good.feedbacks.length,
      quantity: count,
    });

    setQuantity("1");
    return true;
  };

  const handleAddToCart = () => { 
    if (addToBasket()) {
      toast.success(`"${good.name}" (${selectedSize}) додано в кошик`)
    }
  };

  const handleBuyNow = () => {
    if (addToBasket()) {
      router.push("/basket");
    }
  };

  // потім потрібно видалити
  const rating = 4.5;
  const reviewsCount = 12;
  const addItem = useBasketStore(state => state.addItem);
  const handleAddToCart = () => {
    addItem({
      id: good._id,
      name: good.name,
      image: good.image,
      price: good.price.value,
      size: selectedSize,
      quantity: Number(quantity),
      rating,
      reviewsCount,
    });
  };
  // ......

  return (
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
          <div className={css.priceRating}>
            <p className={css.price}>
              {good.price.value} {good.price.currency}
            </p>
            <span className={css.divider}></span>
            <Rating value={3.5} readOnly />
            <p className={css.reviewsInfo}>
              ({rating}) • {reviewsCount} відгуків
            </p>
          </div>
          <p className={css.prevDescription}>{good.prevDescription}</p>
          <div className={css.sizeSelector}>
            <p>Розмір</p>
            <div className={css.selectWrapper}>
              <select
                className={css.sizeSelect}
                value={selectedSize}
                onChange={event => setSelectedSize(event.target.value as Size)}
              >
                {good.size.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <span className={css.selectArrow}></span>
            </div>
            <div className={css.cartActions}>
              <button className={css.btn} type="button" onClick={handleAddToCart}>
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
            <button className={css.btn} type="button" onClick={handleBuyNow}>
              Купити зараз
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
  );
};

export default GoodForPurchase;
