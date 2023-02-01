import { styled } from '@mui/material/styles';
import { Snackbar } from '@mui/material';

export const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  position: 'absolute',
  left: -410,
  top: 10,
  maxWidth: 300,

  '& .MuiPaper-root': {
    flexWrap: 'nowrap',
    backgroundColor: theme.palette.custom.main.grey,
  },
}));
