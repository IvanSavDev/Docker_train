import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";

import useSales from "../../hooks/useSales";
import useProducts from "../../hooks/useProducts";
import useForm from "../../hooks/useForm";
import ModalContainer from "./ModalContainer";
import ModalTitle from "./ModalTitle";
import ModalInputContainer from "./ModalInputContainer";
import Input from "../Inputs/Input";
import DateInput from "../Inputs/DateInput";
import StandardButton from "../Buttons/StandardButton";
import { haveErrors } from "../../utils/utils";
import { Errors } from "../../consts/consts";

const initialStateErrors = { numberProducts: null, dateSale: null };

const initialStateForm = {
  numberProducts: "",
  dateSale: "",
};

const SellProduct = ({ open, closeModal, productId }) => {
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({ ...initialStateForm });
  const { sales, addSale, updateSale } = useSales();
  const { products, updateProduct, getProduct } = useProducts();

  const handleSubmit = () => {
    const { numberProducts, dateSale } = form;

    const numberProductsAsNumber = Number(numberProducts);
    const resultInsertedDate = String(dateSale["$d"]);
    const oldProduct = products[productId];
    const restProducts = oldProduct.remains - numberProducts;

    const checkedErrors = {
      numberProducts:
        numberProductsAsNumber > 0
          ? restProducts >= 0
            ? null
            : Errors.notEnoughGoods
          : Errors.moreZero,
      dateSale:
        dateSale !== ""
          ? resultInsertedDate !== "Invalid Date"
            ? null
            : Errors.date
          : Errors.date,
    };

    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      const date = new Date(resultInsertedDate).getTime();
      const product = getProduct(productId);

      const existedSale = sales
        ? Object.values(sales).find((sale) => sale.productId === productId)
        : null;

      if (existedSale) {
        updateSale(existedSale.id, {
          soldItems: existedSale.soldItems + numberProductsAsNumber,
          dateSale: date,
        });
      } else {
        addSale({
          productId,
          accountId: product.accountId,
          productName: product.productName,
          store: product.store,
          address: product.address,
          category: product.category,
          creationDate: product.creationDate,
          price: product.price,
          soldItems: numberProductsAsNumber,
          weight: product.weight,
          dateSale: date,
        });
      }

      updateProduct(productId, {
        ...products[productId],
        remains: products[productId].remains - numberProductsAsNumber,
      });

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
    setErrors((prevState) => ({ ...prevState, dateSale: null }));
    setForm({ dateSale: date });
  };

  return (
    <ModalContainer open={open} onClose={closeModal}>
      <ModalTitle handleClose={closeModal}>Sell the product</ModalTitle>
      <ModalInputContainer errors={errors}>
        <Input
          name="numberProducts"
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
          value={form.dateSale}
          onChange={handleChangeDate}
          error={Boolean(errors.dateSale)}
        />
      </ModalInputContainer>
      <DialogActions>
        <StandardButton fullWidth onClick={handleSubmit}>
          Sell product
        </StandardButton>
      </DialogActions>
    </ModalContainer>
  );
};

export default SellProduct;
