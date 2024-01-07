import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/button-style.module.css";

export const ModalDialog = ({
  alertMessage,
  handlePrimaryClick = Function.prototype,
  handleSecondaryClick = Function.prototype,
  primaryButtonText,
  secondaryButtonText,
}) => {
  return (
    <div className="h-full w-full fixed flex flex-col items-center justify-center rounded-2xl bg-[#FFDCD8]/90 text-[#0D0708] p-10 top-0">
      <div>
        <p className="mb-2">{alertMessage}</p>
        <div className="flex justify-around w-full">
          <button
            className={styles.buttonStyle}
            type="button"
            onClick={handlePrimaryClick}
          >
            {primaryButtonText}
          </button>
          <button
            className={styles.buttonStyle}
            type="button"
            onClick={handleSecondaryClick}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

ModalDialog.propTypes = {
  alertMessage: PropTypes.string,
  handlePrimaryClick: PropTypes.func,
  handleSecondaryClick: PropTypes.func,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
};
