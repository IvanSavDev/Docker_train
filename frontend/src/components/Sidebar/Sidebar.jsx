import React, { useState } from 'react';

import { NavList } from './NavList';
import { LeftSidebar } from './LeftSidebar';
import { StyledBurgerMenu, StyledButton } from './Sidebar.styled';

import useAuth from '../../hooks/useAuth';

import styles from './Sidebar.module.css';

import { ReactComponent as LogOut } from '../../assets/img/logOut.svg';

const Sidebar = () => {
  const { logOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo} />
      <nav className={styles.navigation}>
        <NavList />
      </nav>
      <StyledBurgerMenu onClick={() => setOpen(true)} />
      <div className={styles.wrapperPadding}>
        <div className={styles.wrapperButton}>
          <StyledButton
            variant="text"
            startIcon={<LogOut stroke="#2B3844" />}
            onClick={() => logOut()}
          >
            Log out
          </StyledButton>
        </div>
      </div>
      <LeftSidebar open={open} handleClose={() => setOpen(false)} />
    </aside>
  );
};

export default Sidebar;
