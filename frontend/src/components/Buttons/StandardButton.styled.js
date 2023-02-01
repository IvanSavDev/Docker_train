import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: '19px 32px 19px 32px',
  lineHeight: '1em',
  textTransform: 'none',
  backgroundColor: theme.palette.custom.main.blue,
}));
