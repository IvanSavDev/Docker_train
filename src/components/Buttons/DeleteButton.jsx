import React from "react";
import Button from "@mui/material/Button";
import { ReactComponent as Delete } from "../../assets/img/delete.svg";

const DeleteButton = (props) => {
  return (
    <Button
      {...props}
      size="small"
      sx={{
        minWidth: "28px",
      }}
    >
      <Delete />
    </Button>
  );
};

export default DeleteButton;
