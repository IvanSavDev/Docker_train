import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ModalTitle = ({ handleClose, children }) => {
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        fontWeight: 700,
        fontSize: "28px",
        lineHeight: "28px",
        textAlign: "center",
        padding: 0,
        color: "#2B3844",
      }}
    >
      {children}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default ModalTitle;
