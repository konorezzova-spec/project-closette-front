import { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ResetPasswordForm/ResetPasswordForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Новий пароль — Clothica",
};

export default function ResetPasswordPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Новий пароль</h1>
      {/* useSearchParams у клієнтському компоненті потребує Suspense */}
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </section>
  );
}