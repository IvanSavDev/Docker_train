import React from "react";

import styles from "./CustomTooltip.module.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p>{`Total cost : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
