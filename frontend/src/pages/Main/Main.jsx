import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import PieChart from '../../components/Diagrams/PieChart/PieChart';
import LineChart from '../../components/Diagrams/LineChart/LineChart';
import BarChart from '../../components/Diagrams/BarChart/BarChart';

import styles from './Main.module.css';
import { getSales } from '../../slices/salesSlice';

const Main = () => {
  const { sales } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  console.log(sales);

  useEffect(() => {
    if (sales.length === 0) {
      dispatch(getSales());
    }
  }, []);

  return (
    <>
      <Header title="Sales statistics" description="Welcome to CRM dashboard" />
      <div className={styles.container}>
        <PieChart data={sales} />
        <LineChart data={sales} />
        <BarChart data={sales} />
      </div>
    </>
  );
};

export default Main;
