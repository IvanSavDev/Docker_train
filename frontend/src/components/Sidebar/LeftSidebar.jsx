import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Drawer } from '@mui/material';

import { NavList } from './NavList';
import { Logo } from './Logo';

import { throttle } from '../../utils/utils';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 0 0 0',
    gap: '20px',
  },
  [theme.breakpoints.up('middle')]: {
    display: 'none',
  },
}));

export const LeftSidebar = ({ open, handleClose }) => {
  useEffect(() => {
    const checkWindowResize = (event) => {
      if (event.target.innerWidth > 720) {
        handleClose();
      }
    };

    const handleResize = throttle(checkWindowResize, 500);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <StyledDrawer open={open} onClose={handleClose}>
      <Logo />
      <NavList handleClose={handleClose} />
    </StyledDrawer>
  );
};
