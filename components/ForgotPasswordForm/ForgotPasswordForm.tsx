"use client";

import { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import FormField from "@/components/FormField/FormField.tsx";
import styles from "./ForgotPasswordForm.module.css";
import { getApiErrorMessage, requestResetEmail } from "@/lib/api/authApi";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validation/auth";

export default function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const formik = useFormik<ForgotPasswordValues>({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: async ({ email }) => {
      try {
        await requestResetEmail(email.trim());
        setSentTo(email.trim());
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      }
    },
  });

  // Бекенд відповідає 200 і для неіснуючої пошти, тому текст нейтральний
  if (sentTo) {
    return (
      <p className={styles.success} role="status">
        Якщо акаунт із поштою {sentTo} існує, ми надіслали лист із посиланням для
        скидання пароля. Воно діє 15 хвилин.
      </p>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <FormField
        id="email"
        label="Email*"
        type="email"
        placeholder="Ваш email"
        autoComplete="email"
        {...formik.getFieldProps("email")}
        error={formik.touched.email ? formik.errors.email : undefined}
      />

      <button
        className={styles.button}
        type="submit"
        disabled={formik.isSubmitting}
        aria-busy={formik.isSubmitting}
      >
        {formik.isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
        {formik.isSubmitting ? "Надсилання…" : "Надіслати посилання"}
      </button>
    </form>
  );
}