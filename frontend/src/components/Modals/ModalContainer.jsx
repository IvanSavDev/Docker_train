import React from 'react';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    padding: '64px 40px 64px 40px',
    maxWidth: '426px',
    overflowY: 'visible',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiPaper-root': {
      padding: '30px 20px 30px 20px',
    },
  },
  '& .MuiDialogActions-root': {
    padding: '0px 24px 0 24px',
  },
  '& .MuiTypography-root': {
    padding: '0 24px 24px 24px',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(28,23,30,0.8)',
  },
}));

const ModalContainer = ({ children, ...rest }) => {
  return (
    <StyledDialog {...rest} aria-labelledby="customized-dialog-title">
      {children}
    </StyledDialog>
  );
};

export default ModalContainer;
