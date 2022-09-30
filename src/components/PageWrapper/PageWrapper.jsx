import React from "react";
import styles from './PageWrapper.module.scss';

function PageWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default PageWrapper;
