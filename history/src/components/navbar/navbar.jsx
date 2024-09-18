import { NavLink } from 'react-router-dom';
import styles from './navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/by-date"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            By Date
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Today
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/since"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Since
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};