import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { NavList } from './NavList';
import { LeftSidebar } from './LeftSidebar';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import useAuth from '../../hooks/useAuth';

import styles from './Sidebar.module.css';

import { ReactComponent as LogOut } from '../../assets/img/logOut.svg';

const StyledBurgerMenu = styled(BurgerMenu)(({ theme }) => ({
  display: 'none',
  paddingInline: 0,

  [theme.breakpoints.down('middle')]: {
    display: 'inline-flex',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: '#2B3844',
  fontSize: '14px',
  opacity: 0.4,
  whiteSpace: 'nowrap',
  minWidth: 'auto',

  [theme.breakpoints.down('lessSmall')]: {
    fontSize: 0,

    '& .MuiButton-startIcon': {
      margin: 0,
    },
  },
}));

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
