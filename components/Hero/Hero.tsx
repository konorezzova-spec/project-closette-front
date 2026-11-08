import css from "./Hero.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
return (
    <Container > 
        <div className={css.hero_content}>
            <div className={css.hero_left}>
                <h1 className={css.hero_title}>
                    Знайди свій стиль з Clothica вже сьогодні!
                </h1>
                <p className={css.hero_subtitle}>
                    Clothica — це місце, де комфорт поєднується зі стилем. 
                    Ми створюємо базовий одяг, який легко комбінується та підходить для будь-якої нагоди.
                     Обирай речі, що підкреслять твою індивідуальність і завжди будуть актуальними.
                </p>
               <div className={css.hero_btns}>
                    <div className={css.hero_btn_left}>
                        <Link href="#products">До товарів</Link>
                    </div>
                    <div className={css.hero_btn_right} >
                        <Link href="#about">Дізнатися більше</Link>
                    </div>
                 </div>
            </div>
            <div className={css.hero_right_img}>
                <p>HERO FOTO</p>
            </div>
        </div>    
    </Container>
    );
}

