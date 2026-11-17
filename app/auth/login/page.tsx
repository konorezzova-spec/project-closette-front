'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import styles from "./login.module.css";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import AuthTab from "@/components/AuthTab/AuthTab";
import AuthFooter from "@/components/AuthFooter/AuthFooter";
import { formatPhone, toApiPhone } from '@/lib/validation/auth';

const validationSchema = Yup.object({
  tel: Yup.string()
    .test('is-valid-phone', 'Невірний формат номера телефону', (value) => {
      if (!value) return false;
      const digits = value.replace(/\D/g, '');
      return /^380\d{9}$/.test(digits);
    })
    .required("Номер телефону обов'язковий"),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .max(128, 'Пароль маж містити щонайбільше 128 символів')
    .required('Пароль обовʼязковий'),
});

function EyeIcon({ crossed }: { crossed: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 12s3.8-7 10.5-7 10.5 7 10.5 7-3.8 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
      {crossed && <path d="M3 3l18 18" />}
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      tel: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Використовуємо ту саму функцію toApiPhone, що й у реєстрації
        const payload = {
          tel: toApiPhone(values.tel),
          password: values.password,
        };

        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
        
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.message || "Помилка авторизації");
        }

        if (data.user) {
          setUser(data.user);
        } else if (data.data) {
          setUser(data.data);
        }

        toast.success("Успішний вхід! Перенаправлення...", {
          duration: 1500,
        });
        setTimeout(() => {
          router.push("/homePage");
        }, 800);
      } catch (error: unknown) {
        toast.error((error as { message?: string }).message || "Щось пішло не так", {
          duration: 1500,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <AuthHeader />
      <section className={styles.page}>
        <div className={styles.card}>
          <AuthTab active="login" />

          <h1 className={styles.title}>Вхід</h1>
          <form onSubmit={formik.handleSubmit}>
            <label className={styles.phoneLabel}>
              Номер телефону*
              <input
                type="tel"
                name="tel"
                placeholder="+38 (099) 123-12-34"
                value={formik.values.tel}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  formik.setFieldValue("tel", formatted);
                }}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${formik.touched.tel && formik.errors.tel ? styles.inputError : ''}`}
              />
              {formik.touched.tel && formik.errors.tel ? (
                <span className={styles.error}>{formik.errors.tel}</span>
              ) : null}
            </label>

            <div className={styles.div}>
              <label className={styles.passwordLabel}>
                Пароль*
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type={isVisible ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: '100%' }}
                    className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : ''}`}
                  />
                  <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => setIsVisible((prev) => !prev)}
                    aria-label={isVisible ? "Сховати пароль" : "Показати пароль"}
                    aria-pressed={isVisible}
                    style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <EyeIcon crossed={isVisible} />
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <span className={styles.error}>{formik.errors.password}</span>
                ) : null}
              </label>
            </div>

            <div className={styles.password}>
              <Link href="/auth/forgot-password" className={styles.forgotPassword}>
                Забули пароль?
              </Link>
            </div>

            <button
              className={styles.btn}
              type="submit" 
              disabled={isLoading}
            >
              <span className={styles.btnText}>Увійти</span>
              {isLoading && (
                <div className={styles.loader}>
                  <Loader2 className={styles.animatespin} /> Завантаження
                </div>
              )}
            </button>
          </form>

          <Toaster position="top-right"/>
        </div>
        <AuthFooter />
      </section>
    </>
  );
}