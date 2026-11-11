import styles from "./AuthFooter.module.css";

export default function AuthFooter() {
  // рік береться з поточної дати
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© {year} Clothica. Всі права захищені.</p>
    </footer>
  );
}