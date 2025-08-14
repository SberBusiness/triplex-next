import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { TextField } from "../src/components/TextField";
import { Text, ETextSize, EFontType } from "../src/components/Typography";
import { Gap } from "../src/components/Gap";
import { FormFieldClear } from "../src/components";

export default {
    title: "Components/TextField",
    parameters: {
        docs: {
            description: {
                component: `
Компонент TextField представляет собой упрощенный вариант поля ввода, построенный на основе FormField и FormGroup.
                `
            }
        }
    },
    tags: ["autodocs"],
};

export const TextFieldBasic: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <TextField
                description={<Text size={ETextSize.B4} type={EFontType.SECONDARY}>Описание поля</Text>}
                inputProps={{
                    value: value,
                    onChange: handleChange,
                    placeholder: "Введите текст..."
                }}
                label="Название поля"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовый пример использования TextField с лейблом и описанием."
            }
        }
    }
};

export const TextFieldWithPrefixAndPostfix: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <TextField
                description={<Text size={ETextSize.B4} type={EFontType.SECONDARY}>Описание поля</Text>}
                prefix="⚠️"
                postfix="⚠️"
                inputProps={{
                    value: value,
                    onChange: handleChange,
                }}
                label="Название поля"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "TextField с префиксом (⚠️) и постфиксом (⚠️)."
            }
        }
    }
};

export const TextFieldWithClearButton: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <TextField
                description={<Text size={ETextSize.B4} type={EFontType.SECONDARY}>Описание поля</Text>}
                postfix={<FormFieldClear onClick={() => setValue('')} />}
                inputProps={{
                    value: value,
                    onChange: handleChange,
                }}
                label="Название поля"
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "TextField с кнопкой очистки значения."
            }
        }
    }
};

export const TextFieldStates: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState('');
        const [valueError, setValueError] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const handleChangeError = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueError(e.target.value);
        };

        return (
            <div>
                <TextField
                    description={<Text size={ETextSize.B4} type={EFontType.SECONDARY}>Описание поля</Text>}
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Введите текст..."
                    }}
                    label="Название поля"
                />

                <Gap size={24} />

                <TextField
                    error
                    description={<Text size={ETextSize.B4} type={EFontType.ERROR}>Error text</Text>}
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
                        disabled: true
                    }}
                    label="Название поля"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Различные состояния TextField: обычное, с ошибкой, отключенное."
            }
        }
    }
};

interface ITextFieldWithControlsProps extends React.ComponentProps<typeof TextField> {
    labelText?: string;
    placeholder?: string;
    prefixText?: string;
    postfixText?: string;
    descriptionText?: string;
    showLabel?: boolean;
}

export const TextFieldWithControls: StoryObj<ITextFieldWithControlsProps> = {
    render: (args) => {
        const [value, setValue] = useState('');

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
            ...textFieldProps
        } = args;

        return (
            <TextField
                {...textFieldProps}
                description={
                    descriptionText ? (
                        <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {descriptionText}
                        </Text>
                    ) : null
                }
                prefix={prefixText || ""}
                postfix={postfixText || ""}
                inputProps={{
                    value: value,
                    onChange: handleChange,
                    placeholder: placeholder || "Введите текст...",
                }}
                label={showLabel ? (labelText || "Название поля") : undefined}
            />
        );
    },
    argTypes: {
        error: {
            control: { type: 'boolean' },
            description: 'Состояние ошибки',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Отключенное состояние',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        labelText: {
            control: { type: 'text' },
            description: 'Текст лейбла',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Название поля' }
            }
        },
        showLabel: {
            control: { type: 'boolean' },
            description: 'Показать лейбл',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' }
            }
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Плейсхолдер поля ввода',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Введите текст...' }
            }
        },
        prefixText: {
            control: { type: 'text' },
            description: 'Текст префикса',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        postfixText: {
            control: { type: 'text' },
            description: 'Текст постфикса',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        descriptionText: {
            control: { type: 'text' },
            description: 'Текст описания',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Описание поля' }
            }
        },
        className: {
            control: { type: 'text' },
            description: 'Дополнительные CSS классы',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        error: false,
        disabled: false,
        labelText: 'Название поля',
        showLabel: true,
        placeholder: 'Введите текст...',
        prefixText: '',
        postfixText: '',
        descriptionText: 'Описание поля',
        className: ''
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация TextField с расширенными controls. Позволяет настраивать все основные свойства компонента, включая тип поля, текст лейбла, плейсхолдер, префикс, постфикс и описание."
            }
        }
    }
};
