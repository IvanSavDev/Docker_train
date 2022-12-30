import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "../Modals/Modal";
const TableButton = ({ id, children, render, ...rest }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        {...rest}
        size="small"
        sx={{
          backgroundColor: "rgba(83,130,231,0.1)",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "12px",
          minWidth: "53px",
          minHeight: "28px",
        }}
        onClick={handleClickOpen}
      >
        {children}
      </Button>
      <Modal open={open}>
        <div>{render(open, handleClose, id)}</div>
      </Modal>
    </>
  );
};

export default TableButton;
