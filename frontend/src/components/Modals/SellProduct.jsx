import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';

import useForm from '../../hooks/useForm';
import ModalTitle from './ModalTitle';
import ModalInputContainer from './ModalInputContainer';
import Input from '../Inputs/Input';
import DateInput from '../Inputs/DateInput';
import StandardButton from '../Buttons/StandardButton';
import { haveErrors } from '../../utils/utils';
import { Errors } from '../../consts/consts';
import { createSale, updateSale } from '../../slices/salesSlice';
import { updateProduct } from '../../slices/productsSlice';

const initialStateErrors = { numberProducts: null, lastSale: null };

const initialStateForm = {
  soldItems: '',
  lastSale: '',
};

const checkErrors = (numberProducts, restProducts, lastSale) => {
  const resultInsertedDate = String(lastSale.$d);
  return {
    soldItems:
      numberProducts > 0
        ? restProducts >= 0
          ? null
          : Errors.NOT_ENOUGH_GOODS
        : Errors.MORE_ZERO,
    lastSale:
      lastSale !== ''
        ? resultInsertedDate !== 'Invalid Date'
          ? new Date(resultInsertedDate).getTime() <= Date.now()
            ? null
            : Errors.INVALID_DATE
          : Errors.INVALID_DATE
        : Errors.INVALID_DATE,
  };
};

const SellProduct = ({ open, closeModal, productId }) => {
  const { sales, products } = useSelector((state) => ({
    products: state.products.products,
    sales: state.sales.sales,
  }));
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({ ...initialStateForm });

  const handleSubmit = () => {
    const { soldItems, lastSale } = form;

    const soldProduct = products.find((product) => product.id === productId);
    const soldItemsAsNumber = Number(soldItems);
    const productRemains = soldProduct.remains - soldItemsAsNumber;
    const checkedErrors = checkErrors(
      soldItemsAsNumber,
      productRemains,
      lastSale,
    );
    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      const resultInsertedDate = String(lastSale.$d);
      const date = new Date(resultInsertedDate).toISOString();
      const existedSale = sales.find((sale) => sale.productId === productId);

      if (existedSale) {
        dispatch(
          updateSale({
            id: existedSale.id,
            soldItems: existedSale.soldItems + soldItemsAsNumber,
            lastSale: date,
          }),
        );
      } else {
        dispatch(
          createSale({
            productId,
            name: soldProduct.name,
            store: soldProduct.store,
            address: soldProduct.address,
            category: soldProduct.category,
            creationDate: soldProduct.creationDate,
            price: soldProduct.price,
            soldItems: soldItemsAsNumber,
            weight: soldProduct.weight,
            lastSale: date,
          }),
        );
      }

      dispatch(
        updateProduct({
          id: productId,
          remains: productRemains,
        }),
      );

      closeModal();
    } else {
      setErrors(checkedErrors);
    }
  };

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleChangeDate = (date) => {
    setErrors((prevState) => ({ ...prevState, lastSale: null }));
    setForm({ lastSale: date });
  };

  return (
    <>
      <ModalTitle handleClose={closeModal}>Sell the product</ModalTitle>
      <ModalInputContainer errors={errors}>
        <Input
          name="soldItems"
          label="Number of products"
          error={Boolean(errors.numberProducts)}
          helperText={errors.numberProducts}
          onChange={handleChange}
          value={form.numberProducts}
          autoFocus
        />
        <DateInput
          label="Date of sale"
          inputFormat="DD/MM/YYYY"
          value={form.lastSale}
          onChange={handleChangeDate}
          error={Boolean(errors.lastSale)}
        />
      </ModalInputContainer>
      <DialogActions>
        <StandardButton fullWidth onClick={handleSubmit}>
          Sell product
        </StandardButton>
      </DialogActions>
    </>
  );
};

export default SellProduct;
