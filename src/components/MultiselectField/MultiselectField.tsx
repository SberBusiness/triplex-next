import React, { useRef } from "react";
import { ISelectExtendedFieldProps, SelectExtendedField } from "../SelectExtendedField";
import { MultiselectFieldContext } from "./MultiselectFieldContext";
import { SelectExtendedFieldTarget } from "../SelectExtendedField";
import { MultiselectFieldDropdown } from "./components/MultiselectFieldDropdown";
import { EComponentSize } from "../../enums/EComponentSize";

export interface IMultiselectFieldProps extends ISelectExtendedFieldProps {
    /** Размер компонента. */
    size?: EComponentSize;
}

/** Компонент мульти-списка. */
export const MultiselectField = Object.assign(
    React.forwardRef<HTMLDivElement, IMultiselectFieldProps>(
        ({ children, className, size = EComponentSize.MD, onMouseDown, ...props }, ref) => {
            const mouseUsedRef = useRef(false);

            const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
                mouseUsedRef.current = true;
                onMouseDown?.(event);
            };
            return (
                <MultiselectFieldContext.Provider value={{ size, mouseUsedRef }}>
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
