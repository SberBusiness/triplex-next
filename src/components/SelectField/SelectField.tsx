import React, { useState, useRef } from "react";
import {
    ISelectExtendedFieldDefaultOption,
    ISelectExtendedFieldDropdownProvideProps,
    ISelectExtendedFieldProps,
    ISelectExtendedFieldTargetProvideProps,
    ISelectExtendedFieldTargetProps,
    SelectExtendedField,
} from "@sberbusiness/triplex-next/components/SelectExtendedField";
import { SelectExtendedFieldDropdownDefault } from "@sberbusiness/triplex-next/components/SelectExtendedField/components/SelectExtendedFieldDropdownDefault";
import { DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown/DropdownListContext";
import { uniqueId } from "lodash-es";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/* Свойства опции списка. */
export interface ISelectFieldOption extends ISelectExtendedFieldDefaultOption {}

export interface ISelectFieldProps
    extends Omit<ISelectExtendedFieldProps, "children" | "onChange" | "renderTarget" | "placeholder">,
        Pick<ISelectExtendedFieldTargetProps, "loading" | "status" | "placeholder"> {
    size: EComponentSize;
    children?: never;
    /* Текущее выбранное значение. */
    value?: ISelectFieldOption;
    /* Список опций. */
    options: ISelectFieldOption[];
    /* Обработчик изменения значения. */
    onChange: (option: ISelectFieldOption) => void;
    /* Свойства, передающиеся в SelectExtendedField.Target. */
    targetProps: Omit<ISelectExtendedFieldTargetProps, "opened" | "setOpened" | "size">;
    /* ClassName передающийся в DropdownListItem. */
    dropdownListItemClassName?: string;
    /* Название Select отображающееся в мобильном режиме. */
    mobileTitle?: React.ReactNode;
}

/* Базовый компонент SelectField. */
export const SelectField = React.forwardRef<HTMLDivElement, ISelectFieldProps>((props, ref) => {
    const {
        children,
        className,
        value,
        size,
        options,
        onChange,
        placeholder,
        loading,
        status,
        "aria-labelledby": ariaLabelledby,
        dropdownListItemClassName,
        mobileTitle,
        targetProps,
        ...rest
    } = props;

    const [activeDescendant, setActiveDescendant] = useState<string>();
    const targetRef = useRef<HTMLDivElement | null>(null);
    const instanceId = useRef(uniqueId());

    const setRef = (node: HTMLInputElement | null) => {
        targetRef.current = node;
        if (typeof ref === "function") {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    const renderTarget = (props: ISelectExtendedFieldTargetProvideProps) => (
        <SelectExtendedField.Target
            label={value?.label}
            placeholder={placeholder}
            loading={loading}
            status={status}
            role="combobox"
            aria-controls={instanceId.current}
            aria-activedescendant={activeDescendant}
            aria-labelledby={ariaLabelledby}
            ref={setRef}
            size={size}
            {...targetProps}
            {...props}
        />
    );

    const renderDropdown = (props: ISelectExtendedFieldDropdownProvideProps) => (
        <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
            <SelectExtendedFieldDropdownDefault
                {...props}
                size={size}
                loading={loading}
                listId={instanceId.current}
                mobileTitle={mobileTitle}
                onChange={onChange}
                options={options}
                value={value}
            />
        </DropdownListContext.Provider>
    );

    return (
        <SelectExtendedField className={className} renderTarget={renderTarget} closeOnTab={true} {...rest}>
            {renderDropdown}
        </SelectExtendedField>
    );
});

SelectField.displayName = "SelectField";
