import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const Header = () => {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} to="/">
        Vulture
      </Link>
    </header>
  );
};
