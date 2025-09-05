import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { TextField } from "../../src/components/TextField";
import { Text, ETextSize, EFontType } from "../../src/components/Typography";
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
            <div style={{ width: "304px" }}>
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
            <div style={{ width: "304px" }}>
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
            <div style={{ width: "304px" }}>
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
            <div style={{ width: "304px" }}>
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
            <div style={{ width: "304px" }}>
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

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };
        return (
            <div style={{ width: "304px" }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    counter={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            0/201
                        </Text>
                    }
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
                story: "TextField с счетчиком символов.",
            },
        },
    },
};

export const States: StoryObj<typeof TextField> = {
    render: () => {
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
