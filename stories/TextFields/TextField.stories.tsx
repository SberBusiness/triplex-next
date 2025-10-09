import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { TextField } from "../../src/components/TextField";
import { Text, ETextSize, EFontType, Title, ETitleSize } from "../../src/components/Typography";
import { EFormFieldSize } from "../../src/components/FormField/enums";
import { Gap } from "../../src/components/Gap";
import { FormFieldClear } from "../../src/components";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

export default {
    title: "Components/TextFields/TextField",
    parameters: {
        docs: {
            description: {
                component: `
Компонент TextField представляет собой упрощенный вариант поля ввода, построенный на основе FormField и FormGroup.

## Основные возможности

- **TextField** - текстовое поле ввода с лейблом и описанием
- **Размеры** - SM (маленький), MD (средний), LG (большой - по умолчанию)
- **Счетчик символов** - динамический подсчет введенных символов
- **Префикс/Постфикс** - дополнительные элементы слева и справа от поля
                `,
            },
        },
    },
    tags: ["autodocs"],
};

interface ITextFieldWithControlsProps extends React.ComponentProps<typeof TextField> {
    labelText?: string;
    placeholder?: string;
    prefixText?: string;
    postfixText?: string;
    descriptionText?: string;
    showLabel?: boolean;
}

export const Playground: StoryObj<ITextFieldWithControlsProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const {
            labelText,
            placeholder,
            prefixText,
            postfixText,
            descriptionText,
            showLabel,
            counter,
            ...textFieldProps
        } = args;

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextField
                    {...textFieldProps}
                    description={
                        descriptionText ? (
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {descriptionText}
                            </Text>
                        ) : undefined
                    }
                    prefix={prefixText || ""}
                    postfix={postfixText || ""}
                    counter={
                        counter ? (
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {counter}
                            </Text>
                        ) : undefined
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: placeholder || "Введите текст...",
                    }}
                    label={showLabel ? labelText || "Название поля" : undefined}
                />
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
        warning: {
            control: { type: "boolean" },
            description: "Состояние предупреждения",
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
        showLabel: {
            control: { type: "boolean" },
            description: "Показать лейбл",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
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
        prefixText: {
            control: { type: "text" },
            description: "Текст префикса",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "" },
            },
        },
        postfixText: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "" },
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
                defaultValue: { summary: "EFormFieldSize.LG" },
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
        warning: false,
        size: EFormFieldSize.LG,
        labelText: "Название поля",
        showLabel: true,
        placeholder: "Введите текст...",
        prefixText: "",
        postfixText: "",
        descriptionText: "Описание поля",
        className: "",
        counter: "0/201",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация TextField с расширенными controls. Позволяет настраивать все основные свойства компонента, включая тип поля, текст лейбла, плейсхолдер, префикс, постфикс и описание.",
            },
        },
    },
};

export const Basic: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Введите текст...",
                    }}
                    label="Название поля"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовый пример использования TextField с лейблом и описанием.",
            },
        },
    },
};

export const PassRefToInput: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");
        const ref = useRef<HTMLInputElement>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        useEffect(() => {
            if (ref.current) {
                console.log("input ref", ref.current);
            }
        }, []);

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    inputProps={{
                        ref: ref,
                        value: value,
                        onChange: handleChange,
                        placeholder: "Введите текст...",
                    }}
                    label="Название поля"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Пример использования TextField с передачей ref на input.",
            },
        },
    },
};

export const WithPrefixAndPostfix: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    prefix={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
                    postfix={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                    }}
                    label="Название поля"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: `TextField с префиксом и постфиксом.`,
            },
        },
    },
};

export const WithClearButton: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    postfix={<FormFieldClear onClick={() => setValue("")} />}
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                    }}
                    label="Название поля"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "TextField с кнопкой очистки значения.",
            },
        },
    },
};

export const WithCounter: StoryObj<typeof TextField> = {
    render: () => {
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
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    counter={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {currentLength}/{maxLength}
                        </Text>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        maxLength: maxLength,
                    }}
                    label="Название поля"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "TextField с динамическим счетчиком символов. Счетчик показывает текущее количество символов и максимально допустимое.",
            },
        },
    },
};

export const Sizes: StoryObj<typeof TextField> = {
    render: () => {
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
                    <TextField
                        size={EFormFieldSize.SM}
                        inputProps={{
                            value: valueSM,
                            onChange: handleChangeSM,
                            placeholder: "Введите текст...",
                        }}
                        label="Маленькое поле"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер MD (средний)
                    </Title>
                    <TextField
                        size={EFormFieldSize.MD}
                        inputProps={{
                            value: valueMD,
                            onChange: handleChangeMD,
                            placeholder: "Введите текст...",
                        }}
                        label="Среднее поле"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер LG (большой) - по умолчанию
                    </Title>
                    <TextField
                        size={EFormFieldSize.LG}
                        inputProps={{
                            value: valueLG,
                            onChange: handleChangeLG,
                            placeholder: "Введите текст...",
                        }}
                        label="Большое поле"
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных размеров TextField: SM (маленький), MD (средний), LG (большой - по умолчанию). Каждый размер имеет свои отступы и высоту для разных случаев использования.",
            },
        },
    },
};

export const States: StoryObj<typeof TextField> = {
    render: () => {
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
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Введите текст...",
                    }}
                    label="Название поля"
                />

                <Gap size={24} />

                <TextField
                    error
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Текст ошибки
                        </Text>
                    }
                    inputProps={{
                        value: valueError,
                        onChange: handleChangeError,
                    }}
                    label="Название поля"
                />

                <Gap size={24} />

                <TextField
                    warning
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                            Текст предупреждения
                        </Text>
                    }
                    inputProps={{
                        value: valueWarning,
                        onChange: handleChangeWarning,
                    }}
                    label="Название поля"
                />

                <Gap size={24} />

                <TextField
                    disabled
                    inputProps={{
                        value: "Value disabled",
                        disabled: true,
                    }}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    label="Название поля"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Различные состояния TextField: обычное, с ошибкой, отключенное.",
            },
        },
    },
};
