import React from 'react';
import { NavLink } from 'react-router-dom';

import { Paths } from '../../consts/consts';

import styles from './Sidebar.module.css';

import { ReactComponent as Home } from '../../assets/img/home.svg';
import { ReactComponent as MyProduct } from '../../assets/img/doc.svg';
import { ReactComponent as MySales } from '../../assets/img/percent.svg';
import { ReactComponent as PersonalCabinet } from '../../assets/img/user.svg';

export const NavList = ({ handleClose }) => {
  return (
    <>
      <NavLink
        to={Paths.BASE}
        className={({ isActive }) =>
          isActive ? styles.active : styles.noActive
        }
        onClick={handleClose}
      >
        <Home className={styles.activeLogo} />
        Main page
      </NavLink>
      <NavLink
        to={Paths.MY_PRODUCT}
        className={({ isActive }) =>
          isActive ? styles.active : styles.noActive
        }
        onClick={handleClose}
      >
        <MyProduct className={styles.activeLogo} />
        My products
      </NavLink>
      <NavLink
        to={Paths.MY_SALES}
        className={({ isActive }) =>
          isActive ? styles.active : styles.noActive
        }
        onClick={handleClose}
      >
        <MySales className={styles.activeLogo} />
        My sales
      </NavLink>
      <NavLink
        to={Paths.PERSONAL_CABINET}
        className={({ isActive }) =>
          isActive ? styles.active : styles.noActive
        }
        onClick={handleClose}
      >
        <PersonalCabinet className={styles.activeLogo} onClick={handleClose} />
        Personal cabinet
      </NavLink>
    </>
  );
};
