import React from 'react';

import styles from './Input.module.css';

const Input = (props) => (
    <input className={styles.field} {...props} />
);

export default Input;