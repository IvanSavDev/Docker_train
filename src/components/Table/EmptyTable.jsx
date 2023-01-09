import React from "react";

import styles from "./EmptyTable.module.css";

const EmptyTable = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default EmptyTable;
