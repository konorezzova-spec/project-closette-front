import css from "./Hero.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import Link from "next/link";

// добавить мягкие эфекты при наведению на кнопки кубик бизер

export default function Hero() {
  return (
    <Container id="hero" className={css.hero__container}>
      <div className={css.hero__content}>
        <div className={css.hero__left}>
          <h1 className={css.hero__title}>
            Знайди свій стиль з Clothica вже сьогодні!
          </h1>
          <p className={css.hero__subtitle}>
            Clothica — це місце, де комфорт поєднується зі стилем. Ми створюємо
            базовий одяг, який легко комбінується та підходить для будь-якої
            нагоди. Обирай речі, що підкреслять твою індивідуальність і завжди
            будуть актуальними.
          </p>
          <ul className={css.hero__buttons}>
            <li className={css["hero__btn--left"]}>
              <Link href="#goods">До товарів</Link>
            </li>
            <li className={css["hero__btn--right"]}>
              <Link href="#categories">Дослідити категорії</Link>
            </li>
          </ul>
        </div>
        <div className={css["hero__right-img"]}>
          <Image
            src="/hero_mob.webp"
            alt="Пара закоханих у повсякденному одязі"
            fill
            preload
            fetchPriority="high"
            sizes="(max-width: 767px) 335px,  50vw"
            className={css.hero__image}
          />
        </div>
      </div>
    </Container>
  );
}
