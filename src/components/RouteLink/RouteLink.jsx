import React from 'react';
import styles from "../SignUp/SignUp.module.css";

const RouteLink = ({ children, ...rest }) => <a {...rest} className={styles.forgotPassword}>{children}</a>

export default RouteLink;