import React from "react";
import clsx from "clsx";
import { EFontWeightTitle, ETitleSize, Title } from "@sberbusiness/triplex-next/components/Typography";
import { Amount, IAmountProps } from "@sberbusiness/triplex-next/components/Amount";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerSum. */
export interface IStatusTrackerSumProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Свойства суммы. Передаются во вложенный компонент Amount как есть. */
    amountProps: IAmountProps;
}

/** Сумма документа для блока заголовка статус-трекера. Рендерится как Title размера H1. */
export const StatusTrackerSum = React.forwardRef<HTMLElement, IStatusTrackerSumProps>(function StatusTrackerSum(
    { className, amountProps, ...restProps },
    ref,
) {
    return (
        <Title
            weight={EFontWeightTitle.SEMIBOLD}
            size={ETitleSize.H1}
            className={clsx(styles.statusTrackerSum, className)}
            {...restProps}
            ref={ref}
        >
            <Amount {...amountProps} />
        </Title>
    );
});

StatusTrackerSum.displayName = "StatusTrackerSum";
