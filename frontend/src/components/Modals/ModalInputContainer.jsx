import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

const StyledDialogContent = styled(DialogContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  border: 'none',
  paddingBottom: '4px',
}));

const ModalInputContainer = ({ children, ...rest }) => {
  return (
    <StyledDialogContent {...rest} dividers>
      {children}
    </StyledDialogContent>
  );
};

export default ModalInputContainer;
