import React from 'react';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../slices/modalSlice';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import SellProduct from './SellProduct';

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

const mapping = {
  createProduct: CreateProduct,
  editProduct: EditProduct,
  sellProduct: SellProduct,
};

const ModalContainer = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const { status } = useSelector((state) => state.modal.status);

  const handleClose = () => {
    if (status === 'pending') dispatch(closeModal());
  };

  const modalType = useSelector((state) => state.modal.type);

  const Component = mapping[modalType];
  return (
    Component && (
      <StyledDialog
        aria-labelledby="customized-dialog-title"
        open={isOpened}
        onClose={handleClose}
      >
        <Component closeModal={handleClose} />
      </StyledDialog>
    )
  );
};

export default ModalContainer;
