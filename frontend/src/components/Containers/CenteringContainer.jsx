import React from 'react';

import styles from './CenteringContainer.module.css';

const CenteringContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default CenteringContainer;
