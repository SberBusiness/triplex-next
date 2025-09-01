import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldClear,
    FormFieldPrefix,
    FormFieldPostfix,
    FormFieldDescription,
    FormFieldTextarea,
} from "../src/components/FormField";
import { FormGroup, FormGroupLine } from "../src/components/FormGroup";
import { Gap } from "../src/components/Gap";
import { Text, ETextSize, EFontType } from "../src/components/Typography";
import HintSrvIcon16 from "@sberbusiness/icons-next/HintSrvIcon16";
import DefaulticonPrdIcon20 from "@sberbusiness/icons-next/DefaulticonPrdIcon20";

export default {
    title: "Components/FormField",
    parameters: {
        docs: {
            description: {
                component: `
Компонент FormField представляет собой универсальное поле ввода с поддержкой различных элементов:

## Основные возможности

- **FormFieldInput** - текстовое поле ввода
- **FormFieldTextarea** - многострочное поле ввода
- **FormFieldLabel** - плавающий лейбл
- **FormFieldClear** - кнопка очистки
- **FormFieldPrefix/Postfix** - элементы слева/справа от поля
- **FormFieldDescription** - описание под полем
                `,
            },
        },
    },
    tags: ["autodocs"],
};

export const Basic: StoryObj<typeof FormField> = {
    render: function Render() {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ width: "304px" }}>
                <FormField>
                    <FormFieldLabel>Имя пользователя</FormFieldLabel>
                    <FormFieldInput value={value} onChange={handleChange} placeholder="Введите имя..." />
                </FormField>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовые примеры использования FormField с различными типами полей ввода.",
            },
        },
    },
};

export const WithPrefixAndPostfix: StoryObj<typeof FormField> = {
    render: function Render() {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ width: "304px" }}>
                <FormField>
                    <FormFieldPrefix>
                        <DefaulticonPrdIcon20 />
                    </FormFieldPrefix>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={value} onChange={handleChange} />
                    <FormFieldPostfix>
                        <HintSrvIcon16 />
                        <DefaulticonPrdIcon20 />
                    </FormFieldPostfix>
                </FormField>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "FormField с префиксами и постфиксами. Префиксы отображаются слева от поля, постфиксы - справа.",
            },
        },
    },
};

export const WithClearButton: StoryObj<typeof FormField> = {
    render: function Render() {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const handleClear = () => {
            setValue("");
        };

        return (
            <div style={{ width: "304px" }}>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={value} onChange={handleChange} />
                    <FormFieldPostfix>
                        <FormFieldClear onClick={handleClear} />
                    </FormFieldPostfix>
                </FormField>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "FormField с префиксами и постфиксами. Префиксы отображаются слева от поля, постфиксы - справа.",
            },
        },
    },
};

export const States: StoryObj<typeof FormField> = {
    render: function Render() {
        const [value, setValue] = useState("");
        const [valueError, setValueError] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const handleChangeError = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueError(e.target.value);
        };

        return (
            <div style={{ width: "304px" }}>
                <FormGroup>
                    <FormGroupLine>
                        <FormField>
                            <FormFieldLabel>Название поля</FormFieldLabel>
                            <FormFieldInput value={value} onChange={handleChange} />
                        </FormField>
                    </FormGroupLine>
                    <FormGroupLine>
                        <FormFieldDescription>
                            <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                                Описание поля
                            </Text>
                        </FormFieldDescription>
                    </FormGroupLine>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormGroupLine>
                        <FormField error>
                            <FormFieldLabel>Название поля</FormFieldLabel>
                            <FormFieldInput value={valueError} onChange={handleChangeError} />
                        </FormField>
                    </FormGroupLine>
                    <FormGroupLine>
                        <FormFieldDescription>
                            <Text size={ETextSize.B4} type={EFontType.ERROR}>
                                Текст ошибки
                            </Text>
                        </FormFieldDescription>
                    </FormGroupLine>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormGroupLine>
                        <FormField disabled>
                            <FormFieldLabel>Название поля</FormFieldLabel>
                            <FormFieldInput value="Value disabled" />
                        </FormField>
                    </FormGroupLine>
                    <FormGroupLine>
                        <FormFieldDescription>
                            <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                                Описание поля
                            </Text>
                        </FormFieldDescription>
                    </FormGroupLine>
                </FormGroup>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Различные состояния FormField: обычное, с ошибкой, отключенное.",
            },
        },
    },
};

export const Textarea: StoryObj<typeof FormFieldTextarea> = {
    render: function Render() {
        const [value, setValue] = useState("");
        const [valueError, setValueError] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
        };

        const handleChangeError = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValueError(e.target.value);
        };

        return (
            <div style={{ width: "304px" }}>
                <FormGroup>
                    <FormGroupLine>
                        <FormField>
                            <FormFieldLabel>Название поля</FormFieldLabel>
                            <FormFieldTextarea value={value} onChange={handleChange} />
                        </FormField>
                    </FormGroupLine>
                    <FormGroupLine>
                        <FormFieldDescription>
                            <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                                Описание поля
                            </Text>
                        </FormFieldDescription>
                    </FormGroupLine>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormGroupLine>
                        <FormField error>
                            <FormFieldLabel>Название поля</FormFieldLabel>
                            <FormFieldTextarea value={valueError} onChange={handleChangeError} />
                        </FormField>
                    </FormGroupLine>
                    <FormGroupLine>
                        <FormFieldDescription>
                            <Text size={ETextSize.B4} type={EFontType.ERROR}>
                                Текст ошибки
                            </Text>
                        </FormFieldDescription>
                    </FormGroupLine>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormGroupLine>
                        <FormField disabled>
                            <FormFieldLabel>Название поля</FormFieldLabel>
                            <FormFieldTextarea />
                        </FormField>
                    </FormGroupLine>
                    <FormGroupLine>
                        <FormFieldDescription>
                            <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                                Описание поля
                            </Text>
                        </FormFieldDescription>
                    </FormGroupLine>
                </FormGroup>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "FormField с многострочным полем ввода (textarea). Поддерживает все те же состояния, что и обычное поле.",
            },
        },
    },
};

interface IFormFieldWithControlsProps extends React.ComponentProps<typeof FormField> {
    labelText?: string;
    placeholder?: string;
    showClear?: boolean;
    showDescription?: boolean;
    descriptionText?: string;
}

export const Playground: StoryObj<IFormFieldWithControlsProps> = {
    render: function Render(args) {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const handleClear = () => {
            setValue("");
        };

        const { labelText, placeholder, showClear, showDescription, descriptionText, ...formFieldProps } = args;

        return (
            <div style={{ width: "304px" }}>
                <FormGroup>
                    <FormGroupLine>
                        <FormField {...formFieldProps}>
                            <FormFieldLabel>{labelText || "Название поля"}</FormFieldLabel>
                            <FormFieldInput
                                value={value}
                                onChange={handleChange}
                                placeholder={placeholder || "Введите текст..."}
                            />
                            {showClear && value && (
                                <FormFieldPostfix>
                                    <FormFieldClear onClick={handleClear} />
                                </FormFieldPostfix>
                            )}
                        </FormField>
                    </FormGroupLine>

                    {showDescription && (
                        <FormGroupLine>
                            <FormFieldDescription>
                                <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                                    {descriptionText || "Описание поля"}
                                </Text>
                            </FormFieldDescription>
                        </FormGroupLine>
                    )}
                </FormGroup>
            </div>
        );
    },
    argTypes: {
        error: {
            control: { type: "boolean" },
            description: "Состояние ошибки",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
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
        labelText: {
            control: { type: "text" },
            description: "Текст лейбла",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Название поля" },
            },
        },
        placeholder: {
            control: { type: "text" },
            description: "Плейсхолдер поля ввода",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Введите текст..." },
            },
        },
        showClear: {
            control: { type: "boolean" },
            description: "Показать кнопку очистки",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        showDescription: {
            control: { type: "boolean" },
            description: "Показать описание поля",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Описание поля" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: {
                type: { summary: "string" },
            },
        },
    },
    args: {
        error: false,
        disabled: false,
        labelText: "Название поля",
        placeholder: "Введите текст...",
        showClear: false,
        showDescription: false,
        descriptionText: "Описание поля",
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация FormField с расширенными controls. Позволяет настраивать все основные свойства компонента, включая тип поля, текст лейбла, плейсхолдер, отображение кнопки очистки и описания. Также включает отладочную информацию для демонстрации состояния компонента.",
            },
        },
    },
};
