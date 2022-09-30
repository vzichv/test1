import React from "react";
import styles from "./StyledButton.module.scss";
import classNames from "classnames";
import {ReactComponent as LoaderIcon} from './../../assets/images/loader.svg';

function StyledButton({ value, className, isLoading, ...props }) {
  return (
    <button {...props} className={classNames(className, styles.button, isLoading && styles.loading)}>
      {isLoading ? <LoaderIcon className={styles.loader} /> : value}
    </button>
  );
}

export default StyledButton;
