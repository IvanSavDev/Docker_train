import { styled } from '@mui/material/styles';
import { BarChart } from 'recharts';

export const StyledBarChart = styled(BarChart)(() => ({
  marginBottom: 20,
  '& .recharts-cartesian-grid line': {
    stroke: 'rgba(232,235,239,0.4)',
  },
}));
