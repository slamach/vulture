import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import styles from './styles.module.css';

export const Page = () => {
  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <Outlet />
      </main>
    </>
  );
};
