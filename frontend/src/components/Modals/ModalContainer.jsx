import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import SellProduct from './SellProduct';

import { ModalsTypes, Statuses } from '../../consts/consts';
import { closeModal } from '../../store/slices/modalSlice';

import { StyledDialog } from './ModalContainer.styled';

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
      modalType !== ModalsTypes.SELL_PRODUCT
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
