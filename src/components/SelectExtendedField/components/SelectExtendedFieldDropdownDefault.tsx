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

export interface ISelectExtendedFieldDropdownDefaultProps
    extends ISelectExtendedFieldDropdownProvideProps, Pick<IDropdownProps, "size" | "width"> {
    /* ClassName для модификации SelectExtendedField.Dropdown.List.Item. */
    dropdownListItemClassName?: string;
    /* Состояние загрузки. В этот момент Dropdown закрыт, Target отображает loader. */
    loading?: boolean;
    /* Id SelectExtendedField.Dropdown.List. Нужен для связи с Target. */
    listId?: string;
    /* Название Select отображающееся в мобильном режиме. */
    mobileTitle?: React.ReactNode;
    /* Список опций. */
    options: ISelectExtendedFieldDefaultOption[];
    /* Обработчик изменения значения. */
    onChange: (option: ISelectExtendedFieldDefaultOption) => void;
    /* Текущее выбранное значение. */
    value?: ISelectExtendedFieldDefaultOption;
}

/**
 * Дефолтный рендер Dropdown для SelectExtendedField.
 * Вынесено в отдельный компонент для переиспользования внутри компонентов Triplex.
 */
export const SelectExtendedFieldDropdownDefault: React.FC<ISelectExtendedFieldDropdownDefaultProps> = ({
    dropdownRef,
    dropdownListItemClassName,
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
    return (
        <SelectExtendedField.Dropdown
            opened={opened && !loading}
            forwardedRef={dropdownRef}
            width={width}
            setOpened={setOpened}
            targetRef={targetRef}
            size={size}
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
                                {options.map((option) => {
                                    const { label, ...restOption } = option;

                                    return (
                                        <DropdownMobileListItem
                                            {...restOption}
                                            className={dropdownListItemClassName}
                                            id={option.id}
                                            key={option.id}
                                            selected={option.id === value?.id}
                                            onSelect={() => {
                                                onChange(option);
                                                setOpened(false);
                                            }}
                                        >
                                            {label}
                                        </DropdownMobileListItem>
                                    );
                                })}
                            </DropdownMobileList>
                        </DropdownMobileBody>
                    </>
                ),
            }}
        >
            <SelectExtendedField.Dropdown.List id={listId} dropdownOpened={opened} size={size}>
                {options.map((option) => {
                    const { label, ...restOption } = option;

                    return (
                        <SelectExtendedField.Dropdown.List.Item
                            {...restOption}
                            className={dropdownListItemClassName}
                            id={option.id}
                            key={option.id}
                            selected={option.id === value?.id}
                            onSelect={() => {
                                onChange(option);
                                setOpened(false);
                            }}
                        >
                            {label}
                        </SelectExtendedField.Dropdown.List.Item>
                    );
                })}
            </SelectExtendedField.Dropdown.List>
        </SelectExtendedField.Dropdown>
    );
};
