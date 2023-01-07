import React from "react";

import StandardButton from "../Buttons/StandardButton";
import { ReactComponent as CreateProduct } from "../../assets/img/createProduct.svg";

import styles from "./Header.module.css";

const Header = ({
  title,
  description,
  addProductPage = false,
  handleClick,
}) => {
  return (
    <header>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {addProductPage && (
          <StandardButton
            sx={{ gap: "8px", paddingTop: "16px", paddingBottom: "16px" }}
            onClick={handleClick}
          >
            <CreateProduct />
            Create a product
          </StandardButton>
        )}
      </div>
      <p className={styles.text}>{description}</p>
    </header>
  );
};

export default Header;
