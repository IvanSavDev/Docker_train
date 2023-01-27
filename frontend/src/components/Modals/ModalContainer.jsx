import React from 'react';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import SellProduct from './SellProduct';

import { ModalsTypes, Statuses } from '../../consts/consts';
import { closeModal } from '../../store/slices/modalSlice';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    padding: '64px 40px 64px 40px',
    marginRight: '38px',
    maxWidth: '426px',
    overflowY: 'visible',
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
  [theme.breakpoints.down('lessSmall')]: {
    '& .MuiPaper-root': {
      padding: '35px 0px 35px 0px',
    },
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
  const { status: statusProducts } = useSelector((state) => state.products);
  const { status: statusSell } = useSelector((state) => state.sales);
  const modalType = useSelector((state) => state.modal.type);

  const handleClose = () => {
    if (
      statusProducts !== Statuses.PENDING &&
      modalType === ModalsTypes.EDIT_PRODUCT
    ) {
      dispatch(closeModal());
    }
    if (
      statusProducts !== Statuses.PENDING &&
      modalType === ModalsTypes.CREATE_PRODUCT
    ) {
      dispatch(closeModal());
    }
    if (
      statusSell !== Statuses.PENDING &&
      modalType === ModalsTypes.SELL_PRODUCT
    ) {
      dispatch(closeModal());
    }
  };

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
