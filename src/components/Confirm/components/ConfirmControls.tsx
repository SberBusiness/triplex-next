import React from "react";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

/** Свойства компонента ConfirmControls. */
export interface IConfirmControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер кнопок действий предупреждения. Запрещает перенос кнопок на новую строку. */
export const ConfirmControls = React.forwardRef<HTMLDivElement, IConfirmControlsProps>(
    ({ children, className, ...htmlDivAttributes }, ref) => (
        <div className={clsx(styles.confirmControls, className)} {...htmlDivAttributes} ref={ref}>
            {children}
        </div>
    ),
);

ConfirmControls.displayName = "ConfirmControls";
