import { styled } from '@mui/material/styles';
import StandardButton from '../Buttons/StandardButton';

export const StyledBackgroundButton = styled(StandardButton)(() => ({
  gridArea: 'background',
  justifySelf: 'start',
  padding: '10px 10px',
}));
