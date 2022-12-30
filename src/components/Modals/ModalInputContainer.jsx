import React from "react";
import { haveErrors } from "../../utils/utils";
import DialogContent from "@mui/material/DialogContent";

const ModalInputContainer = ({ errors, children, ...rest }) => {
  return (
    <DialogContent
      {...rest}
      dividers
      sx={{
        "&": {
          display: "flex",
          flexDirection: "column",
          gap: haveErrors(errors) ? "27px" : "0",
          border: "none",
          padding: haveErrors(errors)
            ? "40px 0px 32px 0px !important"
            : "40px 0px 9px 0px !important",
        },
      }}
    >
      {children}
    </DialogContent>
  );
};

export default ModalInputContainer;
