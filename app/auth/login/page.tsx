'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';

import AuthHeader from "@/components/AuthHeader/AuthHeader";
import AuthTab from "@/components/AuthTab/AuthTab";
import AuthFooter from "@/components/AuthFooter/AuthFooter";

const validationSchema = Yup.object({
  tel: Yup.string()
.matches(/^+380\d{9}$/, 'Невірний формат номера телефону')
.required('Номер телефону обов’язковий'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .required('Пароль обовʼязковий'),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      tel: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
          credentials: 'include',
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
          data.error || data.message || 'Помилка авторизації'
          );
          }
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        toast.success('Успішний вхід! Перенаправлення...');
        setTimeout(() => {
          router.push('/homePage');
        }, 1000);
      } catch (error: unknown) {
        toast.error((error as { message?: string }).message || 'Щось пішло не так');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <AuthHeader />
      <section className="page">
        <div className="card">

          <AuthTab active="login" />

          <h1 className="login-title">Вхід</h1>
          
          <form onSubmit={formik.handleSubmit}>
            <label className="label">
              Номер телефону*
              <input
                type="tel"
                name="tel"
                placeholder="+38 (0__) ___-__-__"
                value={formik.values.tel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tel && formik.errors.tel ? (
                <span className="error">{formik.errors.tel}</span>
              ) : null}
            </label>

            <label className="label">
              Пароль*
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="error">{formik.errors.password}</span>
              ) : null}
            </label>

            <div className="forgot-password">
              <Link href="/auth/forgot-password" className="forgot-password-link">
                Забули пароль?
              </Link>
            </div>

            <button
              className="login-btn"
              type="submit" 
              disabled={isLoading}
            >
              <span>Увійти</span>
              {isLoading && (
                <div className="loader">
                  <Loader2 className="animate-spin" /> Завантаження
                </div>
              )}
            </button>
          </form>

          <ToastContainer position="top-right" autoClose={3000} />
          <p className="copyright">© 2025 Clothica. Всі права захищені.</p>
        </div>
        <AuthFooter />
      </section>
    </>
  );
}