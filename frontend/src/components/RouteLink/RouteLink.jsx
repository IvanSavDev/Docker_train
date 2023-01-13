import React from 'react';
import { Link } from 'react-router-dom';

import styles from './RouteLink.module.css';

const RouteLink = ({ children, ...rest }) => (
  <Link {...rest} className={styles.link}>
    {children}
  </Link>
);

export default RouteLink;
