import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const BurgerMenu = ({ ...rest }) => (
  <IconButton
    {...rest}
    size="large"
    edge="start"
    color="inherit"
    aria-label="menu"
    sx={{
      borderRadius: '4px',
      padding: '9px',
      margin: 0,
      '& .MuiTouchRipple-root *': {
        borderRadius: '4px',
      },
    }}
  >
    <MenuIcon />
  </IconButton>
);

export default BurgerMenu;
