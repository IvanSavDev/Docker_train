import React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(() => ({
  width: "100%",
  overflow: "hidden",
  boxShadow: "none",
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
