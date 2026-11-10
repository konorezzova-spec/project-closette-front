import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Скидання пароля — Clothica",
};

export default function ForgotPasswordPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Скидання пароля</h1>
      <p className={styles.text}>
        Вкажіть email, і ми надішлемо посилання для створення нового пароля.
      </p>
      <ForgotPasswordForm />
    </section>
  );
}