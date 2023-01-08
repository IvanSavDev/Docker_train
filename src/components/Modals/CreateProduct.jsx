import React, { useState } from "react";

import DialogActions from "@mui/material/DialogActions";
import { useForm } from "../../hooks/useForm";
import { Errors } from "../../consts/consts";
import {
  capitalizeFirstLetter,
  getFormatDate,
  haveErrors,
} from "../../utils/utils";
import StandardButton from "../Buttons/StandardButton";
import ModalInput from "./ModalInput";
import ModalTitle from "./ModalTitle";
import ModalInputContainer from "./ModalInputContainer";
import ModalContainer from "./ModalContainer";
import useAccount from "../../hooks/useAccount";
import useProducts from "../../hooks/useProducts";

const initialStateForm = {
  store: "",
  price: "",
  productName: "",
  category: "",
  remains: "",
  weight: "",
};

const initialStateErrors = {
  store: null,
  price: null,
  productName: null,
  category: null,
  remains: null,
  weight: null,
};

const fieldsNames = [
  "store",
  "price",
  "productName",
  "category",
  "remains",
  "weight",
];

const CreateProduct = ({ open, closeModal }) => {
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({ ...initialStateForm });
  const { addProduct } = useProducts();
  const { account } = useAccount();
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
      addProduct({
        productName,
        store,
        address: account.address || "-",
        category,
        creationDate: getFormatDate(),
        price: priceAsNumber,
        remains: remainsAsNumber,
        weight: weightAsNumber,
      });
      closeModal();
    }

    setErrors(checkedErrors);
  };

  const handleChange = ({ target }) => setForm({ [target.name]: target.value });

  const handleClose = () => {
    setForm({ ...initialStateForm });
    setErrors({ ...initialStateErrors });
    closeModal();
  };

  return (
    <ModalContainer open={open} onClose={handleClose}>
      <ModalTitle handleClose={handleClose}>Creating a product</ModalTitle>
      <ModalInputContainer>
        {fieldsNames.map((fieldName, index) => (
          <ModalInput
            key={fieldName}
            id={fieldName}
            name={fieldName}
            label={capitalizeFirstLetter(fieldName)}
            variant="outlined"
            error={Boolean(errors[fieldName])}
            helperText={errors[fieldName]}
            onChange={handleChange}
            value={form[fieldName]}
            autoFocus={index === 0}
          />
        ))}
      </ModalInputContainer>
      <DialogActions>
        <StandardButton onClick={handleSubmit} fullWidth>
          Add Product +
        </StandardButton>
      </DialogActions>
    </ModalContainer>
  );
};

export default CreateProduct;
