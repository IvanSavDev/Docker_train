import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import StandardButton from '../Buttons/StandardButton';
import Input from '../Inputs/Input';
import ModalTitle from './ModalTitle';
import ModalInputContainer from './ModalInputContainer';

import {
  formattingNumericValueFromForm,
  haveErrors,
  isEmptyObject,
  trimObjectValues,
} from '../../utils/utils';
import { productValidation } from '../../validations/productValidation';
import { notifyFormsErrors } from '../../utils/notifyErrors';
import useForm from '../../hooks/useForm';
import { Errors, Statuses } from '../../consts/consts';
import { createProduct } from '../../store/slices/productsSlice';
import { getUser } from '../../store/slices/userSlice';

const initialStateErrors = {
  store: null,
  price: null,
  name: null,
  category: null,
  remains: null,
  weight: null,
};

const CreateProduct = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.products);
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({
    store: '',
    price: '',
    name: '',
    category: '',
    remains: '',
    weight: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEmptyObject(user)) {
          await dispatch(getUser()).unwrap();
        }
      } catch (error) {
        toast.error(Errors.MODAL);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    if (status !== Statuses.PENDING) {
      closeModal();
    }
  };

  const handleSubmit = async () => {
    const { price, remains, weight } = form;
    const formattedPrice = formattingNumericValueFromForm(price);
    const formattedRemains = formattingNumericValueFromForm(remains);
    const formattedWeight = formattingNumericValueFromForm(weight);

    const updatedForm = {
      ...trimObjectValues(form),
      price: formattedPrice,
      remains: formattedRemains,
      weight: formattedWeight,
    };

    const checkedErrors = productValidation(updatedForm);
    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      if (user.address === undefined) {
        toast.error(Errors.MODAL);
        return;
      }
      try {
        setErrors({ ...initialStateErrors });
        await dispatch(
          createProduct({
            ...updatedForm,
            address: user.address,
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

  return (
    <>
      <ModalTitle handleClose={handleClose}>Creating a product</ModalTitle>
      <ModalInputContainer>
        <Input
          name="store"
          label="Store"
          error={Boolean(errors.store)}
          helperText={errors.store}
          onChange={handleChange}
          value={form.store}
          autoFocus
          disabled={Boolean(status === Statuses.PENDING)}
        />
        <Input
          name="price"
          label="Price"
          error={Boolean(errors.price)}
          helperText={errors.price}
          onChange={handleChange}
          value={form.price}
          disabled={Boolean(status === Statuses.PENDING)}
        />
        <Input
          name="name"
          label="Product name"
          error={Boolean(errors.name)}
          helperText={errors.name}
          onChange={handleChange}
          value={form.name}
          disabled={Boolean(status === Statuses.PENDING)}
        />
        <Input
          name="category"
          label="Category"
          error={Boolean(errors.category)}
          helperText={errors.category}
          onChange={handleChange}
          value={form.category}
          disabled={Boolean(status === Statuses.PENDING)}
        />
        <Input
          name="remains"
          label="Remains"
          error={Boolean(errors.remains)}
          helperText={errors.remains}
          onChange={handleChange}
          value={form.remains}
          disabled={Boolean(status === Statuses.PENDING)}
        />
        <Input
          name="weight"
          label="Weight"
          error={Boolean(errors.weight)}
          helperText={errors.weight}
          onChange={handleChange}
          value={form.weight}
          disabled={Boolean(status === Statuses.PENDING)}
        />
      </ModalInputContainer>
      <DialogActions>
        <StandardButton
          onClick={handleSubmit}
          fullWidth
          disabled={Boolean(status === Statuses.PENDING)}
        >
          Add Product +
        </StandardButton>
      </DialogActions>
    </>
  );
};

export default CreateProduct;
