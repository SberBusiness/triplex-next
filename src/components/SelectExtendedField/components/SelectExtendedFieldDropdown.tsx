import React from "react";
import { Dropdown, IDropdownProps } from "../../Dropdown";
import { DropdownList } from "../../Dropdown/desktop/DropdownList";

/** Свойства компонента SelectExtendedFieldDropdown. */
export interface ISelectExtendedFieldDropdownProps extends Omit<IDropdownProps, "forwardedRef"> {
    /** Ссылка на контейнер выпадающего блока. Компонент не forwardRef — ссылка передаётся этим свойством. */
    forwardedRef: React.RefObject<HTMLDivElement>;
    /** Содержимое выпадающего блока. */
    children?: React.ReactNode;
    /** Состояние открытости выпадающего блока. */
    opened: boolean;
    /** Ссылка на поле выбора. По ней выпадающий блок считает своё положение. */
    targetRef: React.RefObject<HTMLElement>;
}

/** Тип компонента SelectExtendedFieldDropdown со статическим свойством List. */
export interface ISelectExtendedFieldDropdownFC extends React.FC<ISelectExtendedFieldDropdownProps> {
    /** Список опций выпадающего блока. */
    List: typeof DropdownList;
}

/** Выпадающий блок SelectExtendedField. Обёртка над Dropdown, принимающая ссылку через forwardedRef. */
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

SelectExtendedFieldDropdown.displayName = "SelectExtendedFieldDropdown";
SelectExtendedFieldDropdown.List = DropdownList;
