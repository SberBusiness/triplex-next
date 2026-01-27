import React, { useContext, useEffect, useRef } from "react";
import { Checkbox, ICheckboxProps } from "../../Checkbox/Checkbox";
import clsx from "clsx";
import { isStaticCheckboxTreeExtended } from "../isStaticCheckboxTreeExtended";
import styles from "../styles/CheckboxTreeExtended.module.less";
import { CheckboxTreeExtendedContext } from "../CheckboxTreeExtendedContext";

/**
 * Свойства CheckboxTreeExtendedCheckbox.
 */
interface ICheckboxTreeExtendedCheckboxProps extends ICheckboxProps {
    // Текущая нода является активной при перемещении с клавиатуры.
    active?: boolean;
    // Текущая нода раскрыта.
    opened?: boolean;
}

/**
 * Обертка над базовым компонентом чекбокс.
 * Используется для фокуса чекбокса при перемещении с клавиатуры.
 */
export const CheckboxTreeExtendedCheckbox: React.FC<ICheckboxTreeExtendedCheckboxProps> = ({
    active,
    className,
    opened,
    ...checkboxProps
}) => {
    const checkboxNode = useRef<HTMLInputElement | null>(null);
    const { size } = useContext(CheckboxTreeExtendedContext);

    // Триггер фокуса на чекбоксе при изменении флага активности при перемещении по дереву с клавиатуры. Если нода имеет дочерние ноды, то фокус получает не чекбокс, а CheckboxTreeExtendedArrow.
    useEffect(() => {
        // При взаимодействии мышью триггер фокуса не нужен.
        if (!document.activeElement?.contains(checkboxNode.current as Node)) {
            checkboxNode.current?.focus();
        }
    }, [active]);

    const handleFocus = (event: React.FocusEvent<HTMLLabelElement>) => {
        // Предотвращает всплытие до ноды дерева.
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !isStaticCheckboxTreeExtended && event.stopPropagation();
    };

    const setCheckboxNode = (DOMNode: HTMLInputElement) => {
        checkboxNode.current = DOMNode;
    };

    return (
        <Checkbox
            className={clsx(styles.checkboxTreeCheckbox, className)}
            ref={setCheckboxNode}
            labelAttributes={{ className: styles.checkboxTreeCheckboxLabel, onFocus: handleFocus }}
            size={size}
            {...checkboxProps}
        />
    );
};

CheckboxTreeExtendedCheckbox.displayName = "CheckboxTreeExtendedCheckbox";
