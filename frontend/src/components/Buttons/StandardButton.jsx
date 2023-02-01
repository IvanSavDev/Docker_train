import React from 'react';

import { StyledButton } from './StandardButton.styled';

const StandardButton = ({ children, ...rest }) => (
  <StyledButton {...rest} variant="contained" disableFocusRipple autoFocus>
    {children}
  </StyledButton>
);

export default StandardButton;
