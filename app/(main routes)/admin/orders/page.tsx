"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Container from "@/components/Container/Container";
import { fetchAllOrders, updateOrderStatus } from "@/lib/api/clientApi";
import type { OrderStatus } from "@/types/order";
import css from "./AdminOrders.module.css";

const STATUS_LABELS: Record<OrderStatus, string> = {
  inProcess: "У процесі",
  completing: "Комплектується",
  done: "Виконано",
  canceled: "Скасовано",
};

function getErrorText(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) return "Увійдіть як адміністратор.";
    if (error.response?.status === 403)
      return "Доступ лише для адміністраторів.";
  }
  return "Не вдалося завантажити замовлення.";
}

export default function AdminOrdersPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: () => fetchAllOrders(),
    retry: false,
  });

  const orders = data?.orders ?? [];

  const queryClient = useQueryClient();

  const {
    mutate: changeStatus,
    isPending: isUpdating,
    variables,
  } = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onSuccess: async updated => {
      await queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      toast.success(
        `Замовлення №${updated.orderNumber}: ${STATUS_LABELS[updated.status]}`
      );
    },
    onError: error => {
      const message = isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined;
      toast.error(message ?? "Не вдалося змінити статус.");
    },
  });

  return (
    <Container className={css.section}>
      <h1 className={css.title}>Замовлення</h1>

      {isPending && <p>Завантаження замовлень...</p>}

      {isError && <p className={css.error}>{getErrorText(error)}</p>}

      {!isPending && !isError && orders.length === 0 && (
        <p>Замовлень поки немає.</p>
      )}

      {orders.length > 0 && (
        <div className={css.tableWrapper}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Клієнт</th>
                <th>Доставка</th>
                <th>Товари</th>
                <th>Сума</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("uk-UA")}
                  </td>
                  <td>
                    {order.name} {order.surname}
                    <br />
                    <a href={`tel:${order.tel}`}>{order.tel}</a>
                  </td>
                  <td>
                    {order.city}, НП №{order.postOffice}
                  </td>
                  <td>
                    <ul className={css.goodsList}>
                      {order.goodsOrderList.map((item, index) => (
                        <li key={index}>
                          {`${item.goodId?.name ?? "Товар видалено"} · ${item.size} × ${item.quantity}`}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.amount} грн</td>
                  <td>
                    <select
                      className={css.statusSelect}
                      value={order.status}
                      disabled={isUpdating && variables?.orderId === order._id}
                      onChange={e =>
                        changeStatus({
                          orderId: order._id,
                          status: e.target.value as OrderStatus,
                        })
                      }
                      aria-label={`Статус замовлення №${order.orderNumber}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}