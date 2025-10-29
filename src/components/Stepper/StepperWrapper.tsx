import React from "react";
import clsx from "clsx";
import styles from "./styles/StepperWrapper.module.less";

/** Компонент StepperWrapper, обёртка для Stepper. */
export const StepperWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
    const classNames = clsx(styles.stepperWrapper, className);

    return (
        <div className={classNames} {...rest} data-tx={process.env.npm_package_version}>
            {children}
        </div>
    );
};
