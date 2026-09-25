import React from "react";
import clsx from "clsx";
import { EFontType, ETextSize, Text } from "@sberbusiness/triplex-next/components/Typography";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerDescription. */
export interface IStatusTrackerDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Текст пояснения. */
    children?: React.ReactNode;
}

/** Текст пояснения для блока заголовка или футера статус-трекера. */
export const StatusTrackerDescription = React.forwardRef<HTMLElement, IStatusTrackerDescriptionProps>(
    function StatusTrackerDescription({ children, className, ...rest }, ref) {
        return (
            <Text
                type={EFontType.SECONDARY}
                size={ETextSize.B3}
                className={clsx(styles.statusTrackerDescription, className)}
                {...rest}
                ref={ref}
            >
                {children}
            </Text>
        );
    },
);

StatusTrackerDescription.displayName = "StatusTrackerDescription";
