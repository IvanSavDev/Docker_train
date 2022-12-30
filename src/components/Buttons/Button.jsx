import React from 'react';

import styles from "./Button.module.css";

const Button = ({ children, classNames, ...rest }) => <button {...rest} className={`${styles.button} ${classNames}`}>{children}</button>;

export default Button;