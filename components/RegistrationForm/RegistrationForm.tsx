"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import FormField from "@/components/FormField/FormField";
import styles from "./RegistrationForm.module.css";
import { getApiErrorMessage, registerUser } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import {
  formatPhone,
  registrationSchema,
  toApiPhone,
  type RegistrationValues,
} from "@/lib/validation/auth";

// Після успішної реєстрації: сторінка «Головна»
const REDIRECT_AFTER_REGISTER = "/";

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik<RegistrationValues>({
    initialValues: { name: "", email: "", tel: "", password: "" },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        // при успіху бекенд сам ставить cookie сесії, тобто користувач вже авторизований
        const user = await registerUser({
          name: values.name.trim(),
          email: values.email.trim(),
          tel: toApiPhone(values.tel),
          password: values.password,
        });
        // бекенд уже поставив cookie сесії, тож записуємо користувача у стор
        setUser({ id: user._id, name: user.name, email: user.email });
        router.push(REDIRECT_AFTER_REGISTER);
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      }
    },
  });

  // помилка показується, коли поле «зачепили» або натиснули «Зареєструватися»
  const errorFor = (field: keyof RegistrationValues) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <FormField
        id="name"
        label="Ім’я*"
        type="text"
        placeholder="Ваше ім’я"
        autoComplete="name"
        {...formik.getFieldProps("name")}
        error={errorFor("name")}
      />
      <FormField
        id="tel"
        label="Номер телефону*"
        type="tel"
        inputMode="tel"
        placeholder="+38 (0__) ___-__-__"
        autoComplete="tel"
        {...formik.getFieldProps("tel")}
        onChange={(e) => formik.setFieldValue("tel", formatPhone(e.target.value))}
        error={errorFor("tel")}
      />
      <FormField
        id="email"
        label="Email*"
        type="email"
        placeholder="Ваш email"
        autoComplete="email"
        {...formik.getFieldProps("email")}
        error={errorFor("email")}
      />
      <FormField
        id="password"
        label="Пароль*"
        type="password"
        placeholder="********"
        autoComplete="new-password"
        {...formik.getFieldProps("password")}
        error={errorFor("password")}
      />

      <button
        className={styles.button}
        type="submit"
        disabled={formik.isSubmitting}
        aria-busy={formik.isSubmitting}
      >
        {formik.isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
        {formik.isSubmitting ? "Реєстрація…" : "Зареєструватися"}
      </button>
    </form>
  );
}