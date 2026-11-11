import type { Metadata } from "next";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import AuthTab from "@/components/AuthTab/AuthTab";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import AuthFooter from "@/components/AuthFooter/AuthFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Реєстрація — Clothica",
};

export default function RegisterPage() {
  return (
    <>
      <AuthHeader />
      <section className={styles.page}>
        <div className={styles.card}>
          <AuthTab active="register" />
          <h1 className={styles.title}>Реєстрація</h1>
          <RegistrationForm />
        </div>
        <AuthFooter />
      </section>
    </>
  );
}