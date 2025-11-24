import React, { useRef } from "react";
import { EStepPosition, EStepStatus } from "./enums";
import { ETooltipAlign, ETooltipSize } from "../Tooltip/enums";
import { Tooltip } from "../Tooltip/Tooltip";
import { Text, ETextSize, EFontWeightText } from "../Typography";
import clsx from "clsx";
import styles from "./styles/Step.module.less";

/** Свойства компонента Step. */
export interface IStepProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Номер шага для отображения в кружке. */
    step: number;
    /** Статус текущего шага. */
    status: EStepStatus;
    /** Позиция шага, относительно других. */
    position?: EStepPosition;
}

const statusToClassNameMap = {
    [EStepStatus.DEFAULT]: styles.default,
    [EStepStatus.ACTIVE]: styles.active,
    [EStepStatus.WARNING]: styles.warning,
    [EStepStatus.ERROR]: styles.error,
    [EStepStatus.DONE]: styles.done,
    [EStepStatus.DISABLED]: styles.disabled,
};

const stepPositionToTooltipAlignMap = {
    [EStepPosition.XFirst]: ETooltipAlign.START,
    [EStepPosition.Default]: ETooltipAlign.CENTER,
    [EStepPosition.XLast]: ETooltipAlign.END,
};

/** Вычисление позиции шага, относительно других. */
export const calcPosition = (stepCount: number, i: number): EStepPosition => {
    if (i === 0) {
        return EStepPosition.XFirst;
    } else if (i + 1 === stepCount) {
        return EStepPosition.XLast;
    } else {
        return EStepPosition.Default;
    }
};

export const Step: React.FC<IStepProps> = ({
    children,
    className,
    step,
    status,
    position = EStepPosition.Default,
    ...rest
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const tooltipAlign = stepPositionToTooltipAlignMap[position];

    const classNames = clsx(styles.step, statusToClassNameMap[status], className);

    const renderContent = () => (
        <div ref={ref} className={classNames} {...rest}>
            <Text size={ETextSize.B1} weight={EFontWeightText.SEMIBOLD}>
                {step}
            </Text>
        </div>
    );

    return children ? (
        <Tooltip size={ETooltipSize.SM} toggleType="hover" alignTip={tooltipAlign} targetRef={ref}>
            <Tooltip.Target>{renderContent()}</Tooltip.Target>
            <Tooltip.Body>{children}</Tooltip.Body>
        </Tooltip>
    ) : (
        renderContent()
    );
};

Step.displayName = "Step";
