import React from 'react';
import styles from "../styles/button-style.module.css";

export const ModalDialog = ({
  alertMessage,
  handlePrimaryClick,
  handleSecondaryClick,
  primaryButtonText,
  secondaryButtonText
  }) => {
  return (
  <div className="absolute flex flex-col items-center shadow-lg shadow-[#FFDCD8] justify-center rounded-2xl bg-[#0D0708] text-[#FFDCD8] p-10 top-80">
    <p className="mb-2">{alertMessage}</p>
    <div className="flex justify-around w-full">
      <button className={styles.buttonStyle} type="button" onClick={handlePrimaryClick}>{primaryButtonText}</button>
      <button className={styles.buttonStyle} type="button" onClick={handleSecondaryClick}>{secondaryButtonText}</button>
    </div>
  </div>
  )
}