import BackLink from '../BackLink/BackLink';

import styles from './Error.module.css';

type ErrorProps = { message: string; isMainPage?: boolean };

export default function Error({ message, isMainPage = false }: ErrorProps) {
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <span className={styles.icon}>!</span>
        <p className={styles.message}>{message}</p>
      </div>

      {!isMainPage && <BackLink />}
    </div>
  );
}
