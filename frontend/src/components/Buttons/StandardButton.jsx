import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '19px 32px 19px 32px',
  lineHeight: '1em',
  textTransform: 'none',
  backgroundColor: theme.palette.custom.main.blue,
}));

const StandardButton = ({ children, ...rest }) => (
  <StyledButton {...rest} variant="contained" disableFocusRipple autoFocus>
    {children}
  </StyledButton>
);

export default StandardButton;
