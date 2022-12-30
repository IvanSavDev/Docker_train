import React from "react";
import Dialog from "@mui/material/Dialog";

const ModalContainer = ({ children, ...rest }) => {
  return (
    <Dialog
      {...rest}
      aria-labelledby="customized-dialog-title"
      sx={{
        "& .MuiPaper-root": {
          padding: "64px",
          minWidth: "426px",
        },
        "& .MuiDialogActions-root": {
          padding: 0,
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(28,23,30,0.8)",
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default ModalContainer;
