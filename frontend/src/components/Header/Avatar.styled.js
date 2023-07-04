import { styled } from '@mui/material/styles';
import { Fab } from '@mui/material';

export const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  width: 30,
  height: 30,
  minHeight: 'auto',
  backgroundColor: theme.palette.custom.main.blue,
}));
