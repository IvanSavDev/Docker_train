import { styled } from '@mui/material/styles';
import { Drawer } from '@mui/material';

import logo from '../../assets/img/logo.png';

export const Logo = styled('div')(() => ({
  width: '100%',
  minHeight: '26px',
  padding: '0 40px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '80%',
  backgroundPosition: 'center',
  backgroundImage: `url(${logo})`,
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 0 0 0',
    gap: '20px',
  },
  [theme.breakpoints.up('middle')]: {
    display: 'none',
  },
}));
