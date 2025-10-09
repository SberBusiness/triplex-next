import React, { useState, useEffect } from "react";
import { StoryObj } from "@storybook/react";
import { SelectExtendedField } from "../src/components/SelectExtendedField";
import { SelectExtendedFieldTarget } from "../src/components/SelectExtendedField/components/SelectExtendedFieldTarget";
import { SelectExtendedFieldDropdown } from "../src/components/SelectExtendedField/components/SelectExtendedFieldDropdown";
import { DropdownListItem } from "../src/components/Dropdown/desktop/DropdownListItem";
import { EFormFieldSize, FormFieldDescription } from "../src/components/FormField";
import { Text, ETextSize, EFontType, Title, ETitleSize } from "../src/components/Typography";
import { Gap } from "../src/components/Gap";
import { FormGroup } from "../src/components/FormGroup";

export default {
    title: "Components/SelectExtendedField",
    parameters: {
        docs: {
            description: {
                component: `
SelectExtendedField - это расширенный компонент выбора, который позволяет создавать кастомные селекты с гибкой настройкой target и dropdown элементов.

## Основные возможности:
- Кастомный рендер target элемента
- Кастомный рендер dropdown списка
- Поддержка всех состояний (disabled, error, loading)
- Полная навигация с клавиатуры
- Автоматическое позиционирование dropdown
- Поддержка мобильных устройств

## Использование:
Компонент принимает две рендер-функции:
- \`renderTarget\` - для рендера поля выбора
- \`children\` - для рендера выпадающего списка

Каждая функция получает необходимые пропсы для управления состоянием.
                `,
            },
        },
    },
    tags: ["autodocs"],
};

// Данные для примеров
const options = [
    { value: "option1", label: "Первая опция" },
    { value: "option2", label: "Вторая опция" },
    { value: "option3", label: "Третья опция" },
    { value: "option4", label: "Четвертая опция" },
    { value: "option5", label: "Пятая опция" },
];

export const Basic: StoryObj<typeof SelectExtendedField> = {
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<string>("");

        const selectedOption = options.find((option) => option.value === selectedValue);

        const handleSelect = (value: string, setOpened: (opened: boolean) => void) => {
            setSelectedValue(value);
            setOpened(false);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <SelectExtendedField
                    renderTarget={({ opened, setOpened }) => (
                        <SelectExtendedFieldTarget
                            opened={opened}
                            size={EFormFieldSize.LG}
                            setOpened={setOpened}
                            fieldLabel="Выберите опцию"
                            label={selectedOption?.label}
                            placeholder="Выберите опцию из списка"
                        />
                    )}
                >
                    {({ opened, dropdownRef, targetRef, setOpened }) => (
                        <SelectExtendedFieldDropdown opened={opened} forwardedRef={dropdownRef} targetRef={targetRef}>
                            <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                                {options.map((option) => (
                                    <DropdownListItem
                                        key={option.value}
                                        id={option.value}
                                        selected={selectedValue === option.value}
                                        onSelect={() => handleSelect(option.value, setOpened)}
                                    >
                                        {option.label}
                                    </DropdownListItem>
                                ))}
                            </SelectExtendedFieldDropdown.List>
                        </SelectExtendedFieldDropdown>
                    )}
                </SelectExtendedField>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовый пример использования SelectExtendedField с простым списком опций.",
            },
        },
    },
};

export const States: StoryObj<typeof SelectExtendedField> = {
    render: function Render() {
        const [selectedValue, setSelectedValue] = useState<string>("option2");

        const selectedOption = options.find((option) => option.value === selectedValue);

        const handleSelect = (value: string, setOpened: (opened: boolean) => void) => {
            setSelectedValue(value);
            setOpened(false);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Обычное состояние
                    </Title>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EFormFieldSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Выберите опцию"
                                label={selectedOption?.label}
                                placeholder="Выберите опцию из списка"
                            />
                        )}
                    >
                        {({ opened, dropdownRef, targetRef, setOpened }) => (
                            <SelectExtendedFieldDropdown
                                opened={opened}
                                forwardedRef={dropdownRef}
                                targetRef={targetRef}
                            >
                                <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                                    {options.map((option) => (
                                        <DropdownListItem
                                            key={option.value}
                                            id={option.value}
                                            selected={selectedValue === option.value}
                                            onSelect={() => handleSelect(option.value, setOpened)}
                                        >
                                            {option.label}
                                        </DropdownListItem>
                                    ))}
                                </SelectExtendedFieldDropdown.List>
                            </SelectExtendedFieldDropdown>
                        )}
                    </SelectExtendedField>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Состояние загрузки
                    </Title>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EFormFieldSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Загрузка опций"
                                label={selectedOption?.label}
                                placeholder="Загрузка..."
                                loading={true}
                            />
                        )}
                    >
                        {({ opened, dropdownRef, targetRef, setOpened }) => (
                            <SelectExtendedFieldDropdown
                                opened={opened}
                                forwardedRef={dropdownRef}
                                targetRef={targetRef}
                            >
                                <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                                    {options.map((option) => (
                                        <DropdownListItem
                                            key={option.value}
                                            id={option.value}
                                            selected={selectedValue === option.value}
                                            onSelect={() => handleSelect(option.value, setOpened)}
                                        >
                                            {option.label}
                                        </DropdownListItem>
                                    ))}
                                </SelectExtendedFieldDropdown.List>
                            </SelectExtendedFieldDropdown>
                        )}
                    </SelectExtendedField>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Состояние ошибки
                    </Title>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EFormFieldSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Выберите опцию"
                                label={selectedOption?.label}
                                placeholder="Выберите опцию из списка"
                                error={true}
                            />
                        )}
                    >
                        {({ opened, dropdownRef, targetRef, setOpened }) => (
                            <SelectExtendedFieldDropdown
                                opened={opened}
                                forwardedRef={dropdownRef}
                                targetRef={targetRef}
                            >
                                <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                                    {options.map((option) => (
                                        <DropdownListItem
                                            key={option.value}
                                            id={option.value}
                                            selected={selectedValue === option.value}
                                            onSelect={() => handleSelect(option.value, setOpened)}
                                        >
                                            {option.label}
                                        </DropdownListItem>
                                    ))}
                                </SelectExtendedFieldDropdown.List>
                            </SelectExtendedFieldDropdown>
                        )}
                    </SelectExtendedField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Обязательное поле
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Отключенное состояние
                    </Title>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EFormFieldSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Отключенное поле"
                                label={selectedOption?.label}
                                placeholder="Поле недоступно"
                                disabled={true}
                            />
                        )}
                    >
                        {({ opened, dropdownRef, targetRef, setOpened }) => (
                            <SelectExtendedFieldDropdown
                                opened={opened}
                                forwardedRef={dropdownRef}
                                targetRef={targetRef}
                            >
                                <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                                    {options.map((option) => (
                                        <DropdownListItem
                                            key={option.value}
                                            id={option.value}
                                            selected={selectedValue === option.value}
                                            onSelect={() => handleSelect(option.value, setOpened)}
                                        >
                                            {option.label}
                                        </DropdownListItem>
                                    ))}
                                </SelectExtendedFieldDropdown.List>
                            </SelectExtendedFieldDropdown>
                        )}
                    </SelectExtendedField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Поле временно недоступно
                        </Text>
                    </FormFieldDescription>
                </FormGroup>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных состояний SelectExtendedField: обычное, загрузка, ошибка и отключенное состояние.",
            },
        },
    },
};

interface ISelectExtendedFieldWithControlsProps {
    fieldLabel?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    descriptionText?: string;
    errorText?: string;
    selectedValue?: string;
}

export const Playground: StoryObj<ISelectExtendedFieldWithControlsProps> = {
    render: function Render(args) {
        const [selectedValue, setSelectedValue] = useState<string>(args.selectedValue || "");

        // Синхронизируем selectedValue с args.selectedValue
        useEffect(() => {
            setSelectedValue(args.selectedValue || "");
        }, [args.selectedValue]);

        const selectedOption = options.find((option) => option.value === selectedValue);

        const handleSelect = (value: string, setOpened: (opened: boolean) => void) => {
            setSelectedValue(value);
            setOpened(false);
        };

        const { fieldLabel, placeholder, disabled, error, loading, descriptionText, errorText } = args;

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EFormFieldSize.LG}
                                setOpened={setOpened}
                                fieldLabel={fieldLabel || "Выберите опцию"}
                                label={selectedOption?.label}
                                placeholder={placeholder}
                                disabled={disabled}
                                error={error}
                                loading={loading}
                            />
                        )}
                    >
                        {({ opened, dropdownRef, targetRef, setOpened }) => (
                            <SelectExtendedFieldDropdown
                                opened={opened}
                                forwardedRef={dropdownRef}
                                targetRef={targetRef}
                            >
                                <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                                    {options.map((option) => (
                                        <DropdownListItem
                                            key={option.value}
                                            id={option.value}
                                            selected={selectedValue === option.value}
                                            onSelect={() => handleSelect(option.value, setOpened)}
                                        >
                                            {option.label}
                                        </DropdownListItem>
                                    ))}
                                </SelectExtendedFieldDropdown.List>
                            </SelectExtendedFieldDropdown>
                        )}
                    </SelectExtendedField>

                    {(descriptionText || errorText) && (
                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={error ? EFontType.ERROR : EFontType.SECONDARY}>
                                {error ? errorText || "Текст ошибки" : descriptionText || "Описание поля"}
                            </Text>
                        </FormFieldDescription>
                    )}
                </FormGroup>
            </div>
        );
    },
    argTypes: {
        fieldLabel: {
            control: { type: "text" },
            description: "Текст лейбла поля",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Выберите опцию" },
            },
        },
        placeholder: {
            control: { type: "text" },
            description: "Текст плейсхолдера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Выберите опцию из списка" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Отключенное состояние",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        error: {
            control: { type: "boolean" },
            description: "Состояние ошибки",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        loading: {
            control: { type: "boolean" },
            description: "Состояние загрузки",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания поля",
            table: {
                type: { summary: "string" },
            },
        },
        errorText: {
            control: { type: "text" },
            description: "Текст ошибки",
            table: {
                type: { summary: "string" },
            },
        },
        selectedValue: {
            control: { type: "select" },
            options: ["", "option1", "option2", "option3", "option4", "option5"],
            description: "Предварительно выбранное значение",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "" },
            },
        },
    },
    args: {
        fieldLabel: "Выберите опцию",
        placeholder: "Выберите опцию из списка",
        disabled: false,
        error: false,
        loading: false,
        descriptionText: "Описание поля",
        errorText: "Текст ошибки",
        selectedValue: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация SelectExtendedField с расширенными controls. Позволяет настраивать все основные свойства компонента, включая текст лейбла, плейсхолдер, состояния (отключенное, ошибка, загрузка) и предварительно выбранное значение. Также включает отладочную информацию для демонстрации состояния компонента.",
            },
        },
    },
};
