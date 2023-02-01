import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import { StyledIconButton } from './BurgerMenu.styled';

const BurgerMenu = ({ ...rest }) => (
  <StyledIconButton
    {...rest}
    size="large"
    edge="start"
    color="inherit"
    aria-label="menu"
  >
    <MenuIcon />
  </StyledIconButton>
);

export default BurgerMenu;
