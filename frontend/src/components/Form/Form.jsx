import React from 'react';

import styles from './Form.module.css';

const Form = ({ children, formName, ...rest }) => (
  <form className={styles.form} {...rest}>
    <h1 className={styles.title}>{formName}</h1>
    {children}
  </form>
);

export default Form;
