import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(() => ({
  padding: "19px 32px 19px 32px",
  lineHeight: "1em",
  textTransform: "none",
  backgroundColor: "#5382E7",
}));

const StandardButton = ({ children, ...rest }) => {
  return (
    <StyledButton {...rest} variant="contained" autoFocus>
      {children}
    </StyledButton>
  );
};

export default StandardButton;
