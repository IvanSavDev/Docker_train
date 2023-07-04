import React from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import ContainerDiagrams from '../../Containers/ContainerDiagrams';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

import {
  getDataForYAxis,
  getInterval,
  getWidthYAxis,
  updateChartData,
} from '../../../utils/diagramsUtils';

import styles from './BarChart.module.css';
import { StyledBarChart } from './BarChart.styled';

const Chart = ({ data }) => {
  const barChartData = [
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

  const updatedChartData = updateChartData(data, barChartData);
  const maxTotalCost = [...updatedChartData].sort(
    (first, second) => second.totalCost - first.totalCost,
  )[0].totalCost;
  const interval = getInterval(updatedChartData, maxTotalCost);
  const dataForYAxis = getDataForYAxis(updatedChartData, interval);
  const chartDataWithSizeShadow = updatedChartData.map((value) => ({
    ...value,
    sizeShadow: -interval,
  }));
  const widthForYAxis = getWidthYAxis(maxTotalCost);

  return (
    <div className={styles.barChart}>
      <ContainerDiagrams>
        <h2 className={styles.header}>Sales Overview</h2>
        <p className={styles.description}>
          Sales chart for all months this year
        </p>
        <ResponsiveContainer width="100%" height="80%">
          <StyledBarChart
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
              width={widthForYAxis}
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
          </StyledBarChart>
        </ResponsiveContainer>
      </ContainerDiagrams>
    </div>
  );
};

export default Chart;
