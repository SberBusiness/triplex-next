import React from "react";
import clsx from "clsx";
import { EFontWeightTitle, ETitleSize, Title } from "@sberbusiness/triplex-next/components/Typography";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerTitle. */
export interface IStatusTrackerTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Текст заголовка. */
    children?: React.ReactNode;
}

/** Заголовок блока заголовка статус-трекера. Рендерится как Title размера H3 с жирным начертанием. */
export const StatusTrackerTitle = React.forwardRef<HTMLElement, IStatusTrackerTitleProps>(function StatusTrackerTitle(
    { children, className, ...rest },
    ref,
) {
    return (
        <Title
            weight={EFontWeightTitle.BOLD}
            size={ETitleSize.H3}
            className={clsx(styles.statusTrackerTitle, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </Title>
    );
});

StatusTrackerTitle.displayName = "StatusTrackerTitle";
