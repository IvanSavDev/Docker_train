import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import BurgerMenu from '../BurgerMenu/BurgerMenu';

export const StyledBurgerMenu = styled(BurgerMenu)(({ theme }) => ({
  display: 'none',
  paddingInline: 0,

  [theme.breakpoints.down('middle')]: {
    display: 'inline-flex',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  fontSize: '14px',
  textTransform: 'none',
  color: theme.palette.custom.main.grey,
  opacity: 0.4,
  whiteSpace: 'nowrap',

  [theme.breakpoints.down('lessSmall')]: {
    fontSize: 0,

    '& .MuiButton-startIcon': {
      margin: 0,
    },
  },
}));
