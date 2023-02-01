import { styled } from '@mui/material/styles';

import Input from './Input';

export const StyledModalInput = styled(Input)(({ error }) => ({
  '& .MuiFormHelperText-root': {
    display: error ? 'block' : 'none',
  },
}));
