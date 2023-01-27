import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';

import ModalTitle from './ModalTitle';
import ModalInputContainer from './ModalInputContainer';
import Input from '../Inputs/Input';
import DateInput from '../Inputs/DateInput';
import StandardButton from '../Buttons/StandardButton';

import { haveErrors } from '../../utils/utils';
import { notifyFormsErrors } from '../../utils/notifyErrors';
import useForm from '../../hooks/useForm';
import { Errors, Statuses } from '../../consts/consts';
import { createSale, updateSale } from '../../store/slices/salesSlice';
import { updateProduct } from '../../store/slices/productsSlice';

const initialStateErrors = { soldItems: null, lastSale: null };

const initialStateForm = {
  soldItems: '',
  lastSale: '',
};

const checkErrors = (numberProducts, restProducts, lastSale) => {
  const resultInsertedDate = String(lastSale.$d);
  return {
    soldItems: Number.isInteger(numberProducts)
      ? numberProducts > 0
        ? restProducts >= 0
          ? null
          : Errors.NOT_ENOUGH_GOODS
        : Errors.MORE_ZERO
      : Errors.INTEGER,
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

const SellProduct = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { products, status: statusProduct } = useSelector(
    (state) => state.products,
  );
  const { sales, status: statusSale } = useSelector((state) => state.sales);
  const { extra: productId } = useSelector((state) => state.modal);
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({ ...initialStateForm });

  const isDisabled =
    statusSale === Statuses.PENDING || statusProduct === Statuses.PENDING;

  const handleClose = () => {
    if (!isDisabled) {
      closeModal();
    }
  };

  const handleSubmit = async () => {
    const { soldItems, lastSale } = form;

    const soldProduct = products.find((product) => product.id === productId);
    const soldItemsAsNumber = soldItems === '' ? null : Number(soldItems);
    const productRemains = soldProduct.remains - soldItemsAsNumber;
    const checkedErrors = checkErrors(
      soldItemsAsNumber,
      productRemains,
      lastSale,
    );
    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      try {
        setErrors({ ...initialStateErrors });
        const resultInsertedDate = String(lastSale.$d);
        const date = new Date(resultInsertedDate).toISOString();
        const existedSale = sales?.find((sale) => sale.productId === productId);
        if (existedSale) {
          await dispatch(
            updateSale({
              id: existedSale.id,
              soldItems: existedSale.soldItems + soldItemsAsNumber,
              lastSale: date,
            }),
          ).unwrap();
        } else {
          await dispatch(
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
          ).unwrap();
        }

        await dispatch(
          updateProduct({
            id: productId,
            remains: productRemains,
          }),
        ).unwrap();
        closeModal();
      } catch (error) {
        notifyFormsErrors(error, setErrors);
      }
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
      <ModalTitle handleClose={handleClose}>Sell the product</ModalTitle>
      <ModalInputContainer>
        <Input
          name="soldItems"
          label="Number of products"
          error={Boolean(errors.soldItems)}
          helperText={errors.soldItems}
          onChange={handleChange}
          value={form.soldItems}
          autoFocus
          disabled={isDisabled}
        />
        <DateInput
          label="Date of sale"
          inputFormat="DD/MM/YYYY"
          value={form.lastSale}
          onChange={handleChangeDate}
          error={Boolean(errors.lastSale)}
          disabled={isDisabled}
        />
      </ModalInputContainer>
      <DialogActions>
        <StandardButton fullWidth onClick={handleSubmit} disabled={isDisabled}>
          Sell product
        </StandardButton>
      </DialogActions>
    </>
  );
};

export default SellProduct;
