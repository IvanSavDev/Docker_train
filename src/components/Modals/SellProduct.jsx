import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import ModalTitle from "./ModalTitle";
import ModalInputContainer from "./ModalInputContainer";
import ModalInput from "./ModalInput";
import { getFormatDate, haveErrors } from "../../utils/utils";
import DialogActions from "@mui/material/DialogActions";
import StandardButton from "../Buttons/StandardButton";
import { useForm } from "../../hooks/useForm";
import { Errors } from "../../consts/consts";
import useSales from "../../hooks/useSales";
import useProducts from "../../hooks/useProducts";
import DateInput from "./DateInput";

const initialStateErrors = { numberProducts: null, dateSale: null };

const initialStateForm = {
  numberProducts: "",
  dateSale: "",
};

const SellProduct = ({ open, closeModal, id }) => {
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({ ...initialStateForm });
  const { addSale } = useSales();
  const { products, updateProduct } = useProducts();

  const handleSubmit = () => {
    const { numberProducts, dateSale } = form;

    const numberProductsAsNumber = Number(numberProducts);
    const resultInsertedDate = String(dateSale["$d"]);
    const oldProduct = products[id];
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
      const date = getFormatDate(resultInsertedDate);

      addSale({
        ...products[id],
        idProduct: id,
        numberProducts: numberProductsAsNumber,
        dateSale: date,
      });

      updateProduct(id, {
        ...products[id],
        remains: products[id].remains - numberProductsAsNumber,
      });

      closeModal();
    } else {
      setErrors(checkedErrors);
    }
  };

  const handleChange = ({ target }) => setForm({ [target.name]: target.value });

  const handleChangeDate = (date) => setForm({ dateSale: date });

  return (
    <ModalContainer open={open} onClose={closeModal}>
      <ModalTitle handleClose={closeModal}>Sell the product</ModalTitle>
      <ModalInputContainer errors={errors}>
        <ModalInput
          name="numberProducts"
          label="Number of products"
          variant="outlined"
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
