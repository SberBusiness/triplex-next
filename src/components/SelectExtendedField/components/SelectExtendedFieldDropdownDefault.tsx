import React from "react";
import {
    ISelectExtendedFieldDefaultOption,
    ISelectExtendedFieldDropdownProvideProps,
    SelectExtendedField,
} from "../SelectExtendedField";
import {
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileHeader,
    DropdownMobileList,
    DropdownMobileListItem,
    IDropdownProps,
} from "../../Dropdown";
import { Text, ETextSize } from "../../Typography";

/** Свойства компонента SelectExtendedFieldDropdownDefault. */
export interface ISelectExtendedFieldDropdownDefaultProps
    extends ISelectExtendedFieldDropdownProvideProps, Pick<IDropdownProps, "size" | "width"> {
    /** ClassName для модификации SelectExtendedField.Dropdown.List.Item. */
    dropdownListItemClassName?: string;
    /** Свойства, передающиеся в Dropdown. */
    dropdownProps?: Omit<
        IDropdownProps,
        "children" | "opened" | "setOpened" | "targetRef" | "size" | "mobileViewProps"
    >;
    /** Состояние загрузки. В этот момент Dropdown закрыт, Target отображает лоадер. По умолчанию false. */
    loading?: boolean;
    /** Id SelectExtendedField.Dropdown.List. Нужен для связи с Target. */
    listId?: string;
    /** Название Select, отображающееся в мобильном режиме. */
    mobileTitle?: React.ReactNode;
    /** Список опций. */
    options: ISelectExtendedFieldDefaultOption[];
    /** Обработчик изменения значения. Вызывается с выбранной опцией. */
    onChange: (option: ISelectExtendedFieldDefaultOption) => void;
    /** Текущее выбранное значение. Опция сопоставляется по полю id. */
    value?: ISelectExtendedFieldDefaultOption;
}

/**
 * Дефолтный рендер Dropdown для SelectExtendedField.
 * Вынесено в отдельный компонент для переиспользования внутри компонентов Triplex.
 */
export const SelectExtendedFieldDropdownDefault: React.FC<ISelectExtendedFieldDropdownDefaultProps> = ({
    dropdownRef,
    dropdownListItemClassName,
    dropdownProps,
    width,
    loading,
    listId,
    mobileTitle,
    onChange,
    opened,
    size,
    options,
    setOpened,
    targetRef,
    value,
}) => {
    // Десктопный и мобильный списки различаются только компонентом элемента. Свойства опции
    // считаются здесь один раз, чтобы поведение выбора не разъехалось между режимами.
    // Компонент элемента в хелпер не выносится: у десктопного и мобильного разные типы props,
    // а общий тип пришлось бы ослаблять до React.ElementType.
    const getOptionProps = (option: ISelectExtendedFieldDefaultOption) => {
        const { label, ...restOption } = option;

        return {
            ...restOption,
            className: dropdownListItemClassName,
            id: option.id,
            selected: option.id === value?.id,
            onSelect: () => {
                onChange(option);
                setOpened(false);
            },
            children: label,
        };
    };

    return (
        <SelectExtendedField.Dropdown
            opened={opened && !loading}
            forwardedRef={dropdownRef}
            width={width}
            setOpened={setOpened}
            targetRef={targetRef}
            size={size}
            {...dropdownProps}
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader controlButtons={<DropdownMobileClose onClick={() => setOpened(false)} />}>
                            <Text tag="div" size={ETextSize.B3}>
                                {mobileTitle}
                            </Text>
                        </DropdownMobileHeader>
                        <DropdownMobileBody>
                            <DropdownMobileList>
                                {options.map((option) => (
                                    <DropdownMobileListItem key={option.id} {...getOptionProps(option)} />
                                ))}
                            </DropdownMobileList>
                        </DropdownMobileBody>
                    </>
                ),
            }}
        >
            <SelectExtendedField.Dropdown.List id={listId} dropdownOpened={opened} size={size}>
                {options.map((option) => (
                    <SelectExtendedField.Dropdown.List.Item key={option.id} {...getOptionProps(option)} />
                ))}
            </SelectExtendedField.Dropdown.List>
        </SelectExtendedField.Dropdown>
    );
};

SelectExtendedFieldDropdownDefault.displayName = "SelectExtendedFieldDropdownDefault";
