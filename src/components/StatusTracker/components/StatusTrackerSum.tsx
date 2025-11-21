import React from "react";
import clsx from "clsx";
import { EFontWeightTitle, ETitleSize, Title } from "@sberbusiness/triplex-next/components/Typography";
import { Amount, IAmountProps } from "@sberbusiness/triplex-next/components/Amount";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerSum. */
export interface IStatusTrackerSumProps extends React.HTMLAttributes<HTMLDivElement> {
    amountProps: IAmountProps;
}

/** Компонент суммы для блока заголовка статус-трекера. */
export const StatusTrackerSum: React.FC<IStatusTrackerSumProps> = (props) => {
    const { className, amountProps, ...restProps } = props;

    return (
        <Title
            weight={EFontWeightTitle.SEMIBOLD}
            size={ETitleSize.H1}
            className={clsx(styles.statusTrackerSum, className)}
            {...restProps}
        >
            <Amount {...amountProps} />
        </Title>
    );
};
