import React, { useCallback, useMemo, useRef } from "react";
import { ISelectExtendedFieldProps, SelectExtendedField, SelectExtendedFieldTarget } from "../SelectExtendedField";
import { MultiselectFieldContext } from "./MultiselectFieldContext";
import { MultiselectFieldDropdown } from "./components/MultiselectFieldDropdown";
import { EComponentSize } from "../../enums/EComponentSize";

/** Свойства компонента MultiselectField. */
export interface IMultiselectFieldProps extends ISelectExtendedFieldProps {
    /** Размер компонента. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
}

/**
 * Компонент мульти-списка.
 *
 * Надстройка над SelectExtendedField: раздаёт размер и признак «блок открыт мышью»
 * своим частям через MultiselectFieldContext. Состоянием открытости и разметкой
 * владеет SelectExtendedField — поле выбора приходит в renderTarget, выпадающий
 * блок в children.
 */
export const MultiselectField = Object.assign(
    React.forwardRef<HTMLDivElement, IMultiselectFieldProps>(
        ({ children, className, size = EComponentSize.MD, onMouseDown, ...props }, ref) => {
            // Признак того, что взаимодействие началось мышью. По нему выпадающий блок
            // решает, возвращать ли фокус на поле при закрытии: после клика мышью
            // возврат фокуса не нужен, после клавиатуры — нужен.
            const mouseUsedRef = useRef(false);

            const handleMouseDown = useCallback(
                (event: React.MouseEvent<HTMLDivElement>) => {
                    mouseUsedRef.current = true;
                    onMouseDown?.(event);
                },
                [onMouseDown],
            );

            const contextValue = useMemo(() => ({ size, mouseUsedRef }), [size]);

            return (
                <MultiselectFieldContext.Provider value={contextValue}>
                    <SelectExtendedField className={className} onMouseDown={handleMouseDown} ref={ref} {...props}>
                        {children}
                    </SelectExtendedField>
                </MultiselectFieldContext.Provider>
            );
        },
    ),
    {
        Dropdown: MultiselectFieldDropdown,
        Target: SelectExtendedFieldTarget,
    },
);

MultiselectField.displayName = "MultiselectField";
