"use client";

import Container from "@/components/Container/Container";
import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList";
import { UserForm, IUserData } from "@/components/UserForm/UserForm";
import css from "./CreateOrder.module.css";
import { useRouter } from "next/navigation";
import { useBasketStore } from "@/lib/store/basketStore";
import type { CreateOrderParams } from "@/types/order";
import { createOrder } from "@/lib/api/clientApi";
import { isAxiosError } from "axios";

export default function OrderPage() {
  const router = useRouter();
  const items = useBasketStore(state => state.items);
  const clearBasket = useBasketStore(state => state.clearBasket);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: IUserData) => {
    if (items.length === 0) {
      console.log("Кошик порожній");
      return;
    }

    const amount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderData: CreateOrderParams = {
      name: data.name.trim(),
      surname: data.surName,
      tel: data.tel,
      city: data.city,
      postOffice: Number(data.postOffice),
      comment: data.comment || undefined,
      amount,
      goodsOrderList: items.map(item => ({
        goodId: item.id,
        size: item.size,
        quantity: item.quantity,
      })),
    };

    // setIsSubmitting(true);

    try {
      await createOrder(orderData);
      clearBasket();
      router.push("/")
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.error ?? error.message
        : "Щось пішло не так";
      console.error("Щось пішло не так", message);
    }
    // finally {
    //   setIsSubmitting(false);
    // }
  };
  return (
    <section className={css.section}>
      <Container>
        <h2 className={css.title}>Оформити замовлення</h2>
        <div className={css.content}>
          <div className={css.goods}>
            <p className={css.subtitle}>Товари</p>
            <GoodsOrderList />
          </div>

          <div className={css.form}>
            <UserForm
              title="Особиста інформація"
              submitButtonText={"Оформити замовлення"}
              // isSubmitting={isSubmitting}
              onSubmit={handleSubmit} />
          </div>

        </div>
      </Container>
    </section>
  );
}
