import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { TableCellStyled } from './TableCell.styled';

const TableHeader = ({ headers }) => (
  <TableHead>
    <TableRow>
      {headers.map((headerName) => (
        <TableCellStyled key={headerName} align="center">
          {headerName}
        </TableCellStyled>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeader;
