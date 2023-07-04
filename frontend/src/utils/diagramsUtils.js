import { getMultipleOFFive, parseDate } from './utils';

const COUNT_TICKS = 5;

export const getWidthYAxis = (maxValue) => {
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

export const getInterval = (chartData, maxTotalCost) =>
  getMultipleOFFive(maxTotalCost) / COUNT_TICKS;

export const getDataForYAxis = (chartData, interval) =>
  Array(COUNT_TICKS)
    .fill(0)
    .reduce(
      (acc) => {
        const lastValue = acc[acc.length - 1];
        return [...acc, lastValue + interval];
      },
      [0],
    );

export const updateChartData = (data, chartData) =>
  data.reduce(
    (acc, sale) => {
      const date = parseDate(sale.lastSale);
      const monthNumber = date.getMonth();
      const year = date.getFullYear();
      const currentYear = new Date().getFullYear();
      if (year === currentYear) {
        acc[monthNumber].totalCost += Math.floor(sale.soldItems * sale.price);
      }
      return acc;
    },
    [...chartData],
  );

export const updatePieChartData = (allUniqCategories, data) =>
  allUniqCategories.map((category) => {
    return data.reduce(
      (acc, sale) =>
        sale.category !== category
          ? acc
          : {
              name: category,
              value: acc.value + Math.floor(sale.soldItems * sale.price),
              color: sale.color,
            },
      { value: 0 },
    );
  });
