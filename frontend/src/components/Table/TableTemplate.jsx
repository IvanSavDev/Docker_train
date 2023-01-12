import React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(() => ({
  marginTop: "48px",
  width: "100%",
  overflow: "hidden",
  boxShadow: "none",

  "& .MuiTableContainer-root::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },

  "& .MuiTableContainer-root::-webkit-scrollbar-thumb": {
    backgroundColor: "var(--scroll-color)",
    borderRadius: "100px",
  },
}));

const TableTemplate = ({ children }) => (
  <StyledPaper>
    <TableContainer sx={{ maxHeight: "675px" }}>
      <Table stickyHeader aria-label="customized table">
        {children}
      </Table>
    </TableContainer>
  </StyledPaper>
);

export default TableTemplate;
