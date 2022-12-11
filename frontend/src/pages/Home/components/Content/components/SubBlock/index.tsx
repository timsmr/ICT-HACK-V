import React from "react";
import * as I from "./types/interfaces";
import styles from "./index.module.scss";

export const SubBlock = ({ title, columns, children }: I.SubBlockProps) => {
  return (
    <div className={styles.root}>
      <span className={styles.title}>{title}</span>
      <div className={styles.columns}>
        {columns.map((column, index) => (
          <div className={styles.column} key={index}>
            <span
              className={styles.column__title}
              dangerouslySetInnerHTML={{ __html: column.title }}
            />
            <p className={styles.column__text}>{column.text}</p>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
