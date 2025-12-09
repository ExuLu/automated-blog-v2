import { Link } from 'react-router-dom';

import styles from './Error.module.css';
import BackLink from './BackLink';

export default function Error({ message, isMainPage = false }) {
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
