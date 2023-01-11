import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "../CustomTooltip/CustomTooltip";
import useSales from "../../../hooks/useSales";
import { getMultipleOFFive } from "../../../utils/utils";

import styles from "./BarChart.module.css";

const countTicks = 5;

const Chart = () => {
  const { sales } = useSales();

  const currentYear = new Date().getFullYear();

  const chartData = [
    { name: "Jan", totalCost: 0 },
    { name: "Feb", totalCost: 0 },
    { name: "Mar", totalCost: 0 },
    { name: "Apr", totalCost: 0 },
    { name: "May", totalCost: 0 },
    { name: "Jun", totalCost: 0 },
    { name: "Jul", totalCost: 0 },
    { name: "Aug", totalCost: 0 },
    { name: "Sep", totalCost: 0 },
    { name: "Oct", totalCost: 0 },
    { name: "Nov", totalCost: 0 },
    { name: "Dec", totalCost: 0 },
  ];

  if (sales) {
    Object.values(sales).forEach((sale) => {
      const date = new Date(sale.dateSale);
      const monthNumber = date.getMonth();
      const year = date.getFullYear();

      if (year === currentYear) {
        chartData[monthNumber].totalCost += sale.soldItems * sale.price;
      }
    });
  }

  const maxTotalCost = [...chartData].sort(
    (first, second) => second.totalCost - first.totalCost
  )[0].totalCost;

  const interval = getMultipleOFFive(maxTotalCost) / countTicks;
  console.log(getMultipleOFFive(maxTotalCost));
  const dataForYAxis = Array(countTicks)
    .fill(0)
    .reduce(
      (acc) => {
        const lastValue = acc[acc.length - 1];
        return [...acc, lastValue + interval];
      },
      [0]
    );

  const chartDataWithSizeShadow = chartData.map((data) => ({
    ...data,
    sizeShadow: -interval,
  }));

  return (
    <div className={styles.barChart}>
      <h2 className={styles.header}>Sales Overview</h2>
      <p className={styles.description}>Sales chart for all months this year</p>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
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
            width={80}
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
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
