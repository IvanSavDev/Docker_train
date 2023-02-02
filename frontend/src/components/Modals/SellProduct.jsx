import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';

import ModalTitle from './ModalTitle';
import ModalInputContainer from './ModalInputContainer';
import Input from '../Inputs/Input';
import DateInput from '../Inputs/DateInput';
import StandardButton from '../Buttons/StandardButton';

import { formattingNumericValueFromForm, haveErrors } from '../../utils/utils';
import { notifyFormsErrors } from '../../utils/notifyErrors';
import { sellProductValidation } from '../../validations/sellProductValidation';
import useForm from '../../hooks/useForm';
import { Statuses } from '../../consts/consts';
import { createSale, updateSale } from '../../store/slices/salesSlice';
import { updateProduct } from '../../store/slices/productsSlice';

const initialStateErrors = { soldItems: null, lastSale: null };

const SellProduct = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { products, status: statusProduct } = useSelector(
    (state) => state.products,
  );
  const { sales, status: statusSale } = useSelector((state) => state.sales);
  const { extra: productId } = useSelector((state) => state.modal);
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({ soldItems: '', lastSale: '' });

  const isDisabled =
    statusSale === Statuses.PENDING || statusProduct === Statuses.PENDING;

  const handleClose = () => closeModal();

  const handleSubmit = async () => {
    const { soldItems, lastSale } = form;

    const soldProduct = products.find((product) => product.id === productId);
    const formattedSoldItems = formattingNumericValueFromForm(soldItems);
    const productRemains = soldProduct.remains - formattedSoldItems;
    const validationResult = sellProductValidation(
      formattedSoldItems,
      productRemains,
      lastSale,
    );
    const isNotErrors = haveErrors(validationResult);

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
              soldItems: existedSale.soldItems + formattedSoldItems,
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
              soldItems: formattedSoldItems,
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
      setErrors(validationResult);
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
