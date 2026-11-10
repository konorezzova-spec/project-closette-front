"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import FormField from "@/components/FormField/FormField.tsx";
import styles from "./ResetPasswordForm.module.css";
import { getApiErrorMessage, resetPassword } from "@/lib/api/authApi";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/lib/validation/auth";

export default function ResetPasswordForm() {
  const router = useRouter();
  // Посилання з листа: /auth/reset-password?token=...
  const token = useSearchParams().get("token");

  const formik = useFormik<ResetPasswordValues>({
    initialValues: { password: "", confirm: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: async ({ password }) => {
      if (!token) return;
      try {
        await resetPassword(token, password);
        toast.success("Пароль змінено. Тепер можна увійти.");
        router.push("/auth/login");
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      }
    },
  });

  if (!token) {
    return (
      <>
        <p className={styles.error} role="alert">
          Посилання недійсне. Запросіть нове.
        </p>
        <Link className={styles.link} href="/auth/forgot-password">
          Скинути пароль
        </Link>
      </>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <FormField
        id="password"
        label="Новий пароль*"
        type="password"
        placeholder="********"
        autoComplete="new-password"
        {...formik.getFieldProps("password")}
        error={formik.touched.password ? formik.errors.password : undefined}
      />
      <FormField
        id="confirm"
        label="Повторіть пароль*"
        type="password"
        placeholder="********"
        autoComplete="new-password"
        {...formik.getFieldProps("confirm")}
        error={formik.touched.confirm ? formik.errors.confirm : undefined}
      />

      <button
        className={styles.button}
        type="submit"
        disabled={formik.isSubmitting}
        aria-busy={formik.isSubmitting}
      >
        {formik.isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
        {formik.isSubmitting ? "Збереження…" : "Змінити пароль"}
      </button>
    </form>
  );
}