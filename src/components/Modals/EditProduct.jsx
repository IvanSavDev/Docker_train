import React, { useLayoutEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";

import useForm from "../../hooks/useForm";
import useProducts from "../../hooks/useProducts";
import useAccount from "../../hooks/useAccount";
import StandardButton from "../Buttons/StandardButton";
import Input from "../Inputs/Input";
import ModalTitle from "./ModalTitle";
import ModalInputContainer from "./ModalInputContainer";
import ModalContainer from "./ModalContainer";
import { Errors } from "../../consts/consts";
import { getKeysDifferentFields, haveErrors } from "../../utils/utils";

const EditProduct = ({ open, closeModal, productId }) => {
  const [errors, setErrors] = useState({
    store: null,
    price: null,
    productName: null,
    category: null,
    remains: null,
    weight: null,
  });
  const [form, setForm] = useForm({
    store: "",
    price: "",
    productName: "",
    category: "",
    remains: "",
    weight: "",
  });
  const { getProduct, updateProduct, addProduct, deleteProduct } =
    useProducts();
  const { account } = useAccount();

  useLayoutEffect(() => {
    setForm(getProduct(productId));
  }, [getProduct, setForm, productId]);

  const handleSubmit = () => {
    const { store, price, productName, category, remains, weight } = form;

    const priceAsNumber = Number(price);
    const remainsAsNumber = Number(remains);
    const weightAsNumber = Number(weight);

    const checkedErrors = {
      store: store.length > 0 ? null : Errors.requiredField,
      price: priceAsNumber > 0 ? null : Errors.moreZero,
      productName: productName.length > 0 ? null : Errors.requiredField,
      category: category.length > 0 ? null : Errors.requiredField,
      remains: remainsAsNumber > 0 ? null : Errors.moreZero,
      weight: weightAsNumber > 0 ? null : Errors.moreZero,
    };

    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      const oldProduct = getProduct(productId);
      const changedFields = getKeysDifferentFields(form, oldProduct);
      if (changedFields.length === 1 && changedFields[0] === "remains") {
        updateProduct(productId, { remains: remainsAsNumber });
      } else {
        deleteProduct(oldProduct.id);
        addProduct({
          ...form,
          price: priceAsNumber,
          remains: remainsAsNumber,
          weight: weightAsNumber,
          address: account.address,
        });
      }
      closeModal();
    } else {
      setErrors(checkedErrors);
    }
  };

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  return (
    <ModalContainer open={open} onClose={closeModal}>
      <ModalTitle handleClose={closeModal}>Editing a product</ModalTitle>
      <ModalInputContainer errors={errors}>
        <Input
          name="store"
          label="Store"
          error={Boolean(errors.store)}
          helperText={errors.store}
          onChange={handleChange}
          value={form.store}
          autoFocus
        />
        <Input
          name="price"
          label="Price"
          error={Boolean(errors.price)}
          helperText={errors.price}
          onChange={handleChange}
          value={form.price}
        />
        <Input
          name="productName"
          label="Product name"
          error={Boolean(errors.productName)}
          helperText={errors.productName}
          onChange={handleChange}
          value={form.productName}
        />
        <Input
          name="category"
          label="Category"
          error={Boolean(errors.category)}
          helperText={errors.category}
          onChange={handleChange}
          value={form.category}
        />
        <Input
          name="remains"
          label="Remains"
          error={Boolean(errors.remains)}
          helperText={errors.remains}
          onChange={handleChange}
          value={form.remains}
        />
        <Input
          name="weight"
          label="Weight"
          error={Boolean(errors.weight)}
          helperText={errors.weight}
          onChange={handleChange}
          value={form.weight}
        />
      </ModalInputContainer>
      <DialogActions>
        <StandardButton fullWidth onClick={handleSubmit}>
          Save changes
        </StandardButton>
      </DialogActions>
    </ModalContainer>
  );
};

export default EditProduct;
