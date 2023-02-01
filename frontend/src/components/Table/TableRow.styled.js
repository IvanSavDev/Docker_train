import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export const TableRowStyled = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    minHeight: '54px',
    backgroundColor: '#F8F8F8',
    border: '0',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& .MuiTableCell-root': {
    whiteSpace: 'nowrap',
  },
}));
