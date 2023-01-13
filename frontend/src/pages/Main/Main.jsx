import React from 'react';

import Header from '../../components/Header/Header';
import PieChart from '../../components/Diagrams/PieChart/PieChart';
import LineChart from '../../components/Diagrams/LineChart/LineChart';
import BarChart from '../../components/Diagrams/BarChart/BarChart';

import styles from './Main.module.css';

const Main = () => {
  return (
    <>
      <Header title="Sales statistics" description="Welcome to CRM dashboard" />
      <div className={styles.container}>
        <PieChart />
        <LineChart />
        <BarChart />
      </div>
    </>
  );
};

export default Main;
