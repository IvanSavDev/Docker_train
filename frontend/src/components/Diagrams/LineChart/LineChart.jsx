import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import ContainerDiagrams from '../../Containers/ContainerDiagrams';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

import { formatNumberWithSymbol } from '../../../utils/utils';
import { updateChartData } from '../../../utils/diagramsUtils';

import styles from './LineChart.module.css';

const Chart = ({ data }) => {
  const lineChartData = [
    { name: 'January', totalCost: 0 },
    { name: 'February', totalCost: 0 },
    { name: 'March', totalCost: 0 },
    { name: 'April', totalCost: 0 },
    { name: 'May', totalCost: 0 },
    { name: 'June', totalCost: 0 },
    { name: 'July', totalCost: 0 },
    { name: 'August', totalCost: 0 },
    { name: 'September', totalCost: 0 },
    { name: 'October', totalCost: 0 },
    { name: 'November', totalCost: 0 },
    { name: 'December', totalCost: 0 },
  ];

  const updatedChartData = updateChartData(data, lineChartData);
  const totalCostPerYear = updatedChartData.reduce(
    (acc, value) => acc + value.totalCost,
    0,
  );

  return (
    <div className={styles.lineChart}>
      <ContainerDiagrams>
        <h2 className={styles.header}>Total earned this year</h2>
        <ResponsiveContainer height={50}>
          <LineChart width={377} height={50} data={updatedChartData}>
            <Line
              dataKey="totalCost"
              name="Total cost"
              stroke="#1CAF7F"
              strokeWidth={4}
              dot={false}
            />
            <Tooltip
              content={CustomTooltip}
              cursor={{ strokeWidth: 0 }}
              showLabel
            />
            <XAxis dataKey="name" hide />
          </LineChart>
        </ResponsiveContainer>
        <p className={styles.total}>{`$${formatNumberWithSymbol(
          totalCostPerYear,
          ',',
        )}`}</p>
      </ContainerDiagrams>
    </div>
  );
};

export default Chart;
