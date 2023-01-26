import { styled } from '@mui/material/styles';

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
