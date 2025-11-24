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
import { EFormFieldSize, EFormFieldStatus } from "../src/components/FormField/enums";
import { FormGroup } from "../src/components/FormGroup";
import { Gap } from "../src/components/Gap";
import { Text, ETextSize, EFontType, Title, ETitleSize } from "../src/components/Typography";
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
- **Размеры** - SM (маленький), MD (средний), LG (большой - по умолчанию)
                `,
            },
        },
    },
    tags: ["autodocs"],
};

interface IFormFieldPlaygroundProps extends React.ComponentProps<typeof FormField> {
    labelText?: string;
    placeholder?: string;
    showClear?: boolean;
    descriptionText?: string;
    counter?: string;
}

export const Playground: StoryObj<IFormFieldPlaygroundProps> = {
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
            <div style={{ maxWidth: "304px" }}>
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
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние поля",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
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
        size: {
            control: { type: "select" },
            options: [EFormFieldSize.SM, EFormFieldSize.MD, EFormFieldSize.LG],
            description: "Размер поля ввода",
            table: {
                type: { summary: "EFormFieldSize" },
                defaultValue: { summary: "EFormFieldSize.MD" },
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
        status: EFormFieldStatus.DEFAULT,
        size: EFormFieldSize.MD,
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


export const Basic: StoryObj<typeof FormField> = {
    render: function Render() {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
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
            <div style={{ maxWidth: "304px" }}>
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
        const [value, setValue] = useState("");
        const maxLength = 201;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            if (newValue.length <= maxLength) {
                setValue(newValue);
            }
        };

        const currentLength = value.length;

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={value} onChange={handleChange} />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                    <FormFieldCounter>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {currentLength}/{maxLength}
                        </Text>
                    </FormFieldCounter>
                </FormFieldDescription>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "FormField со счетчиком символов. Счетчик показывает текущее количество символов и максимально допустимое.",
            },
        },
    },
};

export const States: StoryObj<typeof FormField> = {
    render: function Render() {
        const [value, setValue] = useState("");
        const [valueError, setValueError] = useState("");
        const [valueWarning, setValueWarning] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const handleChangeError = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueError(e.target.value);
        };

        const handleChangeWarning = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueWarning(e.target.value);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
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
                    <FormField status={EFormFieldStatus.ERROR}>
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
                    <FormField status={EFormFieldStatus.WARNING}>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldInput value={valueWarning} onChange={handleChangeWarning} />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                            Текст предупреждения
                        </Text>
                    </FormFieldDescription>
                </FormGroup>

                <Gap size={24} />

                <FormGroup>
                    <FormField status={EFormFieldStatus.DISABLED}>
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
        const maxLength = 201;

        const currentLength = value.length;

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (e.target.value.length <= maxLength) {
                setValue(e.target.value);
            }
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <FormGroup>
                    <FormField>
                        <FormFieldLabel>Название поля</FormFieldLabel>
                        <FormFieldTextarea value={value} onChange={handleChange} />
                    </FormField>
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                        <FormFieldCounter>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {currentLength}/{maxLength}
                            </Text>
                        </FormFieldCounter>
                    </FormFieldDescription>
                </FormGroup>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "FormField с многострочным полем ввода (textarea). Счетчик показывает текущее количество символов и максимально допустимое.",
            },
        },
    },
};

export const Sizes: StoryObj<typeof FormField> = {
    render: function Render() {
        const [valueSM, setValueSM] = useState("");
        const [valueMD, setValueMD] = useState("");
        const [valueLG, setValueLG] = useState("");

        const handleChangeSM = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueSM(e.target.value);
        };

        const handleChangeMD = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueMD(e.target.value);
        };

        const handleChangeLG = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueLG(e.target.value);
        };

        return (
            <div style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер SM (маленький)
                    </Title>
                    <FormGroup>
                        <FormField size={EFormFieldSize.SM}>
                            <FormFieldLabel>Маленькое поле</FormFieldLabel>
                            <FormFieldInput value={valueSM} onChange={handleChangeSM} placeholder="Введите текст..." />
                        </FormField>
                    </FormGroup>
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер MD (средний) - по умолчанию
                    </Title>
                    <FormGroup>
                        <FormField size={EFormFieldSize.MD}>
                            <FormFieldLabel>Среднее поле</FormFieldLabel>
                            <FormFieldInput value={valueMD} onChange={handleChangeMD} placeholder="Введите текст..." />
                        </FormField>
                    </FormGroup>
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер LG (большой)
                    </Title>
                    <FormGroup>
                        <FormField size={EFormFieldSize.LG}>
                            <FormFieldLabel>Большое поле</FormFieldLabel>
                            <FormFieldInput value={valueLG} onChange={handleChangeLG} placeholder="Введите текст..." />
                        </FormField>
                    </FormGroup>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных размеров FormField: SM (маленький), MD (средний - по умолчанию), LG (большой). Каждый размер имеет свои отступы и высоту для разных случаев использования.",
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
            <div style={{ maxWidth: "304px" }}>
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
