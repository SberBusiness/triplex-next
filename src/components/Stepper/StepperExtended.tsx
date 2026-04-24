import React, { useMemo } from "react";
import clsx from "clsx";
import { StepperStep } from "./StepperStep";
import { StepperExtendedContext } from "./StepperExtendedContext";
import { IStepperExtendedProps } from "./types";
import { EComponentSize } from "../../enums";
import styles from "./styles/StepperExtended.module.less";

/** Внутренние составляющие StepperExtended. */
interface IStepperExtendedComposition {
    Step: typeof StepperStep;
}

/** Компонент StepperExtended, расширенная версия Stepper. */
export const StepperExtended: React.FC<IStepperExtendedProps> & IStepperExtendedComposition = ({
    children,
    className,
    size = EComponentSize.LG,
    onSelectStep,
    selectedStepId,
    forwardedRef,
    ...rest
}) => {
    const classNames = clsx(styles.stepperExtended, className);

    const contextValue = useMemo(
        () => ({ selectedId: selectedStepId, size, onSelectStep }),
        [selectedStepId, size, onSelectStep],
    );

    return (
        <StepperExtendedContext.Provider value={contextValue}>
            <ol className={classNames} role="tablist" {...rest} ref={forwardedRef}>
                {children}
            </ol>
        </StepperExtendedContext.Provider>
    );
};

StepperExtended.Step = StepperStep;
