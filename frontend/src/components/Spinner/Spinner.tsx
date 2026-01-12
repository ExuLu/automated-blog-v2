import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.wrapper} role='status' aria-live='polite'>
      <div className={`${styles.spinner} ${styles.lg}`} />
      <span className={styles.srOnly}>Loading</span>
    </div>
  );
}
