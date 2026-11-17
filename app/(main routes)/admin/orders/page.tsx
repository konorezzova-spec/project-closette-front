"use client";

import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

const PER_PAGE = 10;

function getErrorText(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) return "Увійдіть як адміністратор.";
    if (error.response?.status === 403)
      return "Доступ лише для адміністраторів.";
  }
  return "Не вдалося завантажити замовлення.";
}

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["adminOrders", page, statusFilter],
    queryFn: () =>
      fetchAllOrders({
        page,
        perPage: PER_PAGE,
        status: statusFilter || undefined,
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const orders = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleFilterChange = (value: OrderStatus | "") => {
    setStatusFilter(value);
    setPage(1);
  };

  const queryClient = useQueryClient();

  const {
    mutate: changeStatus,
    isPending: isUpdating,
    variables,
  } = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onSuccess: async updated => {
      // Замовлення випало з фільтра, і це було останнє на сторінці —
      // переходимо на попередню, щоб не лишитись на порожній
      const leftFilter = statusFilter && updated.status !== statusFilter;
      if (leftFilter && orders.length === 1 && page > 1) {
        setPage(p => p - 1);
      }

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

      <div className={css.toolbar}>
        <label className={css.filterLabel}>
          Статус:
          <select
            className={css.statusSelect}
            value={statusFilter}
            onChange={e =>
              handleFilterChange(e.target.value as OrderStatus | "")
            }
          >
            <option value="">Усі</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {data && <p>Знайдено: {data.totalItems}</p>}
      </div>

      {isPending && <p>Завантаження замовлень...</p>}

      {isError && <p className={css.error}>{getErrorText(error)}</p>}

      {!isPending && !isError && orders.length === 0 && (
        <p>Замовлень поки немає.</p>
      )}

      {orders.length > 0 && (
        <>
          <div
            className={css.tableWrapper}
            style={{ opacity: isPlaceholderData ? 0.5 : 1 }}
          >
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
                        disabled={
                          isUpdating && variables?.orderId === order._id
                        }
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

          {totalPages > 1 && (
            <div className={css.pagination}>
              <button
                type="button"
                className={css.pageButton}
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1 || isPlaceholderData}
              >
                ← 
              </button>

              <span>
                Сторінка {page} з {totalPages}
              </span>

              <button
                type="button"
                className={css.pageButton}
                onClick={() => setPage(p => p + 1)}
                disabled={page >= totalPages || isPlaceholderData}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}