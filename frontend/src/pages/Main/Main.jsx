import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import CenteringContainer from '../../components/Containers/CenteringContainer';
import Header from '../../components/Header/Header';
import PieChart from '../../components/Diagrams/PieChart/PieChart';
import LineChart from '../../components/Diagrams/LineChart/LineChart';
import BarChart from '../../components/Diagrams/BarChart/BarChart';

import { notifyPageErrors } from '../../utils/notifyErrors';
import { isEmptyObject } from '../../utils/utils';
import { Statuses } from '../../consts/consts';
import { getSales } from '../../store/slices/salesSlice';
import { getUser } from '../../store/slices/userSlice';

import styles from './Main.module.css';

const Main = () => {
  const { sales, status } = useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sales) {
          await dispatch(getSales()).unwrap();
        }
      } catch (error) {
        notifyPageErrors(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEmptyObject(user)) {
          await dispatch(getUser()).unwrap();
        }
      } catch (error) {
        notifyPageErrors(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header title="Sales statistics" description="Welcome to CRM dashboard" />
      {status !== Statuses.PENDING && sales && (
        <div className={styles.container}>
          <PieChart data={sales} />
          <LineChart data={sales} />
          <BarChart data={sales} />
        </div>
      )}
      {status === Statuses.PENDING && (
        <CenteringContainer>
          <CircularProgress />
        </CenteringContainer>
      )}
    </>
  );
};

export default Main;
