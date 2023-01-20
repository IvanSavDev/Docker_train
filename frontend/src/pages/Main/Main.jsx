import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

import { getSales } from '../../slices/salesSlice';
import Header from '../../components/Header/Header';
import PieChart from '../../components/Diagrams/PieChart/PieChart';
import LineChart from '../../components/Diagrams/LineChart/LineChart';
import BarChart from '../../components/Diagrams/BarChart/BarChart';
import { FetchErrors, Statuses } from '../../consts/consts';

import styles from './Main.module.css';
import CenteringContainer from '../../components/Containers/CenteringContainer';

const Main = () => {
  const { sales, status } = useSelector((state) => state.sales);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (sales.length === 0) {
        try {
          await dispatch(getSales()).unwrap();
        } catch (error) {
          if (error.status === 401) {
            toast.error(FetchErrors.AUTHORIZATION);
          } else if (error.status === 404) {
            toast.error(FetchErrors.LOAD_DATA);
          } else {
            toast.error(FetchErrors.UNEXPECTED);
          }
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header title="Sales statistics" description="Welcome to CRM dashboard" />
      <div className={styles.container}>
        {status !== Statuses.PENDING && (
          <>
            <PieChart data={sales} />
            <LineChart data={sales} />
            <BarChart data={sales} />
          </>
        )}
        {status === Statuses.PENDING && (
          <CenteringContainer>
            <CircularProgress />
          </CenteringContainer>
        )}
      </div>
    </>
  );
};

export default Main;
