'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import styles from "./login.module.css"
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import AuthTab from "@/components/AuthTab/AuthTab";
import AuthFooter from "@/components/AuthFooter/AuthFooter";
import { formatPhone } from '@/lib/validation/auth';

const validationSchema = Yup.object({
  tel: Yup.string()
    .matches(
      /^\+38\s?\(?0\d{2}\)?\s?\d{3}[-]?\d{2}[-]?\d{2}$/,
      "Невірний формат номера телефону"
    )
  .required("Номер телефону обов'язковий"),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
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
      const cleanedTel = values.tel.replace(/[^\d+]/g, "");
      const payload = {
    tel: cleanedTel,
    password: values.password,
  };
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ||data.message||  "Помилка авторизації");
        }

        if (data.user) {
      setUser(data.user);
        } else if (data.data) {
          setUser(data.data);
    }

        toast.success("Успішний вхід! Перенаправлення...");
        setTimeout(() => {
          router.push("/homePage");
        }, 1000);
      } catch (error: unknown) {
        toast.error((error as { message?: string }).message || "Щось пішло не так");
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
/>
              {formik.touched.tel && formik.errors.tel ? (
                <span className={styles.error}>{formik.errors.tel}</span>
              ) : null}
            </label>

          <div className={styles.div}>
            <label className={styles.passwordLabel}>
              Пароль*
             <input
                type="password"
                name="password"
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "Сховати пароль" : "Показати пароль"}
            aria-pressed={isVisible}
          >
            <EyeIcon crossed={isVisible} />
                </button>
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
              <span>Увійти</span>
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