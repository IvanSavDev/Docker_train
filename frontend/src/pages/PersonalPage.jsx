import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';
import ModalContainer from '../components/Modals/ModalContainer';

import styles from './PersonalPage.module.css';

const PersonalPage = () => (
  <div className={styles.container} data-portal="modal">
    <Sidebar />
    <div className={styles.contentWrapper}>
      <Outlet />
      <ModalContainer />
    </div>
  </div>
);

export default PersonalPage;
