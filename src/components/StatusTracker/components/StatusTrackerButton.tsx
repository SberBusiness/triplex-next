import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { Button, TButtonProps } from "@sberbusiness/triplex-next/components/Button";

/** Компонент кнопки для футера статус-трекера. */
export const StatusTrackerButton: React.FC<TButtonProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <Button className={clsx(styles.statusTrackerButton, className)} {...rest}>
            {children}
        </Button>
    );
};
