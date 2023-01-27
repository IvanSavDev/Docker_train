import React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(() => ({
  width: '100%',
  marginTop: '16px',
  overflow: 'hidden',
  boxShadow: 'none',
  flexGrow: 1,
  backgroundColor: 'transparent',

  '& .MuiTableContainer-root::-webkit-scrollbar': {
    width: '15px',
    height: '15px',
  },

  '& .MuiTableContainer-root::-webkit-scrollbar-thumb': {
    borderRadius: '100px',
    backgroundClip: 'content-box',
    border: '6px solid transparent',
    backgroundColor: 'var(--scroll-color)',
  },
}));

const StyledTable = styled(Table)(() => ({
  backgroundColor: '#FFF',
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  maxHeight: '100%',
}));

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
