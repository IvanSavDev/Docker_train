import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { ReactComponent as CloseModalImg } from '../../assets/img/closeModal.svg';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontFamily: 'InterBold',
  fontWeight: 700,
  fontSize: '28px',
  lineHeight: '1em',
  textAlign: 'center',
  padding: 0,
  color: theme.palette.custom.main.grey,
}));

const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: -35,
  top: -7,
}));

const ModalTitle = ({ handleClose, children }) => {
  return (
    <StyledDialogTitle>
      {children}
      <StyledIconButton aria-label="close" onClick={handleClose}>
        <CloseModalImg />
      </StyledIconButton>
    </StyledDialogTitle>
  );
};

export default ModalTitle;
