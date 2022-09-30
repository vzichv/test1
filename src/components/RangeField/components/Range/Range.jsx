import React from "react";
import styles from "./Range.module.scss";

function Range({ min, max, value, onChange, disabled }) {
  return (
    <input
      className={styles.rangeInput}
      type="range"
      min={min}
      max={max}
      value={Number(value) || min}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

export default Range;
