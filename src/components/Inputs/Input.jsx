import React, { useEffect, useRef } from "react";

import styles from "./Input.module.css";

const Input = ({ titleName, error, containerStyles, autoFocus, ...rest }) => {
  const ref = useRef();

  useEffect(() => {
    if (autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={containerStyles}>
      {titleName && <h2 className={styles.fieldName}>{titleName}</h2>}
      <input className={styles.field} {...rest} ref={ref} />
      <p className={styles.textError}>{error}</p>
    </div>
  );
};

export default Input;
