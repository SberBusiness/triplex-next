import React from "react";
import clsx from "clsx";
import { AlertProcess, IAlertProcessProps } from "@sberbusiness/triplex-next/components/Alert";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { EFontType, ETextSize, Text } from "@sberbusiness/triplex-next/components/Typography";

/** Компонент предупреждения для блока с основным контентом статус-трекера. */
export const StatusTrackerAlert: React.FC<IAlertProcessProps> = (props) => {
    const { children, className, ...rest } = props;

    return (
        <AlertProcess className={clsx(styles.statusTrackerAlert, className)} {...rest}>
            <Text type={EFontType.PRIMARY} size={ETextSize.B3}>
                {children}
            </Text>
        </AlertProcess>
    );
};
