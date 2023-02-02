import { styled } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import Button from '@mui/material/Button';

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

export const StyledButton = styled(Button)(() => ({
  minWidth: '28px',
  minHeight: '28xp',
  width: '100%',
  height: '100%',
}));
