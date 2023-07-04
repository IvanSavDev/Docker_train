import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';

import StandardButton from '../Buttons/StandardButton';
import Input from '../Inputs/Input';
import ModalTitle from './ModalTitle';
import ModalInputContainer from './ModalInputContainer';

import { notifyFormsErrors } from '../../utils/notifyErrors';
import {
  formattingNumericValueFromForm,
  getKeysDifferentFields,
  haveErrors,
  isDifferentFields,
  trimObjectValues,
} from '../../utils/utils';
import { productValidation } from '../../validations/productValidation';
import useForm from '../../hooks/useForm';
import { Statuses } from '../../consts/consts';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../store/slices/productsSlice';

const initialStateErrors = {
  store: null,
  price: null,
  name: null,
  category: null,
  remains: null,
  weight: null,
};

const EditProduct = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { products, status } = useSelector((state) => state.products);
  const { extra: productId } = useSelector((state) => state.modal);
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({
    store: '',
    price: '',
    name: '',
    category: '',
    address: '',
    remains: '',
    weight: '',
  });
  const [oldProduct, setOldProduct] = useState({});

  useEffect(() => {
    const foundProduct = products.find((product) => product.id === productId);
    setOldProduct(foundProduct);
    setForm(foundProduct);
  }, [setForm, productId]);

  const handleClose = () => closeModal();

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

    const validationResult = productValidation(updatedForm);
    const isNotErrors = haveErrors(validationResult);

    if (isNotErrors) {
      try {
        setErrors({ ...initialStateErrors });
        const changedFields = getKeysDifferentFields(
          { ...updatedForm, address: oldProduct.address },
          oldProduct,
        );

        if (changedFields.length === 1 && changedFields[0] === 'remains') {
          await dispatch(
            updateProduct({
              id: productId,
              ...updatedForm,
            }),
          ).unwrap();
        } else {
          await dispatch(
            createProduct({
              ...updatedForm,
              address: user.address,
            }),
          ).unwrap();
          await dispatch(deleteProduct(oldProduct.id)).unwrap();
        }
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
          fullWidth
          onClick={handleSubmit}
          disabled={Boolean(
            status === Statuses.PENDING || !isDifferentFields(oldProduct, form),
          )}
        >
          Save changes
        </StandardButton>
      </DialogActions>
    </>
  );
};

export default EditProduct;
