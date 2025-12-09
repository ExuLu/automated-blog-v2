import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.wrapper} role='status' aria-live='polite'>
      <div className={`${styles.spinner} ${styles.lg}`} />
      <span className={styles.srOnly}>Loading</span>
    </div>
  );
};

export default Spinner;
