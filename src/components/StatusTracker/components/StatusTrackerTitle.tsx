import React from "react";
import clsx from "clsx";
import { EFontWeightTitle, ETitleSize, Title } from "@sberbusiness/triplex-next/components/Typography";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerTitle. */
export interface IStatusTrackerTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Текст пояснения для блока заголовка статус-трекера. */
export const StatusTrackerTitle: React.FC<IStatusTrackerTitleProps> = (props) => {
    const { children, className, ...rest } = props;

    return (
        <Title
            weight={EFontWeightTitle.BOLD}
            size={ETitleSize.H3}
            className={clsx(styles.statusTrackerTitle, className)}
            {...rest}
        >
            {children}
        </Title>
    );
};
