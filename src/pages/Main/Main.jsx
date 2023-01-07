import React from "react";

import Header from "../../components/Header/Header";

import styles from "./Main.module.css";
import PieChart from "../../components/Diagrams/PieChart";

const Main = () => {
  return (
    <>
      <Header title="Sales statistics" description="Welcome to CRM dashboard" />
      <div className={styles.container}>
        <PieChart />
      </div>
    </>
  );
};

export default Main;
