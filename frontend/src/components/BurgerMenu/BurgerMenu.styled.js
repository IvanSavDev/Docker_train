import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export const StyledIconButton = styled(IconButton)(() => ({
  borderRadius: '4px',
  padding: '9px',
  margin: 0,
  '& .MuiTouchRipple-root *': {
    borderRadius: '4px',
  },
}));
