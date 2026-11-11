import styles from "./AuthFooter.module.css";

export default function AuthFooter() {
  // рік береться з поточної дати
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        <span>©</span>
        <span>{year}</span>
        <span>Clothica. Всі права захищені.</span>
      </p>
    </footer>
  );
}