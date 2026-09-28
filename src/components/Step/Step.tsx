import React, { useCallback, useRef } from "react";
import clsx from "clsx";
import { EStepPosition, EStepStatus } from "./enums";
import { Tooltip } from "../Tooltip/Tooltip";
import { ETooltipAlign, ETooltipSize } from "../Tooltip/enums";
import { Text, ETextSize, EFontWeightText } from "../Typography";
import { setForwardedRef } from "../../helpers/setForwardedRef";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/Step.module.less";

/** Свойства компонента Step. */
export interface IStepProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер компонента. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Номер шага для отображения в кружке. */
    step: number;
    /** Статус текущего шага. */
    status: EStepStatus;
    /** Позиция шага относительно других. Определяет выравнивание подсказки. По умолчанию EStepPosition.Default. */
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

/**
 * Вычисление позиции шага относительно других.
 *
 * @param stepCount Общее количество шагов.
 * @param i Индекс шага, начиная с нуля.
 * @returns EStepPosition.XFirst для первого шага, EStepPosition.XLast для последнего, иначе EStepPosition.Default.
 */
export const calcPosition = (stepCount: number, i: number): EStepPosition => {
    if (i === 0) {
        return EStepPosition.XFirst;
    } else if (i + 1 === stepCount) {
        return EStepPosition.XLast;
    } else {
        return EStepPosition.Default;
    }
};

/**
 * Шаг — круглый индикатор с номером и цветом по статусу.
 * Если передан children, номер оборачивается в подсказку, раскрывающуюся по наведению.
 */
export const Step = React.forwardRef<HTMLDivElement, IStepProps>(
    (
        { children, className, step, status, position = EStepPosition.Default, size = EComponentSize.MD, ...rest },
        ref,
    ) => {
        const targetRef = useRef<HTMLDivElement | null>(null);

        /** Сохраняет узел шага локально (Tooltip позиционируется относительно него) и пробрасывает во внешний ref. */
        const setRef = useCallback(
            (instance: HTMLDivElement | null) => {
                targetRef.current = instance;
                setForwardedRef(ref, instance);
            },
            [ref],
        );

        const classNames = clsx(styles.step, STATUS_TO_CLASS_NAME_MAP[status], SIZE_TO_CLASS_NAME_MAP[size], className);

        const content = (
            <div ref={setRef} className={classNames} {...rest}>
                <Text size={ETextSize.B1} weight={EFontWeightText.SEMIBOLD}>
                    {step}
                </Text>
            </div>
        );

        return children ? (
            <Tooltip
                size={ETooltipSize.SM}
                toggleType="hover"
                alignTip={STEP_POSITION_TO_TOOLTIP_ALIGN_MAP[position]}
                targetRef={targetRef}
            >
                <Tooltip.Target>{content}</Tooltip.Target>
                <Tooltip.Body>{children}</Tooltip.Body>
            </Tooltip>
        ) : (
            content
        );
    },
);

Step.displayName = "Step";
