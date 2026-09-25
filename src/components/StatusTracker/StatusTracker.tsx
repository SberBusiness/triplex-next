import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import {
    EStatusTrackerType,
    EStatusTrackerVerticalAlign,
} from "@sberbusiness/triplex-next/components/StatusTracker/enums";
import { StatusTrackerMedia } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerMedia";
import { StatusTrackerHeader } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerHeader";
import { StatusTrackerBody } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerBody";
import { StatusTrackerFooter } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerFooter";

/** Свойства компонента StatusTracker. */
export interface IStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип статуса документа. Задаёт цвет декоративного градиента на фоне. */
    type: EStatusTrackerType;
    /** Вертикальное выравнивание контента внутри карточки. По умолчанию EStatusTrackerVerticalAlign.TOP. */
    verticalAlign?: EStatusTrackerVerticalAlign;
    /** Содержимое карточки: StatusTracker.Media, .Header, .Body, .Footer в любом сочетании. */
    children?: React.ReactNode;
}

/** Мапа для получения CSS класса по типу статус-трекера. */
const TYPE_TO_CLASS_NAME_MAP: Record<EStatusTrackerType, string> = {
    [EStatusTrackerType.DRAFT]: styles.draft,
    [EStatusTrackerType.REJECTED]: styles.rejected,
    [EStatusTrackerType.WAITING]: styles.waiting,
    [EStatusTrackerType.WARNING]: styles.warning,
    [EStatusTrackerType.APPROVED]: styles.approved,
};

/**
 * Мапа для получения CSS класса для выравнивания блоков.
 * Значение TOP отсутствует намеренно: это выравнивание по умолчанию и отдельного класса не требует.
 */
const VERTICAL_ALIGN_TO_CLASS_NAME_MAP: Partial<Record<EStatusTrackerVerticalAlign, string>> = {
    [EStatusTrackerVerticalAlign.MIDDLE]: styles.verticalAlignMiddle,
    [EStatusTrackerVerticalAlign.BOTTOM]: styles.verticalAlignBottom,
};

/**
 * Карточка статуса документа: декоративный градиент по типу статуса плюс композиция
 * из блоков Media, Header, Body и Footer.
 */
export const StatusTracker = Object.assign(
    React.forwardRef<HTMLDivElement, IStatusTrackerProps>(function StatusTracker(
        { children, className, type, verticalAlign = EStatusTrackerVerticalAlign.TOP, ...rest },
        ref,
    ) {
        return (
            <div
                className={clsx(styles.statusTrackerWrapper, className)}
                {...rest}
                ref={ref}
                data-tx={process.env.npm_package_version}
            >
                <div className={clsx(styles.statusTrackerBackground, TYPE_TO_CLASS_NAME_MAP[type])} key={type}>
                    <div className={clsx(styles.statusTrackerColor, TYPE_TO_CLASS_NAME_MAP[type])} />
                </div>
                <div className={clsx(styles.statusTracker, VERTICAL_ALIGN_TO_CLASS_NAME_MAP[verticalAlign])}>
                    {children}
                </div>
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
