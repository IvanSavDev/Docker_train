import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { styled } from '@mui/material/styles';

import ContainerDiagrams from '../ContainerDiagrams';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { getMultipleOFFive, parseDate } from '../../../utils/utils';

import styles from './BarChart.module.css';

const countTicks = 5;

const getWidthYAxis = (maxValue) => {
  const maxValueAsString = String(maxValue);

  if (maxValueAsString.length < 4) {
    return 60;
  }
  if (maxValueAsString.length < 6) {
    return 65;
  }
  if (maxValueAsString.length < 7) {
    return 75;
  }
  if (maxValueAsString.length < 8) {
    return 85;
  }
  if (maxValueAsString.length < 9) {
    return 95;
  }

  return 105;
};

const StyledBarChar = styled(BarChart)(() => ({
  '& .recharts-cartesian-grid line': {
    stroke: 'rgba(232,235,239,0.4)',
  },
}));

const Chart = ({ data }) => {
  const chartData = [
    { name: 'Jan', totalCost: 0 },
    { name: 'Feb', totalCost: 0 },
    { name: 'Mar', totalCost: 0 },
    { name: 'Apr', totalCost: 0 },
    { name: 'May', totalCost: 0 },
    { name: 'Jun', totalCost: 0 },
    { name: 'Jul', totalCost: 0 },
    { name: 'Aug', totalCost: 0 },
    { name: 'Sep', totalCost: 0 },
    { name: 'Oct', totalCost: 0 },
    { name: 'Nov', totalCost: 0 },
    { name: 'Dec', totalCost: 0 },
  ];

  if (data) {
    data.forEach((sale) => {
      const date = parseDate(sale.lastSale);
      const monthNumber = date.getMonth();
      const year = date.getFullYear();
      const currentYear = new Date().getFullYear();

      if (year === currentYear) {
        chartData[monthNumber].totalCost += Math.floor(
          sale.soldItems * sale.price,
        );
      }
    });
  }

  const maxTotalCost = [...chartData].sort(
    (first, second) => second.totalCost - first.totalCost,
  )[0].totalCost;

  const interval = getMultipleOFFive(maxTotalCost) / countTicks;

  const dataForYAxis = Array(countTicks)
    .fill(0)
    .reduce(
      (acc) => {
        const lastValue = acc[acc.length - 1];
        return [...acc, lastValue + interval];
      },
      [0],
    );

  const chartDataWithSizeShadow = chartData.map((value) => ({
    ...value,
    sizeShadow: -interval,
  }));

  return (
    <div className={styles.barChart}>
      <ContainerDiagrams>
        <h2 className={styles.header}>Sales Overview</h2>
        <p className={styles.description}>
          Sales chart for all months this year
        </p>
        <ResponsiveContainer width="100%" height="80%">
          <StyledBarChar
            width={500}
            height={300}
            data={chartDataWithSizeShadow}
            stackOffset="sign"
            margin={{ bottom: 20 }}
            barSize={48}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={17}
              tickCount={7}
              width={getWidthYAxis(maxTotalCost)}
              ticks={dataForYAxis}
              domain={[interval, maxTotalCost]}
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="name"
              tickMargin={27}
              minTickGap="10"
            />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="totalCost" fill="#5B6ACD" stackId="stack" />
            <Bar dataKey="sizeShadow" fill="#EFF1FF" stackId="stack" />
          </StyledBarChar>
        </ResponsiveContainer>
      </ContainerDiagrams>
    </div>
  );
};

export default Chart;
