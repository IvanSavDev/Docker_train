import React from 'react';

import {
  StyledPaper,
  StyledTable,
  StyledTableContainer,
} from './TableTemplate.styled';

const TableTemplate = ({ children }) => (
  <StyledPaper>
    <StyledTableContainer>
      <StyledTable stickyHeader aria-label="customized table">
        {children}
      </StyledTable>
    </StyledTableContainer>
  </StyledPaper>
);

export default TableTemplate;
