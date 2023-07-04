import React from 'react';
import { StyledDialogContent } from './ModalInputContainer.styled';

const ModalInputContainer = ({ children, ...rest }) => (
  <StyledDialogContent {...rest} dividers>
    {children}
  </StyledDialogContent>
);

export default ModalInputContainer;
