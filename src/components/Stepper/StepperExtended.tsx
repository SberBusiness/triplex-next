import React, { useCallback, useMemo } from "react";
import clsx from "clsx";
import { StepperStep } from "./StepperStep";
import { StepperExtendedContext } from "./StepperExtendedContext";
import { IStepperExtendedProps } from "./types";
import { setForwardedRef } from "../../helpers/setForwardedRef";
import { EComponentSize } from "../../enums";
import styles from "./styles/StepperExtended.module.less";

/**
 * Компонент StepperExtended, базовый степпер: список шагов без карусели и кнопок прокрутки.
 * Шаги потребитель передаёт сам через `StepperExtended.Step`. Готовый вариант с прокруткой — `Stepper`.
 */
export const StepperExtended = Object.assign(
    React.forwardRef<HTMLOListElement, IStepperExtendedProps>(
        (
            {
                children,
                className,
                size = EComponentSize.LG,
                onSelectStep,
                selectedStepId,
                forwardedRef,
                ...htmlOlAttributes
            },
            ref,
        ) => {
            const contextValue = useMemo(
                () => ({ selectedId: selectedStepId, size, onSelectStep }),
                [selectedStepId, size, onSelectStep],
            );

            // Компонент поддерживает и ref, и исторический prop forwardedRef — оба указывают на один и тот же <ol>.
            const setRef = useCallback(
                (instance: HTMLOListElement | null) => {
                    setForwardedRef(ref, instance);
                    setForwardedRef(forwardedRef, instance);
                },
                [ref, forwardedRef],
            );

            return (
                <StepperExtendedContext.Provider value={contextValue}>
                    <ol
                        className={clsx(styles.stepperExtended, className)}
                        role="tablist"
                        {...htmlOlAttributes}
                        ref={setRef}
                    >
                        {children}
                    </ol>
                </StepperExtendedContext.Provider>
            );
        },
    ),
    { Step: StepperStep },
);

StepperExtended.displayName = "StepperExtended";
