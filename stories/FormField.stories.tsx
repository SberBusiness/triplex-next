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
    FormFieldMaskedInput,
    FormFieldCounter,
} from "../src/components/FormField";
import { FormGroup } from "../src/components/FormGroup";
import { Gap } from "../src/components/Gap";
import { Text, ETextSize, EFontType } from "../src/components/Typography";
import { HintFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

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
- **FormFieldMaskedInput** - поле ввода с маской (телефоны, карты, даты и др.)
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
                        <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                    </FormFieldPrefix>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={value} onChange={handleChange} />
                    <FormFieldPostfix>
                        <HintFilledSrvIcon16 paletteIndex={5} />
                        <DefaulticonStrokePrdIcon20 paletteIndex={5} />
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

export const WithCounter: StoryObj<typeof FormField> = {
    render: function Render() {
        return (
            <div style={{ width: "304px" }}>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                    <FormFieldCounter>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            0/201
                        </Text>
                    </FormFieldCounter>
                </FormFieldDescription>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "FormField со счетчиком символов.",
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
                    <FormField>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldInput value={value} onChange={handleChange} />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormField error>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldInput value={valueError} onChange={handleChangeError} />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Текст ошибки
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormField disabled>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldInput value="Value disabled" />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    </FormFieldDescription>
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
                    <FormField>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldTextarea value={value} onChange={handleChange} />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormField error>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldTextarea value={valueError} onChange={handleChangeError} />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Текст ошибки
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormField disabled>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldTextarea />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    </FormFieldDescription>
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

export const MaskedInput: StoryObj<typeof FormFieldMaskedInput> = {
    render: () => {
        const [phoneValue, setPhoneValue] = useState("");
        const [cardValue, setCardValue] = useState("");

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValue(e.target.value);
        };

        const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCardValue(e.target.value);
        };

        return (
            <div style={{ width: "304px" }}>
                <FormGroup>
                    <FormField>
                        <FormFieldLabel>Номер телефона</FormFieldLabel>
                        <FormFieldMaskedInput
                            value={phoneValue}
                            onChange={handlePhoneChange}
                            mask={FormFieldMaskedInput.presets.masks.phone}
                        />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormField>
                        <FormFieldLabel>Номер карты</FormFieldLabel>
                        <FormFieldMaskedInput
                            value={cardValue}
                            onChange={handleCardChange}
                            mask={FormFieldMaskedInput.presets.masks.cardNumber}
                            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.cardNumber}
                            placeholder="Введите номер карты"
                        />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    </FormFieldDescription>
                </FormGroup>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "FormField с маскированным вводом. Поддерживает различные предустановленные маски для телефонных номеров, номеров карт, дат и других форматов данных.",
            },
        },
    },
};

interface IFormFieldWithControlsProps extends React.ComponentProps<typeof FormField> {
    labelText?: string;
    placeholder?: string;
    showClear?: boolean;
    descriptionText?: string;
    counter?: string;
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

        const { labelText, placeholder, showClear, descriptionText, counter, ...formFieldProps } = args;

        return (
            <div style={{ width: "304px" }}>
                <FormGroup>
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

                    {(descriptionText || counter) && (
                        <FormFieldDescription>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {descriptionText || "Описание поля"}
                            </Text>
                            {counter && (
                                <FormFieldCounter>
                                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                        {counter}
                                    </Text>
                                </FormFieldCounter>
                            )}
                        </FormFieldDescription>
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
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Описание поля" },
            },
        },
        counter: {
            control: { type: "text" },
            description: "Текст счетчика символов",
            table: {
                type: { summary: "string" },
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
        descriptionText: "Описание поля",
        counter: "0/201",
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
