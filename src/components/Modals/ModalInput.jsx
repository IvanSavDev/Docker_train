import { styled } from "@mui/material/styles";
import { TextField, Box } from "@mui/material";

const ModalInput = (props) => {
  const { errors, ...rest } = props;
  return (
    <Box
      sx={{
        marginBottom: !props.errors && !props.error ? "27px" : "0",
      }}
    >
      <TextField
        {...rest}
        sx={{
          "&": {
            width: "100%",
          },
          "& .MuiInputBase-input": {
            padding: "16px",
            color: "#2B3844",
          },
          "& .MuiFormHelperText-root": {
            marginBottom: "5px",
          },
          '& .MuiFormLabel-root[data-shrink="false"]': {
            color: "rgba(43,56,68,0.25)",
          },
        }}
      ></TextField>
    </Box>
  );
};

export default ModalInput;
