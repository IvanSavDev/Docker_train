import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';

import styles from './PersonalPage.module.css';
import ModalContainer from '../components/Modals/ModalContainer';

const PersonalPage = () => (
  <div className={styles.container} data-portal="modal">
    <Sidebar />
    <div className={styles.wrapper}>
      <Outlet />
      <ModalContainer />
    </div>
  </div>
);

export default PersonalPage;
