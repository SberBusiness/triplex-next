import React from "react";
import { EStepperSize } from "./enums";
import { StepperExtendedContext } from "./StepperExtendedContext";
import { StepperWrapper } from "./StepperWrapper";
import { StepperStep } from "./StepperStep";
import clsx from "clsx";
import styles from "./styles/StepperExtended.module.less";

/** Внутренние составляющие StepperExtended. */
interface IStepperExtendedComposition {
    Step: typeof StepperStep;
    Wrapper: typeof StepperWrapper;
}

/** Свойства компонента StepperExtended. */
export interface IStepperExtendedProps extends React.HTMLAttributes<HTMLOListElement> {
    /** Размер Stepper. */
    size?: EStepperSize;
    /** Уникальный идентификатор выбранного шага. */
    selectedStepId?: string;
    /** Обработчик выбора шага. */
    onSelectStep: (id: string) => void;
    /** Ссылка на список шагов. */
    forwardedRef?: React.Ref<HTMLOListElement>;
}

/** Компонент StepperExtended, расширенная версия Stepper. */
export const StepperExtended: React.FC<IStepperExtendedProps> & IStepperExtendedComposition = ({
    children,
    className,
    size = EStepperSize.SM,
    onSelectStep,
    selectedStepId,
    forwardedRef,
    ...rest
}) => {
    const classNames = clsx(styles.stepperExtended, className);

    const handleSelect = (id: string) => onSelectStep(id);

    return (
        <StepperExtendedContext.Provider value={{ onSelectStep: handleSelect, selectedId: selectedStepId, size }}>
            <ol className={classNames} role="tablist" {...rest} ref={forwardedRef}>
                {children}
            </ol>
        </StepperExtendedContext.Provider>
    );
};

StepperExtended.Step = StepperStep;
StepperExtended.Wrapper = StepperWrapper;
