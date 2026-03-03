import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { Button, IButtonLinkProps, TButtonProps } from "@sberbusiness/triplex-next/components/Button";

/** Компонент кнопки для футера статус-трекера. */
export const StatusTrackerButton: React.FC<Exclude<TButtonProps, IButtonLinkProps>> = ({
    children,
    className,
    ...rest
}) => (
    <Button className={clsx(styles.statusTrackerButton, className)} block {...rest}>
        {children}
    </Button>
);
