import React, { useContext, useEffect, useRef } from "react";
import clsx from "clsx";
import { Checkbox, ICheckboxProps } from "../../Checkbox/Checkbox";
import { CheckboxTreeExtendedContext } from "../CheckboxTreeExtendedContext";
import { isStaticCheckboxTreeExtended } from "../isStaticCheckboxTreeExtended";
import styles from "../styles/CheckboxTreeExtended.module.less";

/** Свойства CheckboxTreeExtendedCheckbox. */
interface ICheckboxTreeExtendedCheckboxProps extends ICheckboxProps {
    /** Текущая нода является активной при перемещении с клавиатуры. */
    active?: boolean;
    /** Текущая нода раскрыта. Не влияет на отрисовку, принимается из render-функции ноды. */
    opened?: boolean;
}

/**
 * Обертка над базовым компонентом чекбокс.
 * Используется для фокуса чекбокса при перемещении с клавиатуры.
 */
export const CheckboxTreeExtendedCheckbox: React.FC<ICheckboxTreeExtendedCheckboxProps> = ({
    active,
    className,
    // Исключается из checkboxProps, чтобы не попасть в атрибуты input.
    opened,
    labelAttributes,
    ...checkboxProps
}) => {
    const checkboxNode = useRef<HTMLInputElement | null>(null);
    const { size } = useContext(CheckboxTreeExtendedContext);
    const classNamesLabel = clsx(styles.checkboxTreeCheckboxLabel, labelAttributes?.className);

    // Триггер фокуса на чекбоксе при изменении флага активности при перемещении по дереву с клавиатуры. Если нода имеет дочерние ноды, то фокус получает не чекбокс, а CheckboxTreeExtendedArrow.
    useEffect(() => {
        if (!active) {
            return;
        }

        // При взаимодействии мышью триггер фокуса не нужен.
        if (!document.activeElement?.contains(checkboxNode.current)) {
            checkboxNode.current?.focus();
        }
    }, [active]);

    const handleLabelFocus = (event: React.FocusEvent<HTMLLabelElement>) => {
        // Предотвращает всплытие до ноды дерева.
        if (!isStaticCheckboxTreeExtended) {
            event.stopPropagation();
        }

        labelAttributes?.onFocus?.(event);
    };

    return (
        <Checkbox
            className={clsx(styles.checkboxTreeCheckbox, className)}
            ref={checkboxNode}
            labelAttributes={{
                ...labelAttributes,
                className: classNamesLabel,
                onFocus: handleLabelFocus,
            }}
            size={size}
            {...checkboxProps}
        />
    );
};

CheckboxTreeExtendedCheckbox.displayName = "CheckboxTreeExtendedCheckbox";
