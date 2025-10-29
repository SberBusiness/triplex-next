import React, { useState, useContext, useRef } from "react";
import { StepperStepIcon } from "./StepperStepIcon";
import { isKey } from "../../utils/keyboard";
import { StepperExtendedContext } from "./StepperExtendedContext";
import { EFocusSource } from "../../enums/EFocusSource";
import clsx from "clsx";
import styles from "./styles/StepperStep.module.less";
import { EStepperSize, EStepperStepType } from "./enums";
import { RightBorderArrow } from "./RightBorderArrow";

/** Внутренние составляющие StepperStep. */
interface IStepperStepComposition {
    Icon: typeof StepperStepIcon;
}

/** Свойства компонента StepperStep. */
export interface IStepperStepProps extends React.LiHTMLAttributes<HTMLLIElement> {
    id: string;
    disabled?: boolean;
    /** Иконка, отображающая статус шага. */
    icon?: React.ReactNode;
    /** Ссылка на шаг. */
    forwardedRef?: React.Ref<HTMLLIElement>;
    /** Флаг непройденного шага. */
    isInActiveStep?: boolean;
    /** Тип шага. */
    type: EStepperStepType;
}

/** Компонент StepperStep, шаг в Stepper. */
export const StepperStep: React.FC<IStepperStepProps> & IStepperStepComposition = ({
    children,
    className,
    id,
    isInActiveStep,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseDown,
    onClick,
    disabled,
    icon,
    forwardedRef,
    type,
    ...rest
}) => {
    const { selectedId, size, onSelectStep } = useContext(StepperExtendedContext);
    const [focusSource, setFocusSource] = useState(EFocusSource.NONE);
    const ref = useRef<HTMLLIElement | null>(null);
    const progress = id === selectedId;

    const classNames = clsx(
        styles.stepperStep,
        {
            [styles.active]: progress,
            [styles.inactive]: isInActiveStep,
            [styles.completed]: !progress && !isInActiveStep,
            [styles.disabled]: !!disabled,
            [styles.nonempty]: !!children,
            [styles.error]: !disabled && type === EStepperStepType.ERROR,
            [styles.warning]: !disabled && type === EStepperStepType.WARNING,
            [styles.focusVisible]: focusSource === EFocusSource.KEYBOARD,
            [styles.sm]: size === EStepperSize.SM,
            [styles.md]: size === EStepperSize.MD,
            [styles.lg]: size === EStepperSize.LG,
        },
        className,
    );

    const handleFocus = (event: React.FocusEvent<HTMLLIElement>): void => {
        if (!focusSource && ref.current === event.target) {
            setFocusSource(EFocusSource.KEYBOARD);
        }

        onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLLIElement>): void => {
        if (ref.current !== document.activeElement && ref.current === event.target) {
            setFocusSource(EFocusSource.NONE);
        }

        onBlur?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
        const key = event.code || event.keyCode;

        if (isKey(key, "ENTER")) {
            if (!disabled) {
                onSelectStep(id);
            }
        } else if (isKey(key, "SPACE")) {
            event.preventDefault();
            if (!disabled) {
                onSelectStep(id);
            }
        }

        onKeyDown?.(event);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLLIElement>): void => {
        if (!focusSource) {
            setFocusSource(EFocusSource.MOUSE);
        }

        onMouseDown?.(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        if (!disabled) {
            onSelectStep(id);
        }
        onClick?.(event);
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLLIElement | null) => {
        ref.current = instance;

        if (typeof forwardedRef === "function") {
            forwardedRef(instance);
        } else if (forwardedRef) {
            // eslint-disable-next-line react-hooks/immutability
            (forwardedRef as React.MutableRefObject<HTMLLIElement | null>).current = instance;
        }
    };

    const renderIcon = () => {
        const classNames = clsx(styles.icon, "hoverable", { disabled: !!disabled });

        return <span className={classNames}>{icon}</span>;
    };

    const renderContent = () => (
        <div className={styles.content} data-tx={process.env.npm_package_version}>
            {icon && renderIcon()}
            {children}
        </div>
    );

    return (
        <li
            className={classNames}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-current={progress || undefined}
            role="button"
            {...rest}
            ref={setRef}
        >
            {renderContent()}
            <RightBorderArrow size={size} />
        </li>
    );
};

StepperStep.Icon = StepperStepIcon;
