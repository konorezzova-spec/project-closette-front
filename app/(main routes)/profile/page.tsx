'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageNoInfo } from '@/components/MessageNoInfo/MessageNoInfo';
import styles from './page.module.css';
import { UserForm, IUserData } from '@/components/UserForm/UserForm';
import { nextServer } from '@/lib/api/api';

interface IOrder {
  _id: string;
  orderNumber: string | number;
  createdAt: string;
  amount: number;
  status: string;
}

export default function CabinetPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [userData, setUserData] = useState<IUserData | undefined>(undefined);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const router = useRouter();
  
  useEffect(() => {
    async function fetchCabinetData() {
      try {
        const ordersRes = await nextServer.get('/orders');
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Помилка завантаження замовлень:', error);
      } finally {
        setIsLoadingOrders(false);
      }

      try {
        const profileRes = await nextServer.get('/users');
        setUserData(profileRes.data.user);
      } catch (error) {
        console.error('Помилка завантаження профілю:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    }

    fetchCabinetData();
  }, []);

  const handleLogout = async () => {
    try {
      await nextServer.post('/auth/logout');
      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error('Помилка виходу з системи:', error);
    }
  };

  const handleFormSubmit = async (data: IUserData) => {
    try {
      await nextServer.patch('/users', {
        name: data.name,
        surname: data.surName, 
        tel: data.tel,
        city: data.city,
        postOffice: Number(data.postOffice),
      });
      alert('Дані профілю успішно оновлено!');
    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
      alert('Не вдалося оновити дані. Спробуйте пізніше.');
    }
  };
  
  return (
    <div className={styles.cabinetPageWrapper}>
      <main className={styles.cabinetMain}>
        <div className={styles.cabinetContainer}>
          <h1 className={styles.cabinetTitle}>Кабінет</h1>

          <div className={styles.cabinetContent}>
            <section className={styles.userFormSection}>
              {isLoadingProfile ? (
                <p>Завантаження даних профілю...</p>
              ) : (
                <UserForm 
                  title="Особиста інформація" 
                  submitButtonText="Зберегти зміни"
                  initialData={userData}
                  onSubmit={handleFormSubmit}
                  showComment={false}
                />
              )}
            </section>

            <section className={styles.ordersSection}>
              <h2 className={styles.ordersTitle}>Мої замовлення</h2>

              {isLoadingOrders ? (
                <p>Завантаження замовлень...</p>
              ) : orders.length > 0 ? (
                <ul className={styles.ordersList}>
                  {orders.map((order) => (
                    <li key={order._id} className={styles.orderCard}>
                      <div className={styles.orderLeft}>
                        <span className={styles.orderDate}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className={styles.orderNumber}>№{order.orderNumber}</span>
                      </div>

                      <div className={styles.orderRight}>
                        <span className={styles.orderSumLabel}>Сума:</span>
                        <span className={styles.orderAmount}>{order.amount} грн</span>
                      </div>

                      <div className={styles.orderStatus}>
                        Статус: {order.status}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.emptyOrdersWrapper}>
                  <MessageNoInfo
                    message="У вас ще не було жодних замовлень! Мершій до покупок!"
                    buttonText="До покупок"
                    onClick={() => router.push('/goods')}
                  />
                </div>
              )}
            </section>
          </div>

          <div className={styles.cabinetButton}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Вийти з кабінету
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}