import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from '@emotion/styled';

import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { generateId } from '../../../utils/utils';

import styles from './PieChart.module.css';

const StyledItem = styled.li`
  position: relative;
  padding: 0 0 16px 20px;
  width: 100%;
  border-bottom: 1px solid rgba(232, 235, 239, 0.5);
  list-style-type: none;

  &:before {
    content: '';
    position: absolute;
    left: 12px;
    width: 12px;
    height: 12px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    transform: translate(-100%);
  }
`;

const ContainerContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  weight: '100%',
}));

const Chart = ({ data }) => {
  const allUniqCategories = Array.from(
    new Set(data.map((sale) => sale.category)),
  );

  const chartData = allUniqCategories.map((category) =>
    data.reduce(
      (acc, sale) =>
        sale.category !== category
          ? acc
          : {
              name: category,
              value: acc.value + Math.floor(sale.soldItems * sale.price),
              color: sale.color,
            },
      { value: 0 },
    ),
  );

  return (
    <div className={styles.pieChart}>
      <ContainerContent>
        <h2 className={styles.header}>Sales schedule by category</h2>
        {data.length !== 0 ? (
          <div className={styles.wrapper}>
            <div className={styles.wrapperPieChart}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={200} height={200}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map(({ color }) => (
                      <Cell
                        key={color + generateId()}
                        name="Total cost"
                        fill={color}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={CustomTooltip} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className={styles.list}>
              <div className={styles.containerItems}>
                {chartData.map(({ color, name }) => (
                  <StyledItem key={generateId() + name} color={color}>
                    {name}
                  </StyledItem>
                ))}
              </div>
            </ul>
          </div>
        ) : (
          <p className={styles.noSales}>No sales</p>
        )}
      </ContainerContent>
    </div>
  );
};

export default Chart;
