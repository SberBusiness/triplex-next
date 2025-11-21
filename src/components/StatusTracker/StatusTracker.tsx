import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { EStatusTrackerType, EVerticalAlign } from "@sberbusiness/triplex-next/components/StatusTracker/enums";
import { StatusTrackerMedia } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerMedia";
import { StatusTrackerHeader } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerHeader";
import { StatusTrackerBody } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerBody";
import { StatusTrackerFooter } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerFooter";

/** Свойства компонента StatusTracker. */
export interface IStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    type: EStatusTrackerType;
    verticalAlign?: EVerticalAlign;
}

/** Мапа для получения CSS класса по типу статус-трекера. */
const typeToClassNameMap: Partial<Record<EStatusTrackerType, string>> = {
    [EStatusTrackerType.REJECTED]: styles.rejected,
    [EStatusTrackerType.WAITING]: styles.waiting,
    [EStatusTrackerType.WARNING]: styles.warning,
    [EStatusTrackerType.APPROVED]: styles.approved,
};

/** Мапа для получения CSS класса для выравнивания блоков. */
const verticalAlignToClassNameMap: Partial<Record<EVerticalAlign, string>> = {
    [EVerticalAlign.MIDDLE]: styles.verticalAlignMiddle,
    [EVerticalAlign.BOTTOM]: styles.verticalAlignBottom,
};

/**
 * Компонент предназначен для визуального отображения статуса документа.
 */
export const StatusTracker = Object.assign(
    React.forwardRef<HTMLDivElement, IStatusTrackerProps>(function StatusTracker(
        { children, className, type, verticalAlign = EVerticalAlign.TOP, ...rest },
        ref,
    ) {
        return (
            <div
                className={clsx(styles.statusTrackerWrapper, className)}
                {...rest}
                ref={ref}
                data-tx={process.env.npm_package_version}
            >
                <div className={clsx(styles.statusTrackerBackground, typeToClassNameMap[type])} key={type}>
                    <div className={clsx(styles.statusTrackerColor, typeToClassNameMap[type])} />
                </div>
                <div className={clsx(styles.statusTracker, verticalAlignToClassNameMap[verticalAlign])}>{children}</div>
            </div>
        );
    }),
    {
        Media: StatusTrackerMedia,
        Header: StatusTrackerHeader,
        Body: StatusTrackerBody,
        Footer: StatusTrackerFooter,
    },
);
StatusTracker.displayName = "StatusTracker";
