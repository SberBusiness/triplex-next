import React from "react";
import { Dropdown, IDropdownProps } from "../../Dropdown";
import { DropdownList } from "../../Dropdown/desktop/DropdownList";

/* Свойства SelectExtendedFieldDropdown. */
export interface ISelectExtendedFieldDropdownProps extends Omit<IDropdownProps, "forwardedRef"> {
    /* Ссылка на контейнер Dropdown. */
    forwardedRef: React.RefObject<HTMLDivElement>;
    /* Дочерние элементы. */
    children?: React.ReactNode;
    /* Открыт. */
    opened: boolean;
    /* Ссылка на управляющий элемент. */
    targetRef: React.RefObject<HTMLElement>;
}

export interface ISelectExtendedFieldDropdownFC extends React.FC<ISelectExtendedFieldDropdownProps> {
    List: typeof DropdownList;
}

export const SelectExtendedFieldDropdown: ISelectExtendedFieldDropdownFC = ({
    forwardedRef,
    children,
    targetRef,
    ...rest
}) => (
    <Dropdown {...rest} ref={forwardedRef} targetRef={targetRef}>
        {children}
    </Dropdown>
);

SelectExtendedFieldDropdown.List = DropdownList;
