import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { StyledTableCell } from "./StyledTableCell";

const TableHeader = ({ headers }) => (
  <TableHead>
    <TableRow>
      {headers.map((headerName) => (
        <StyledTableCell key={headerName} align="center">
          {headerName}
        </StyledTableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeader;
