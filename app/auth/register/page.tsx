import type { Metadata } from "next";
import AuthTab from "@/components/AuthTab/AuthTab";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Реєстрація — Clothica",
};

export default function RegisterPage() {
  return (
    <section className={styles.page}>
      <AuthTab active="register" />
      <h1 className={styles.title}>Реєстрація</h1>
      <RegistrationForm />
    </section>
  );
}