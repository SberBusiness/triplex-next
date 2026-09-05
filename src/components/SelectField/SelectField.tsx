import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import {
    ISelectExtendedFieldDefaultOption,
    ISelectExtendedFieldDropdownProvideProps,
    ISelectExtendedFieldProps,
    ISelectExtendedFieldTargetProvideProps,
    ISelectExtendedFieldTargetProps,
    SelectExtendedField,
} from "@sberbusiness/triplex-next/components/SelectExtendedField";
import {
    ISelectExtendedFieldDropdownDefaultProps,
    SelectExtendedFieldDropdownDefault,
} from "@sberbusiness/triplex-next/components/SelectExtendedField/components/SelectExtendedFieldDropdownDefault";
import { EDropdownWidth } from "@sberbusiness/triplex-next/components/Dropdown";
import { DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown/DropdownListContext";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства опции списка. */
export interface ISelectFieldOption extends ISelectExtendedFieldDefaultOption {}

/** Свойства компонента SelectField. */
export interface ISelectFieldProps
    extends
        Omit<ISelectExtendedFieldProps, "children" | "onChange" | "renderTarget">,
        Pick<ISelectExtendedFieldTargetProps, "loading" | "status" | "placeholder"> {
    /** Размер компонента. */
    size: EComponentSize;
    /** Выпадающий блок компонент рендерит сам, поэтому children не принимаются. */
    children?: never;
    /** Текущее выбранное значение. С опцией списка сопоставляется по полю id. */
    value?: ISelectFieldOption;
    /** Список опций. */
    options: ISelectFieldOption[];
    /** Обработчик изменения значения. Вызывается с выбранной опцией, список при этом закрывается. */
    onChange: (option: ISelectFieldOption) => void;
    /** Свойства, передающиеся в SelectExtendedField.Target. */
    targetProps?: Omit<ISelectExtendedFieldTargetProps, "opened" | "setOpened" | "size">;
    /** Свойства, передающиеся в SelectExtendedField.Dropdown. */
    dropdownProps?: ISelectExtendedFieldDropdownDefaultProps["dropdownProps"];
    /** ClassName передающийся в DropdownListItem. */
    dropdownListItemClassName?: string;
    /** Название Select отображающееся в мобильном режиме. */
    mobileTitle?: React.ReactNode;
}

/**
 * Базовый компонент SelectField.
 * Готовый Select со списком опций: поле выбора и выпадающий блок собраны заранее, состоянием
 * открытости владеет SelectExtendedField. Сам компонент отвечает только за связку поля со списком
 * (aria-controls, aria-activedescendant) и за прокидывание опций в выпадающий блок.
 */
export const SelectField = React.forwardRef<HTMLDivElement, ISelectFieldProps>((props, ref) => {
    const {
        // children в разметку не попадают — выпадающий блок рендерит сам компонент (children?: never).
        children,
        className,
        value,
        size,
        options,
        onChange,
        placeholder,
        loading,
        status,
        // aria-labelledby адресован полю выбора, а не корневому <div>, поэтому не уходит в rest.
        "aria-labelledby": ariaLabelledby,
        dropdownListItemClassName,
        mobileTitle,
        targetProps,
        dropdownProps,
        ...rest
    } = props;

    // Идентификатор активной (подсвеченной с клавиатуры) опции. Его выставляет DropdownList
    // через DropdownListContext, а поле выбора отдаёт в aria-activedescendant.
    const [activeDescendant, setActiveDescendant] = useState<string>();
    // Идентификатор списка опций. Должен быть стабилен на всё время жизни компонента:
    // на него ссылается aria-controls поля выбора.
    const [listId] = useState(() => uniqueId());

    const renderTarget = (targetProvideProps: ISelectExtendedFieldTargetProvideProps) => (
        <SelectExtendedField.Target
            label={value?.label}
            placeholder={placeholder}
            loading={loading}
            status={status}
            role="combobox"
            aria-controls={listId}
            aria-activedescendant={activeDescendant}
            aria-labelledby={ariaLabelledby}
            ref={ref}
            size={size}
            // fieldLabel обязателен в Target, но у SelectField его нет: заголовок задаётся
            // только через targetProps, поэтому здесь стоит заглушка, которую спред перекрывает.
            fieldLabel={undefined}
            {...targetProps}
            // Состояние открытости приходит от SelectExtendedField и перекрывает targetProps.
            {...targetProvideProps}
        />
    );

    const renderDropdown = (dropdownProvideProps: ISelectExtendedFieldDropdownProvideProps) => (
        <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
            <SelectExtendedFieldDropdownDefault
                {...dropdownProvideProps}
                size={size}
                width={EDropdownWidth.TARGET}
                dropdownProps={dropdownProps}
                dropdownListItemClassName={dropdownListItemClassName}
                loading={loading}
                listId={listId}
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
