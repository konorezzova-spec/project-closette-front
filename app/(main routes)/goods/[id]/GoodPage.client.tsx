"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchGoodById } from "@/lib/api/clientApi";
import Image from "next/image";

import css from "./GoodPage.client.module.css";

const mockGood = {
  _id: "6877b9f116ae59c7b60d0107",
  name: "Світшот 'Minimal Black'",
  category: "690c9ce6a6276289c98fc00c",
  image: "https://ftp.goit.study/img/goods/6877b9f116ae59c7b60d0107.webp",
  price: {
    value: 1299,
    currency: "грн",
  },
  size: ["XL", "XS", "S", "M", "L", "XXL"],
  description:
    "Світшот Minimal Black — втілення стриманості та універсальності. Його дизайн побудований на простоті: глибокий чорний колір, акуратний круглий виріз і прямий крій. Тканина — м’який трикотаж із високим вмістом бавовни, що забезпечує комфорт у щоденному носінні. Завдяки універсальному стилю цей світшот легко поєднується як зі спортивним одягом, так і з джинсами чи навіть класичними брюками. Його можна використовувати як базовий шар під куртку або носити самостійно. Модель не має зайвих деталей, проте саме ця мінімалістичність робить її актуальною та довговічною. Minimal Black — це стильний вибір для тих, хто цінує простоту й практичність.",
  feedbacks: ["690ddbe1a6276289c98fd001", "690ddbe1a6276289c98fd002"],
  prevDescription:
    "Світшот 'Minimal Black' — втілення стриманості. Глибокий чорний колір, акуратний крій та м'яка тканина (трикотаж з високим вмістом бавовни) забезпечують комфорт. Ця базова річ універсальна: пасує до джинсів, спортивного одягу чи класичних брюк. Ідеальний вибір.",
  gender: "unisex",
  characteristics: [
    "Матеріал: 80% бавовна, 20% поліестер",
    "Крій: прямий",
    "Горловина: круглий виріз",
    "Сезон: Осінь/Зима/Весна",
  ],
};

const GoodForPurchase = () => {
  const { id } = useParams<{ id: string }>();

  // const {
  //   data: mockGood,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["mockGood", id],
  //   queryFn: () => fetchGoodById(id),
  //   refetchOnMount: false,
  // });

  // if (isLoading) return <p>Loading, please wait...</p>;

  // if (error || !mockGood) return <p>Something went wrong.</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <Image className={css.img}
            src={mockGood.image}
            alt={mockGood.name}
            width={640}
            height={700}
          />
          <h3>{mockGood.name}</h3>
          <p className={css.price}>
            {mockGood.price.value}
            {mockGood.price.currency}
          </p>
          <p className={css.prevDescription}>{mockGood.prevDescription}</p>
          {/* форма вибору розміру */}
          {/* Button: Додати в кошик + форма кількості товару */}
          {/* Button: Купити зараз */}
          <p>Безкоштовна доставка для замовлень від 1000 грн</p>
          <p className={css.description}>{mockGood.description}</p>
          <ul className={css.characteristics}>
            {mockGood.characteristics.map(characteristic => (
              <li key={characteristic}>{characteristic}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default GoodForPurchase;
