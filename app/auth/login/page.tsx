'use client';


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import './login.css';
import type { Metadata } from "next";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import AuthTab from "@/components/AuthTab/AuthTab";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import AuthFooter from "@/components/AuthFooter/AuthFooter";



const validationSchema = Yup.object({
  tel: Yup.string()
    .required('Номер телефону обовʼязковий'),
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
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Помилка авторизації');
        }
        toast.success('Успішний вхід! Перенаправлення...');
        setTimeout(() => {
          router.push('/homePage')
        }, 1000);
      } catch (error: any) {
        toast.error(error.message || 'Щось пішло не так');
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <main className="login-page">
        <div className="logo_wrap">
          <a href="/" aria-label="Home" className="logo-link">
            <button className="logo-btn">
              <Image
                className="logo"
                src="/header/company_logo.svg"
                alt="logo"
                width={84}
                height={36}
              />
            </button>
            </a>
        <link href="/components/Header/Header.tsx" className="logo-link">
        </link>
      </div>
      
      <div className="buttons">
        <button className="register-button" onClick={() => router.push('/auth/register')}>Реєстрація</button>
        <button className="login-button" onClick={() => router.push('/auth/login')}>Вхід</button>
      </div>
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
        <button
          className="login-btn"
          type="submit" 
          disabled={isLoading}
          >
  <span>Увійти</span>
{isLoading && (
  <div className="loader">
    <Loader2 className="animate-spin">Завантаження</Loader2>
  </div>
)}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
      <p className="copyright">© 2025 Clothica. Всі права захищені.</p>
    </main>
  );
}