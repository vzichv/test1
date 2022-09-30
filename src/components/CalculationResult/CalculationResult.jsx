import React from "react";
import styles from "./CalculationResult.module.scss";

function CalculationResult({ title, result, currency = "₽" }) {
  return (
    <div className={styles.block}>
      <span className={styles.title}>{title}</span>
      <div className={styles.result}>
        {typeof(result) === 'number' && result > 0 ? result.toLocaleString("ru-RU") : 0} <span>{currency}</span>
      </div>
    </div>
  );
}

export default CalculationResult;
