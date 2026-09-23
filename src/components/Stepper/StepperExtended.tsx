import React, { useCallback, useMemo } from "react";
import clsx from "clsx";
import { StepperStep } from "./StepperStep";
import { StepperExtendedContext } from "./StepperExtendedContext";
import { IStepperExtendedProps } from "./types";
import { setForwardedRef } from "../../helpers/setForwardedRef";
import { EComponentSize } from "../../enums";
import styles from "./styles/StepperExtended.module.less";

/** Внутренние составляющие StepperExtended. */
interface IStepperExtendedComposition {
    Step: typeof StepperStep;
}

const StepperExtendedRoot = React.forwardRef<HTMLOListElement, IStepperExtendedProps>(
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
);

StepperExtendedRoot.displayName = "StepperExtended";

/**
 * Компонент StepperExtended, базовый степпер: список шагов без карусели и кнопок прокрутки.
 * Шаги потребитель передаёт сам через `StepperExtended.Step`. Готовый вариант с прокруткой — `Stepper`.
 */
// Тип объявлен явно: без аннотации declaration emit падает с TS4023 — выведенный тип
// сослался бы на внутренний интерфейс композиции из StepperStep, который не экспортируется.
export const StepperExtended: React.ForwardRefExoticComponent<
    IStepperExtendedProps & React.RefAttributes<HTMLOListElement>
> &
    IStepperExtendedComposition = Object.assign(StepperExtendedRoot, {
    Step: StepperStep,
} satisfies IStepperExtendedComposition);
