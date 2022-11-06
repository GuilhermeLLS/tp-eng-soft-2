import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import Logo from '../logo/Logo';
import styles from './Sidebar.module.css';
import useAuth from '../../hooks/useAuth/useAuth';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sColumn}>
        <Logo size="md" />
        <div className={styles.menuItem}>
          <span className={styles.menuItemIcon}>
            <FiHome />
          </span>
          <span>Página Inicial</span>
        </div>
        <Link to="/profile" className={styles.menuItem}>
          <span className={styles.menuItemIcon}>
            <FiAlertCircle />
          </span>
          <span>Perfil</span>
        </Link>
      </div>
      <div className={styles.menuItem}>
        <button className={styles.composerButton}>Escreva um kudo!</button>
      </div>
      <div className={styles.menuItem}>
        <button className={styles.composerButton} onClick={logout}>
          Sair
        </button>
      </div>
    </aside>
  );
}
