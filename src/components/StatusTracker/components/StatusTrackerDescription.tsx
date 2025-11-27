import React from "react";
import clsx from "clsx";
import { EFontType, ETextSize, Text } from "@sberbusiness/triplex-next/components/Typography";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerDescription. */
export interface IStatusTrackerDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Текст пояснения для блока заголовка статус-трекера. */
export const StatusTrackerDescription: React.FC<IStatusTrackerDescriptionProps> = (props) => {
    const { children, className, ...rest } = props;

    return (
        <Text
            type={EFontType.SECONDARY}
            size={ETextSize.B3}
            className={clsx(styles.statusTrackerDescription, className)}
            {...rest}
        >
            {children}
        </Text>
    );
};
