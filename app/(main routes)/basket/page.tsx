import { redirect } from "next/navigation";

export default function BasketPage() {
  redirect("/order");
}

/* При оновленні сторінки або при 
переході за збереженим посиланням
 з маршрутом /basket повинна відбутись
  переадресація на сторінку оформлення
   замовлення обраних товарів - /order. */
