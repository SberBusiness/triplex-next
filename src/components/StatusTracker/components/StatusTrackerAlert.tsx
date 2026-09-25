import React from "react";
import clsx from "clsx";
import { AlertProcess, IAlertProcessProps } from "@sberbusiness/triplex-next/components/Alert";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { EFontType, ETextSize, Text } from "@sberbusiness/triplex-next/components/Typography";

/** Компонент предупреждения для блока с основным контентом статус-трекера. */
export const StatusTrackerAlert = React.forwardRef<HTMLDivElement, IAlertProcessProps>(function StatusTrackerAlert(
    { children, className, ...rest },
    ref,
) {
    return (
        <AlertProcess className={clsx(styles.statusTrackerAlert, className)} {...rest} ref={ref}>
            <Text type={EFontType.PRIMARY} size={ETextSize.B3}>
                {children}
            </Text>
        </AlertProcess>
    );
});

StatusTrackerAlert.displayName = "StatusTrackerAlert";
