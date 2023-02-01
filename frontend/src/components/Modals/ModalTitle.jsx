import React from 'react';

import { StyledDialogTitle, StyledIconButton } from './ModalTitle.styled';

import { ReactComponent as CloseModalImg } from '../../assets/img/closeModal.svg';

const ModalTitle = ({ handleClose, children }) => (
  <StyledDialogTitle>
    {children}
    <StyledIconButton aria-label="close" onClick={handleClose}>
      <CloseModalImg />
    </StyledIconButton>
  </StyledDialogTitle>
);

export default ModalTitle;
