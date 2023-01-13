import React from 'react';

import { formatNumberWithSymbol } from '../../../utils/utils';

import styles from './CustomTooltip.module.css';

const CustomTooltip = ({ active, payload, label, showLabel }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        {showLabel ? <p className={styles.label}>{label}</p> : null}
        <p>{`Total cost : ${formatNumberWithSymbol(payload[0].value, ',')}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
