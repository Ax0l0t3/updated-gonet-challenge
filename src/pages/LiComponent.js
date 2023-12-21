import React from "react";
import styles from "../styles/checkbox-style.module.css";

export const LiComponent = () => {
  return (
    <li>
      <div className="border-b-2 flex items-center">
        <p className="mx-2 mb-1">Image</p>
        <p>Title</p>
        <label className={styles.container}>
          <input id="1234567890" className={styles.thisInput} type="checkbox" />
          <div className={styles.forCheckbox} />
        </label>
      </div>
    </li>
  );
};
