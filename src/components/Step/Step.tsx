import React, { useRef } from "react";
import { EStepPosition, EStepStatus } from "./enums";
import { ETooltipAlign, ETooltipSize } from "../Tooltip/enums";
import { Tooltip } from "../Tooltip/Tooltip";
import clsx from "clsx";
import styles from "./styles/Step.module.less";

/** Свойства компонента Step. */
export interface IStepMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Номер шага для отображения в кружке. */
    step: number;
    /** Статус текущего шага. */
    status: EStepStatus;
    /** Позиция шага, относительно других. */
    position?: EStepPosition;
}

const statusToClassNameMap = {
    [EStepStatus.WAIT]: styles.wait,
    // [EStepStatus.WARNING]: styles.warning,
    // [EStepStatus.ERROR]: styles.error,
    [EStepStatus.SUCCESS]: styles.success,
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

/** Компонент маркера шага (цифра в кружке). */
export const Step: React.FC<IStepMarkerProps> = ({
    children,
    className,
    step,
    status,
    position = EStepPosition.Default,
    ...rest
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const tooltipAlign = stepPositionToTooltipAlignMap[position];

    const renderContent = () => (
        <div ref={ref} className={clsx(styles.globalStep, statusToClassNameMap[status], className)} {...rest}>
            {step}
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
