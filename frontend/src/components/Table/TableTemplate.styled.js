import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

export const StyledPaper = styled(Paper)(() => ({
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

export const StyledTable = styled(Table)(() => ({
  backgroundColor: '#FFF',
}));

export const StyledTableContainer = styled(TableContainer)(() => ({
  maxHeight: '100%',
}));
