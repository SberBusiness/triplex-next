import React from "react";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

/** Свойства компонента ConfirmControls. */
export interface IConfirmControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ConfirmControls: React.FC<IConfirmControlsProps> = ({ children, className, ...htmlDivAttributes }) => (
    <div className={clsx(className, styles.confirmControls)} {...htmlDivAttributes}>
        {children}
    </div>
);

ConfirmControls.displayName = "ConfirmControls";
