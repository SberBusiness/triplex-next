import React, { useRef } from "react";
import { EStepPosition, EStepStatus } from "./enums";
import { ETooltipAlign, ETooltipSize } from "../Tooltip/enums";
import { Tooltip } from "../Tooltip/Tooltip";
import { Text, ETextSize, EFontWeightText } from "../Typography";
import clsx from "clsx";
import styles from "./styles/Step.module.less";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";

/** Свойства компонента Step. */
export interface IStepProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер компонента. */
    size?: EComponentSize;
    /** Номер шага для отображения в кружке. */
    step: number;
    /** Статус текущего шага. */
    status: EStepStatus;
    /** Позиция шага, относительно других. */
    position?: EStepPosition;
}

const STATUS_TO_CLASS_NAME_MAP: Record<EStepStatus, string> = {
    [EStepStatus.DEFAULT]: styles.default,
    [EStepStatus.ACTIVE]: styles.active,
    [EStepStatus.WARNING]: styles.warning,
    [EStepStatus.ERROR]: styles.error,
    [EStepStatus.DONE]: styles.done,
    [EStepStatus.DISABLED]: styles.disabled,
};

const STEP_POSITION_TO_TOOLTIP_ALIGN_MAP: Record<EStepPosition, ETooltipAlign> = {
    [EStepPosition.XFirst]: ETooltipAlign.START,
    [EStepPosition.Default]: ETooltipAlign.CENTER,
    [EStepPosition.XLast]: ETooltipAlign.END,
};

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

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
    size = EComponentSize.MD,
    ...rest
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const tooltipAlign = STEP_POSITION_TO_TOOLTIP_ALIGN_MAP[position];

    const classNames = clsx(styles.step, STATUS_TO_CLASS_NAME_MAP[status], SIZE_TO_CLASS_NAME_MAP[size], className);

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
