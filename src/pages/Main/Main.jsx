import React from "react";

import Header from "../../components/Header/Header";
import PieChart from "../../components/Diagrams/PieChart";

import styles from "./Main.module.css";

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
