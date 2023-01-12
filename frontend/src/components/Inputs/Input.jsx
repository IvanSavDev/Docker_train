import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  "&": {
    width: "100%",
    marginBottom: error ? "0" : "24px",
  },
  "& .MuiInputBase-input": {
    padding: "16px",
    color: theme.palette.custom.main.grey,
  },
  "& .MuiFormHelperText-root": {
    marginBottom: "1px",
  },
  '& .MuiFormLabel-root[data-shrink="false"]': {
    color: "rgba(43,56,68,0.25)",
  },
  '& .MuiFormLabel-root[data-shrink="true"]': {
    fontSize: "16px",
  },
}));

const ModalInput = ({ error, autoFocus, ...rest }) => {
  const ref = useRef();

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return (
    <StyledTextField inputRef={ref} {...rest} error={error}></StyledTextField>
  );
};

export default ModalInput;
