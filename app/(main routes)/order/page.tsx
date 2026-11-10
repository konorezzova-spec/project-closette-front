import type { Metadata } from "next";
import Container from "@/components/Container/Container";
import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList";
import css from "./CreateOrder.module.css";

export const metadata: Metadata = {
  title: "Оформлення замовлення | Clothica",
};

export default function OrderPage() {
  return (
    <section className={css.section}>
      <Container>
        <h2 className={css.title}>Офрмити замовлення</h2>
        <div className={css.content}>
          <div className={css.goods}>
            <p className={css.subtitle}>Товари</p>
            <GoodsOrderList/>
          </div>

          <div className={css.form}>
            <p className={css.subtitle}>Особиста інформація</p>
          </div>

        </div>
      </Container>
    </section>
  );
}
