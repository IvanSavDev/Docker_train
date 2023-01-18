import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import CustomTooltip from '../CustomTooltip/CustomTooltip';
import useSales from '../../../hooks/useSales';
import { generateColor, generateId } from '../../../utils/utils';

import styles from './PieChart.module.css';

const StyledItem = styled.li`
  position: relative;
  padding: 0 0 16px 20px;
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

const Chart = ({ data }) => {
  // const salesValues = sales ? Object.values(sales) : [];

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
              color: generateColor(),
            },
      { value: 0 },
    ),
  );
  console.log(chartData);
  return (
    <div className={styles.pieChart}>
      <h2 className={styles.header}>Sales schedule by category</h2>
      <div className={styles.wrapper}>
        {data.length !== 0 ? (
          <>
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
            <ul className={styles.list}>
              {chartData.map(({ color, name }) => (
                <StyledItem key={generateId() + name} color={color}>
                  {name}
                </StyledItem>
              ))}
            </ul>
          </>
        ) : (
          <p className={styles.notSales}>No sales</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
