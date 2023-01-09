import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontFamily: "InterBold",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "1em",
  textAlign: "center",
  padding: 0,
  color: theme.palette.custom.main.grey,
}));

const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: (theme) => theme.palette.grey[500],
}));

const ModalTitle = ({ handleClose, children }) => {
  return (
    <StyledDialogTitle>
      {children}
      <StyledIconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </StyledIconButton>
    </StyledDialogTitle>
  );
};

export default ModalTitle;
