import React from 'react';

import styles from './Input.module.css';

const Input = ({ titleName, error, containerStyles, ...rest }) => {
    return (
        <div className={containerStyles}>
            {titleName && <h2 className={styles.fieldName}>{titleName}</h2>}
            <input className={styles.field} {...rest} />
            <p className={styles.textError}>{error}</p>
        </div>
    );
};

export default Input;