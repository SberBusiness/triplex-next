import React from "react";
import { ISelectExtendedFieldProps, SelectExtendedField } from "../SelectExtendedField";
import { MultiselectFieldContext } from "./MultiselectFieldContext";
import { SelectExtendedFieldTarget } from "../SelectExtendedField";
import { MultiselectFieldDropdown } from "./components/MultiselectFieldDropdown";
import { EComponentSize } from "../../enums/EComponentSize";

export interface IMultiselectFieldProps extends ISelectExtendedFieldProps {
    size?: EComponentSize;
}

/** Компонент мульти-списка. */
export const MultiselectField = Object.assign(
    React.forwardRef<HTMLDivElement, IMultiselectFieldProps>(
        ({ children, className, size = EComponentSize.MD, ...props }, ref) => {
            return (
                <MultiselectFieldContext.Provider value={{ size }}>
                    <SelectExtendedField className={className} ref={ref} {...props}>
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
