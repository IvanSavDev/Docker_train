import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { SalesCategory } from './PieChart.styled';

import { generateId, getUniqueValuesByKey } from '../../../utils/utils';
import { updatePieChartData } from '../../../utils/diagramsUtils';

import styles from './PieChart.module.css';

const Chart = ({ data }) => {
  const allUniqCategories = getUniqueValuesByKey(data, 'category');
  const updatedChartData = updatePieChartData(allUniqCategories, data);

  return (
    <div className={styles.pieChart}>
      <div className={styles.containerContent}>
        <h2 className={styles.header}>Sales schedule by category</h2>
        {data.length !== 0 ? (
          <div className={styles.wrapper}>
            <div className={styles.wrapperPieChart}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={200} height={200}>
                  <Pie
                    data={updatedChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {updatedChartData.map(({ color }) => (
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
                {updatedChartData.map(({ color, name }) => (
                  <SalesCategory key={generateId() + name} color={color}>
                    {name}
                  </SalesCategory>
                ))}
              </div>
            </ul>
          </div>
        ) : (
          <p className={styles.noSales}>No sales</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
