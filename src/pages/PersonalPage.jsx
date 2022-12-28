import React from 'react';
import {Outlet} from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";

import styles from './PersonalPage.module.css';

const PersonalPage = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <Outlet />
            </div>

        </div>
    );
};

export default PersonalPage;