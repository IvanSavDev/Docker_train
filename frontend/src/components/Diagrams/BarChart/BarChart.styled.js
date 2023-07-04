import { styled } from '@mui/material/styles';
import { BarChart } from 'recharts';

export const StyledBarChart = styled(BarChart)(({ theme }) => ({
  marginBottom: 20,
  '& .recharts-cartesian-grid line': {
    stroke: 'rgba(232,235,239,0.4)',
  },
  '& tspan': {
    fontSize: '12px',
    lineHeight: '1em',
  },
  '& text': {
    fill: theme.palette.custom.main.grey,
  },
}));
