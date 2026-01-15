import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { TextField } from "../../src/components/TextField";
import { Text, ETextSize, EFontType, Title, ETitleSize } from "../../src/components/Typography";
import { EFormFieldStatus } from "../../src/components/FormField/enums";
import { Gap } from "../../src/components/Gap";
import { ETooltipPreferPlace, ETooltipSize } from "../../src/components/Tooltip/enums";
import { FormFieldClear } from "../../src/components/FormField/components/FormFieldClear";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { Title as DocsTitle, Description, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Link } from "../../src/components/Link";
import { EComponentSize } from "../../src/enums/EComponentSize";

export default {
    title: "Components/TextFields/TextField",
    component: TextField,
    parameters: {
        docs: {
            description: {
                component: `
Упрощенный компонент поля ввода, построенный на основе FormField и FormGroup.

## Основные возможности

- **Размеры**: SM (маленький), MD (средний), LG (большой - по умолчанию)
- Возможность добавить **счетчик символов** для динамического подсчета введенных символов
- Возможность добавить **префикс/постфикс**, дополнительные элементы слева и справа от поля
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
        },
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
            },
        },
        prefixText: {
            control: { type: "text" },
            description: "Текст префикса",
            table: {
                type: { summary: "string" },
            },
        },
        postfixText: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: {
                type: { summary: "string" },
            },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания",
            table: {
                type: { summary: "string" },
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
            options: Object.values(EComponentSize),
            description: "Размер поля ввода",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: {
                type: { summary: "string" },
            },
        },
        inputProps: {
            control: { type: "object" },
            description: "Свойства поля ввода",
            table: {
                type: { summary: "IFormFieldInputProps & { ref?: React.RefObject<HTMLInputElement> }" },
            },
        },
    },
    tags: ["autodocs"],
};

interface IPlaygroundProps extends React.ComponentProps<typeof TextField> {
    labelText?: string;
    placeholder?: string;
    prefixText?: string;
    postfixText?: string;
    descriptionText?: string;
    showLabel?: boolean;
}

export const Playground: StoryObj<IPlaygroundProps> = {
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
                        placeholder: placeholder || "Type to proceed",
                    }}
                    label={showLabel ? labelText || "Label" : undefined}
                />
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
            },
        },
        prefixText: {
            control: { type: "text" },
            description: "Текст префикса",
            table: {
                type: { summary: "string" },
            },
        },
        postfixText: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: {
                type: { summary: "string" },
            },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания",
            table: {
                type: { summary: "string" },
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
            options: Object.values(EComponentSize),
            description: "Размер поля ввода",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
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
        size: EComponentSize.LG,
        labelText: "Label",
        showLabel: true,
        placeholder: "Type to proceed",
        prefixText: "",
        postfixText: "",
        descriptionText: "(21) Description",
        className: "",
        counter: "0/201",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация TextField с расширенными controls. Позволяет настраивать все основные свойства компонента, включая тип поля, текст лейбла, плейсхолдер, префикс, постфикс и описание.",
            },
        },
        controls: {
            include: [
                "status",
                "labelText",
                "showLabel",
                "placeholder",
                "prefixText",
                "postfixText",
                "descriptionText",
                "counter",
                "size",
                "className",
            ],
        },
    },
};

export const Default: StoryObj<typeof TextField> = {
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
                            (21) Description
                        </Text>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
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
        controls: { disable: true },
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
                            (21) Description
                        </Text>
                    }
                    inputProps={{
                        ref: ref,
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
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
        controls: { disable: true },
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
                            (21) Description
                        </Text>
                    }
                    prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                    postfix={
                        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                            Text
                        </HelpBox>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
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
        controls: { disable: true },
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
                            (21) Description
                        </Text>
                    }
                    postfix={<FormFieldClear onClick={() => setValue("")} />}
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
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
        controls: { disable: true },
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
                story: "TextField с динамическим счетчиком символов. Счетчик показывает текущее количество символов и максимально допустимое.",
            },
        },
        controls: { disable: true },
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
                        size={EComponentSize.SM}
                        inputProps={{
                            value: valueSM,
                            onChange: handleChangeSM,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер MD (средний)
                    </Title>
                    <TextField
                        size={EComponentSize.MD}
                        inputProps={{
                            value: valueMD,
                            onChange: handleChangeMD,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер LG (большой) - по умолчанию
                    </Title>
                    <TextField
                        size={EComponentSize.LG}
                        inputProps={{
                            value: valueLG,
                            onChange: handleChangeLG,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
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
        controls: { disable: true },
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
                            (21) Description
                        </Text>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />

                <Gap size={24} />

                <TextField
                    status={EFormFieldStatus.ERROR}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Error text
                        </Text>
                    }
                    inputProps={{
                        value: valueError,
                        onChange: handleChangeError,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />

                <Gap size={24} />

                <TextField
                    status={EFormFieldStatus.WARNING}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                            Warning text
                        </Text>
                    }
                    inputProps={{
                        value: valueWarning,
                        onChange: handleChangeWarning,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />

                <Gap size={24} />

                <TextField
                    status={EFormFieldStatus.DISABLED}
                    inputProps={{}}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description
                        </Text>
                    }
                    label="Label"
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
        controls: { disable: true },
    },
};

export const Examples: StoryObj<typeof TextField> = {
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
                            (21) Description{" "}
                            <Link href="#" onClick={(event) => event.preventDefault()}>
                                Link text
                            </Link>
                        </Text>
                    }
                    counter={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {currentLength}/{maxLength}
                        </Text>
                    }
                    prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                    postfix={
                        <>
                            <FormFieldClear onClick={() => setValue("")} />
                            <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                                Text
                            </HelpBox>
                        </>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
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
        controls: { disable: true },
    },
};
