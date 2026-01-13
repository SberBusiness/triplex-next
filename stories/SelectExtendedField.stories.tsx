import React, { useState, useEffect } from "react";
import { StoryObj } from "@storybook/react";
import { SelectExtendedField } from "../src/components/SelectExtendedField";
import { SelectExtendedFieldTarget } from "../src/components/SelectExtendedField/components/SelectExtendedFieldTarget";
import { SelectExtendedFieldDropdown } from "../src/components/SelectExtendedField/components/SelectExtendedFieldDropdown";
import { DropdownListItem } from "../src/components/Dropdown/desktop/DropdownListItem";
import { EFormFieldStatus, FormFieldDescription } from "../src/components/FormField";
import { Text, ETextSize, EFontType, Title as TypographyTitle, ETitleSize } from "../src/components/Typography";
import { Gap } from "../src/components/Gap";
import { FormGroup } from "../src/components/FormGroup";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "../src/enums/EComponentSize";

export default {
    title: "Components/SelectExtendedField",
    component: SelectExtendedField,
    parameters: {
        docs: {
            description: {
                component: `
SelectExtendedField - это расширенный компонент выбора, который позволяет создавать кастомные селекты с гибкой настройкой target и dropdown элементов.

## Основные возможности:
- Кастомный рендер target элемента
- Кастомный рендер dropdown списка
- Поддержка всех состояний (disabled, error, loading)
- Навигация с клавиатуры
- Автоматическое позиционирование dropdown
- Поддержка мобильных устройств

## Использование:
Компонент принимает две рендер-функции:
- \`renderTarget\` - для рендера поля выбора
- \`children\` - для рендера выпадающего списка

Каждая функция получает необходимые пропсы для управления состоянием.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Playground} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
};

// Данные для примеров
const options = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
    { id: "option4", value: "option4", label: "Четвертая опция" },
    { id: "option5", value: "option5", label: "Пятая опция" },
];

interface ISelectExtendedFieldPlaygroundProps {
    fieldLabel?: string;
    placeholder?: string;
    loading?: boolean;
    status?: EFormFieldStatus;
    descriptionText?: string;
    errorText?: string;
    selectedValue?: string;
}

export const Playground: StoryObj<ISelectExtendedFieldPlaygroundProps> = {
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

        const { fieldLabel, placeholder, loading, status, descriptionText, errorText } = args;

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EComponentSize.LG}
                                setOpened={setOpened}
                                fieldLabel={fieldLabel || "Выберите опцию"}
                                label={selectedOption?.label}
                                placeholder={placeholder}
                                loading={loading}
                                status={status}
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
                            <Text
                                tag="div"
                                size={ETextSize.B4}
                                type={status === EFormFieldStatus.ERROR ? EFontType.ERROR : EFontType.SECONDARY}
                            >
                                {status === EFormFieldStatus.ERROR
                                    ? errorText || "Текст ошибки"
                                    : descriptionText || "Описание поля"}
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
        loading: {
            control: { type: "boolean" },
            description: "Состояние загрузки",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Отключенное состояние",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
                options: Object.values(EFormFieldStatus),
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
        loading: false,
        status: EFormFieldStatus.DEFAULT,
        descriptionText: "Описание поля",
        errorText: "Текст ошибки",
        selectedValue: "",
    },
    parameters: {
        controls: {
            include: [
                "fieldLabel",
                "placeholder",
                "loading",
                "status",
                "descriptionText",
                "errorText",
                "selectedValue",
            ],
        },
        docs: {
            description: {
                story: "Интерактивная демонстрация SelectExtendedField с расширенными controls. Позволяет настраивать все основные свойства компонента, включая текст лейбла, плейсхолдер, состояния (отключенное, ошибка, загрузка) и предварительно выбранное значение. Также включает отладочную информацию для демонстрации состояния компонента.",
            },
        },
    },
};

export const Basic: StoryObj<typeof SelectExtendedField> = {
    name: "Basic",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Базовый пример использования SelectExtendedField с простым списком опций.",
            },
        },
    },
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
                            size={EComponentSize.LG}
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
};

export const States: StoryObj<typeof SelectExtendedField> = {
    name: "States",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Демонстрация различных состояний SelectExtendedField: обычное, загрузка, ошибка и отключенное состояние.",
            },
        },
    },
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
                    <TypographyTitle
                        tag="h3"
                        size={ETitleSize.H3}
                        type={EFontType.PRIMARY}
                        style={{ marginBottom: "16px" }}
                    >
                        Обычное состояние
                    </TypographyTitle>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EComponentSize.LG}
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
                    <TypographyTitle
                        tag="h3"
                        size={ETitleSize.H3}
                        type={EFontType.PRIMARY}
                        style={{ marginBottom: "16px" }}
                    >
                        Состояние загрузки
                    </TypographyTitle>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EComponentSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Загрузка опций"
                                label={selectedOption?.label}
                                placeholder="Загрузка..."
                                loading
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
                    <TypographyTitle
                        tag="h3"
                        size={ETitleSize.H3}
                        type={EFontType.PRIMARY}
                        style={{ marginBottom: "16px" }}
                    >
                        Состояние ошибки
                    </TypographyTitle>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EComponentSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Выберите опцию"
                                label={selectedOption?.label}
                                placeholder="Выберите опцию из списка"
                                status={EFormFieldStatus.ERROR}
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
                    <TypographyTitle
                        tag="h3"
                        size={ETitleSize.H3}
                        type={EFontType.PRIMARY}
                        style={{ marginBottom: "16px" }}
                    >
                        Состояние предупреждения
                    </TypographyTitle>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EComponentSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Выберите опцию"
                                label={selectedOption?.label}
                                placeholder="Выберите опцию из списка"
                                status={EFormFieldStatus.WARNING}
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
                        <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                            Обязательное поле
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <TypographyTitle
                        tag="h3"
                        size={ETitleSize.H3}
                        type={EFontType.PRIMARY}
                        style={{ marginBottom: "16px" }}
                    >
                        Отключенное состояние
                    </TypographyTitle>
                    <SelectExtendedField
                        renderTarget={({ opened, setOpened }) => (
                            <SelectExtendedFieldTarget
                                opened={opened}
                                size={EComponentSize.LG}
                                setOpened={setOpened}
                                fieldLabel="Отключенное поле"
                                label={selectedOption?.label}
                                placeholder="Поле недоступно"
                                status={EFormFieldStatus.DISABLED}
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
};
