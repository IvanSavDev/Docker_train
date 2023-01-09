import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "../Modals/Modal";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(() => ({
  backgroundColor: "rgba(83,130,231,0.1)",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "12px",
  minWidth: "53px",
  minHeight: "28px",
}));

const TableButton = ({ productId, render, children, ...rest }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledButton {...rest} size="small" onClick={handleClickOpen}>
        {children}
      </StyledButton>
      <Modal open={open}>
        <div>{render(open, handleClose, productId)}</div>
      </Modal>
    </>
  );
};

export default TableButton;
