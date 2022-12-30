import React from 'react';

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Blue', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [9, 4, 19, 5],
            backgroundColor: [
                '#5182E7',
                '#1CAF7F',
                '#5B6ACD',
                '#F4AE43',
            ],
            borderColor: [
                '#5182E7',
                '#1CAF7F',
                '#5B6ACD',
                '#F4AE43',
            ],
            borderWidth: 1,
        },
    ],
    options:{
        title: {
            display: true,
            text: "COVID-19 Cases of Last 3 Months",
            fontSize: 15
        },
        legend: {
            display: true,
            position: "top"
        }
    }
};
const PieChart = () => {
    return (
        <div>
            <h2>Sales schedule by day</h2>
            <Pie data={data} />
            <ul>
                <li></li>
            </ul>
        </div>

    );
};

export default PieChart;