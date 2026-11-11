import Link from "next/link";
import styles from "./AuthTab.module.css";

export default function AuthTab({ active }: { active: "register" | "login" }) {
  return (
    <nav className={styles.tabs} aria-label="Авторизація">
      <Link
        href="/auth/register"
        className={`${styles.link} ${active === "register" ? styles.linkActive : ""}`}
        aria-current={active === "register" ? "page" : undefined}
      >
        Реєстрація
      </Link>
      <Link
        href="/auth/login"
        className={`${styles.link} ${active === "login" ? styles.linkActive : ""}`}
        aria-current={active === "login" ? "page" : undefined}
      >
        Вхід
      </Link>
    </nav>
  );
}