import React, { useEffect } from 'react';

import { NavList } from './NavList';

import { throttle } from '../../utils/utils';

import { StyledDrawer, Logo } from './LeftSidebar.styled';

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
