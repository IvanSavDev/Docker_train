import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import ModalTitle from "./ModalTitle";
import ModalInputContainer from "./ModalInputContainer";
import ModalInput from "./ModalInput";
import { getFormatDate, haveErrors } from "../../utils/utils";
import DialogActions from "@mui/material/DialogActions";
import ModalButton from "../Buttons/ModalButton";
import { useForm } from "../../hooks/useForm";
import { Errors } from "../../consts/consts";
import useSales from "../../hooks/useSales";
import useProducts from "../../hooks/useProducts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack, TextField } from "@mui/material";

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
    const resultInsertedDate = String(dateSale.$d);
    const oldProduct = products[id];
    const restProducts = oldProduct.remains - numberProducts;

    const checkedErrors = {
      numberProducts:
        numberProductsAsNumber > 0
          ? restProducts >= 0
            ? null
            : Errors.notEnoughGoods
          : Errors.moreZero,
      dateSale: resultInsertedDate !== "Invalid Date" ? null : Errors.moreZero,
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
      setForm({ ...initialStateForm });
      closeModal();
    }

    setErrors(checkedErrors);
  };

  const handleChange = ({ target }) => setForm({ [target.name]: target.value });

  const handleDate = (date) => {
    setForm({ dateSale: date });
  };

  const handleText = ({ target }) => {
    console.log(target.value);
  };

  const handleClose = () => {
    setForm({ ...initialStateForm });
    setErrors({ ...initialStateErrors });
    closeModal();
  };
  return (
    <ModalContainer open={open} onClose={handleClose}>
      <ModalTitle handleClose={handleClose}>Sell the product</ModalTitle>
      <ModalInputContainer errors={errors}>
        <ModalInput
          name="numberProducts"
          label="Number of products"
          variant="outlined"
          error={Boolean(errors.numberProducts)}
          helperText={errors.numberProducts}
          onChange={handleChange}
          value={form.numberProducts}
          errors={haveErrors(errors)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date of sale"
            inputFormat="DD/MM/YYYY"
            value={form.dateSale}
            onChange={handleDate}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={Boolean(errors.dateSale)}
                helperText={Errors.date}
                sx={{
                  "& .MuiFormHelperText-root": {
                    display: errors.dateSale ? "block" : "none",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </ModalInputContainer>
      <DialogActions>
        <ModalButton onClick={handleSubmit}>Sell product</ModalButton>
      </DialogActions>
    </ModalContainer>
  );
};

export default SellProduct;
