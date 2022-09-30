import React from "react";
import classNames from "classnames";
import styles from "./Header1.module.scss";

function Header1({ text, className }) {
  return <h1 className={classNames(className, styles.header)}>{text}</h1>;
}

export default Header1;
