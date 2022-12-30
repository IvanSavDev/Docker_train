import React from "react";
import Button from "@mui/material/Button";

const ModalButton = ({ children, ...rest }) => {
  return (
    <Button
      {...rest}
      variant="contained"
      autoFocus
      sx={{
        width: "100%",
        paddingTop: "19px",
        paddingBottom: "19px",
        lineHeight: "1em",
        textTransform: "none",
        backgroundColor: "#5382E7",
      }}
    >
      {children}
    </Button>
  );
};

export default ModalButton;
