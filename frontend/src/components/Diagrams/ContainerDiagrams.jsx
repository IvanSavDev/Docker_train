import React from 'react';

import styles from './ContainerDiagrams.module.css';

const ContainerDiagrams = ({ children, ...rest }) => (
  <div {...rest} className={styles.container}>
    {children}
  </div>
);

export default ContainerDiagrams;
