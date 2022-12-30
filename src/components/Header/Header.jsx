import React from 'react';

import {ReactComponent as CreateProduct} from '../../assets/img/createProduct.svg';
import Button from "../Buttons/Button";

import styles from "./Header.module.css";

const Header = ({title, description, addProductPage = false, handleClick}) => {
    return (
        <header>
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                {addProductPage &&
                    <Button classNames={styles.button} onClick={handleClick}>
                        <CreateProduct/>
                        Create a product
                    </Button>
                }
            </div>
            <p className={styles.text}>{description}</p>
        </header>
    )
};

export default Header;