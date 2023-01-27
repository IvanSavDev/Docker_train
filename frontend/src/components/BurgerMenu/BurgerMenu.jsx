import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(() => ({
  borderRadius: '4px',
  padding: '9px',
  margin: 0,
  '& .MuiTouchRipple-root *': {
    borderRadius: '4px',
  },
}));

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
