import React from 'react';

import styles from "./ContainerSignInAndSignUp.module.css";

const ContainerSignInAndSignUp = ({ children }) => (
    <div className={styles.container}>
        <div className={styles.containerForm}>
            {children}
        </div>
        <div className={styles.backgroundImg}></div>
    </div>
);

export default ContainerSignInAndSignUp;