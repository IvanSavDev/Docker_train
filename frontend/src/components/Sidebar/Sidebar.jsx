import React from 'react';
import { NavLink } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { Paths } from '../../consts/consts';
import { ReactComponent as Home } from '../../assets/img/home.svg';
import { ReactComponent as MyProduct } from '../../assets/img/doc.svg';
import { ReactComponent as MySales } from '../../assets/img/percent.svg';
import { ReactComponent as PersonalCabinet } from '../../assets/img/user.svg';
import { ReactComponent as LogOut } from '../../assets/img/logOut.svg';

import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { logOut } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.background} />
      <nav className={styles.sections}>
        <NavLink
          to={Paths.BASE}
          className={({ isActive }) =>
            isActive ? styles.active : styles.noActive
          }
        >
          <Home className={styles.activeLogo} />
          Main page
        </NavLink>
        <NavLink
          to={Paths.MY_PRODUCT}
          className={({ isActive }) =>
            isActive ? styles.active : styles.noActive
          }
        >
          <MyProduct className={styles.activeLogo} />
          My products
        </NavLink>
        <NavLink
          to={Paths.MY_SALES}
          className={({ isActive }) =>
            isActive ? styles.active : styles.noActive
          }
        >
          <MySales className={styles.activeLogo} />
          My sales
        </NavLink>
        <NavLink
          to={Paths.PERSONAL_CABINET}
          className={({ isActive }) =>
            isActive ? styles.active : styles.noActive
          }
        >
          <PersonalCabinet className={styles.activeLogo} />
          Personal cabinet
        </NavLink>
      </nav>
      <div className={styles.burgerMenu}>burger</div>
      <div className={styles.wrapperPadding}>
        <div className={styles.wrapperButton}>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              logOut();
            }}
          >
            <LogOut />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
