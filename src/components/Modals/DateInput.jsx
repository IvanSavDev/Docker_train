import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/material/styles";

import { Errors } from "../../consts/consts";
import ModalInput from "./ModalInput";

const StyledModalInput = styled(ModalInput)(({ error }) => ({
  "& .MuiFormHelperText-root": {
    display: error ? "block" : "none",
  },
}));

const DateInput = ({ error, ...rest }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
      {...rest}
      renderInput={(params) => (
        <StyledModalInput
          {...params}
          variant="outlined"
          error={error}
          helperText={Errors.date}
        />
      )}
    />
  </LocalizationProvider>
);

export default DateInput;
