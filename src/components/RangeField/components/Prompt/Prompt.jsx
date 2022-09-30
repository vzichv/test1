import React from "react";
import styles from './Prompt.module.scss';
import classNames from "classnames";

function Prompt({ text, className}) {
  return <span className={classNames(className, styles.prompt)}>{text}</span>;
}

export default Prompt;
