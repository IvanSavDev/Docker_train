import React, { useLayoutEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import useForm from '../../hooks/useForm';
import StandardButton from '../Buttons/StandardButton';
import Input from '../Inputs/Input';
import ModalTitle from './ModalTitle';
import ModalInputContainer from './ModalInputContainer';
import { Errors, FetchErrors, Statuses } from '../../consts/consts';
import {
  formatErrors,
  getKeysDifferentFields,
  haveErrors,
} from '../../utils/utils';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../slices/productsSlice';

const checkErrors = (form) => {
  const { store, price, name, category, remains, weight } = form;

  return {
    store: store.length > 0 ? null : Errors.REQUIRED_FIELD,
    price: Number.isInteger(price)
      ? price > 0
        ? null
        : Errors.MORE_ZERO
      : Errors.PRICE_INTEGER,
    name: name.length > 0 ? null : Errors.REQUIRED_FIELD,
    category: category.length > 0 ? null : Errors.REQUIRED_FIELD,
    remains: remains > 0 ? null : Errors.MORE_ZERO,
    weight: weight > 0 ? null : Errors.MORE_ZERO,
  };
};

const initialStateErrors = {
  store: null,
  price: null,
  name: null,
  category: null,
  remains: null,
  weight: null,
};

const initialStateForm = {
  store: '',
  price: '',
  name: '',
  category: '',
  address: '',
  remains: '',
  weight: '',
};

const EditProduct = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { extra: productId } = useSelector((state) => state.modal);
  const [errors, setErrors] = useState(initialStateErrors);
  const [form, setForm] = useForm(initialStateForm);
  const [fetch, setFetch] = useState(false);

  useLayoutEffect(() => {
    setForm(products.find((product) => product.id === productId));
  }, [setForm, productId]);

  const handleClose = () => {
    if (!fetch) {
      closeModal();
    }
  };

  const handleSubmit = async () => {
    const { price, remains, weight } = form;

    const priceAsNumber = Number(price);
    const remainsAsNumber = Number(remains);
    const weightAsNumber = Number(weight);

    const updatedForm = {
      ...form,
      price: priceAsNumber,
      remains: remainsAsNumber,
      weight: weightAsNumber,
    };

    const checkedErrors = checkErrors(updatedForm);
    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      const oldProduct = products.find((product) => product.id === productId);
      const changedFields = getKeysDifferentFields(
        { ...form, address: oldProduct.address },
        oldProduct,
      );

      try {
        setFetch(true);
        if (changedFields.length === 1 && changedFields[0] === 'remains') {
          await dispatch(
            updateProduct({
              id: productId,
              ...updatedForm,
            }),
          ).unwrap();
        } else {
          await dispatch(deleteProduct(oldProduct.id)).unwrap();
          await dispatch(
            createProduct({
              ...updatedForm,
              address: user.address,
            }),
          ).unwrap();
        }
        console.log('clos');
        setFetch(false);
        closeModal();
      } catch (error) {
        const formattedErrors = formatErrors(error.errors);
        if (error.status === 401) {
          toast.error(FetchErrors.AUTHORIZATION);
        }
        if (error.status === 400) {
          setErrors((prevState) => ({
            ...prevState,
            ...formattedErrors,
          }));
        } else {
          toast.error(FetchErrors.UNEXPECTED);
        }
      }
      setFetch(false);
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
      <ModalTitle handleClose={handleClose}>Editing a product</ModalTitle>
      <ModalInputContainer>
        <Input
          name="store"
          label="Store"
          error={Boolean(errors.store)}
          helperText={errors.store}
          onChange={handleChange}
          value={form.store}
          autoFocus
          disabled={fetch}
        />
        <Input
          name="price"
          label="Price"
          error={Boolean(errors.price)}
          helperText={errors.price}
          onChange={handleChange}
          value={form.price}
          disabled={fetch}
        />
        <Input
          name="name"
          label="Product name"
          error={Boolean(errors.name)}
          helperText={errors.name}
          onChange={handleChange}
          value={form.name}
          disabled={fetch}
        />
        <Input
          name="category"
          label="Category"
          error={Boolean(errors.category)}
          helperText={errors.category}
          onChange={handleChange}
          value={form.category}
          disabled={fetch}
        />
        <Input
          name="remains"
          label="Remains"
          error={Boolean(errors.remains)}
          helperText={errors.remains}
          onChange={handleChange}
          value={form.remains}
          disabled={fetch}
        />
        <Input
          name="weight"
          label="Weight"
          error={Boolean(errors.weight)}
          helperText={errors.weight}
          onChange={handleChange}
          value={form.weight}
          disabled={fetch}
        />
      </ModalInputContainer>
      <DialogActions>
        <StandardButton fullWidth onClick={handleSubmit} disabled={fetch}>
          Save changes
        </StandardButton>
      </DialogActions>
    </>
  );
};

export default EditProduct;
