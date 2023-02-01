import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)(() => ({
  minWidth: '53px',
  minHeight: '28px',
  backgroundColor: 'rgba(83,130,231,0.1)',
  textTransform: 'none',
  fontSize: '12px',
  lineHeight: '12px',
  fontWeight: 500,
}));
