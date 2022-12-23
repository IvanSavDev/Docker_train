import React from 'react';

import Input from "./Input";

import styles from './InputWithTitle.module.css';

const InputWithTitle = ({ titleName, ...rest }) => {
    return (
        <div>
            <h2 className={styles.fieldName}>{titleName}</h2>
            <Input {...rest} />
        </div>
    );
}

export default InputWithTitle;