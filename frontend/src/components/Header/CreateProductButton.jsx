import { styled } from '@mui/material/styles';

import StandardButton from '../Buttons/StandardButton';

export const CreateProductButton = styled(StandardButton)(({ theme }) => ({
  gridArea: 'addProduct',
  justifySelf: 'end',
  paddingTop: '16px',
  paddingBottom: '16px',

  [theme.breakpoints.down('lessSmall')]: {
    justifySelf: 'start',
  },
}));
