import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { AmountField } from "../../src/components/AmountField/AmountField";
import { Text, ETextSize, EFontType, Title, ETitleSize } from "../../src/components/Typography";
import { EFormFieldStatus } from "../../src/components/FormField/enums";
import { Gap } from "../../src/components/Gap";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { ETooltipSize } from "../../src/components/Tooltip/enums";
import { ETooltipPreferPlace } from "../../src/components/Tooltip/enums";
import { Title as DocsTitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "../../src/enums/EComponentSize";

export default {
    title: "Components/TextFields/AmountField",
    component: AmountField,
    parameters: {
        docs: {
            description: {
                component: `
Компонент AmountField — поле ввода денежных сумм на базе FormField/FormGroup с форматированием и управлением кареткой.

## Возможности

- Форматирование значений с учётом дробной части
- Валюта (отображается справа)
- Префикс/Постфикс
- Состояния и размеры из FormField
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
};

type AmountFieldProps = React.ComponentProps<typeof AmountField>;

interface IAmountFieldWithControlsProps
    extends Omit<AmountFieldProps, "label" | "description" | "postfix" | "currency" | "inputProps"> {
    labelText?: string;
    descriptionText?: string;
    placeholder?: string;
    postfixText?: string;
    currency?: string;
    maxIntegerDigits?: number;
    fractionDigits?: number;
}

export const Playground: StoryObj<IAmountFieldWithControlsProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const {
            labelText,
            descriptionText,
            placeholder,
            postfixText,
            currency,
            maxIntegerDigits,
            fractionDigits,
            ...formFieldProps
        } = args;

        const handleChange = (nextValue: string) => setValue(nextValue);

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    {...formFieldProps}
                    label={labelText || "Сумма"}
                    description={
                        descriptionText ? (
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {descriptionText}
                            </Text>
                        ) : undefined
                    }
                    postfix={postfixText || ""}
                    currency={currency}
                    maxIntegerDigits={maxIntegerDigits}
                    fractionDigits={fractionDigits}
                    inputProps={{
                        value,
                        onChange: handleChange,
                        placeholder: placeholder || "0,00",
                    }}
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
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер поля",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
        labelText: {
            control: { type: "text" },
            description: "Текст лейбла",
            table: { type: { summary: "string" }, defaultValue: { summary: "Сумма" } },
        },
        descriptionText: {
            control: { type: "text" },
            description: "Текст описания",
            table: { type: { summary: "string" }, defaultValue: { summary: "Описание поля" } },
        },
        placeholder: {
            control: { type: "text" },
            description: "Плейсхолдер",
            table: { type: { summary: "string" }, defaultValue: { summary: "0,00" } },
        },
        postfixText: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: { type: { summary: "string" } },
        },
        currency: {
            control: { type: "text" },
            description: "Валюта",
            table: { type: { summary: "string" }, defaultValue: { summary: "RUB" } },
        },
        maxIntegerDigits: {
            control: { type: "number" },
            description: "Макс. знаков до запятой",
            table: { type: { summary: "number" }, defaultValue: { summary: "16" } },
        },
        fractionDigits: {
            control: { type: "number" },
            description: "Знаков после запятой",
            table: { type: { summary: "number" }, defaultValue: { summary: "2" } },
        },
    },
    args: {
        status: EFormFieldStatus.DEFAULT,
        size: EComponentSize.LG,
        labelText: "Сумма",
        descriptionText: "Описание поля",
        placeholder: "0,00",
        postfixText: "",
        currency: "RUB",
        maxIntegerDigits: 16,
        fractionDigits: 2,
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация AmountField с управлением лейблом, плейсхолдером, валютой и точностью.",
            },
        },
        controls: {
            include: [
                "status",
                "size",
                "labelText",
                "descriptionText",
                "placeholder",
                "postfixText",
                "currency",
                "maxIntegerDigits",
                "fractionDigits",
            ],
        },
    },
};

export const Default: StoryObj<typeof AmountField> = {
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    currency="RUB"
                    inputProps={{
                        value,
                        onChange: setValue,
                        placeholder: "0,00",
                    }}
                    label="Сумма"
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const Basic: StoryObj<typeof AmountField> = {
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    currency="RUB"
                    inputProps={{
                        value,
                        onChange: setValue,
                        placeholder: "0,00",
                    }}
                    label="Сумма"
                />
            </div>
        );
    },
    parameters: {
        docs: { description: { story: "Базовый пример AmountField с лейблом и описанием." } },
        controls: { disable: true },
    },
};

export const WithCurrencyAndPostfix: StoryObj<typeof AmountField> = {
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    currency="RUB"
                    postfix={
                        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                            Text
                        </HelpBox>
                    }
                    inputProps={{
                        value,
                        onChange: setValue,
                    }}
                    label="Сумма"
                />
            </div>
        );
    },
    parameters: {
        docs: { description: { story: "AmountField с валютой и постфиксом." } },
        controls: { disable: true },
    },
};

export const WithClearButton: StoryObj<typeof AmountField> = {
    render: () => {
        const [value, setValue] = useState("123456");

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    inputProps={{
                        value,
                        onChange: setValue,
                    }}
                    label="Сумма"
                />
            </div>
        );
    },
    parameters: {
        docs: { description: { story: "Кнопка очистки встроена в AmountField по умолчанию." } },
        controls: { disable: true },
    },
};

export const Sizes: StoryObj<typeof AmountField> = {
    render: () => {
        const [valueSM, setValueSM] = useState("");
        const [valueMD, setValueMD] = useState("");
        const [valueLG, setValueLG] = useState("");

        return (
            <div style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер SM (маленький)
                    </Title>
                    <AmountField
                        size={EComponentSize.SM}
                        inputProps={{ value: valueSM, onChange: setValueSM, placeholder: "0,00" }}
                        label="SM"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер MD (средний)
                    </Title>
                    <AmountField
                        size={EComponentSize.MD}
                        inputProps={{ value: valueMD, onChange: setValueMD, placeholder: "0,00" }}
                        label="MD"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                        Размер LG (большой)
                    </Title>
                    <AmountField
                        size={EComponentSize.LG}
                        inputProps={{ value: valueLG, onChange: setValueLG, placeholder: "0,00" }}
                        label="LG"
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Демонстрация размеров AmountField: SM, MD, LG. Размер влияет на высоту поля и отступы, как и в TextField.",
            },
        },
        controls: { disable: true },
    },
};

export const States: StoryObj<typeof AmountField> = {
    render: () => {
        const [value, setValue] = useState("");
        const [valueError, setValueError] = useState("");
        const [valueWarning, setValueWarning] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    inputProps={{ value, onChange: setValue, placeholder: "0,00" }}
                    label="Обычное"
                />

                <Gap size={24} />

                <AmountField
                    status={EFormFieldStatus.ERROR}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                            Текст ошибки
                        </Text>
                    }
                    inputProps={{ value: valueError, onChange: setValueError }}
                    label="Ошибка"
                />

                <Gap size={24} />

                <AmountField
                    status={EFormFieldStatus.WARNING}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                            Текст предупреждения
                        </Text>
                    }
                    inputProps={{ value: valueWarning, onChange: setValueWarning }}
                    label="Предупреждение"
                />

                <Gap size={24} />

                <AmountField
                    status={EFormFieldStatus.DISABLED}
                    inputProps={{ value: "100 000,00", onChange: () => {} }}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            Описание поля
                        </Text>
                    }
                    label="Отключено"
                />
            </div>
        );
    },
    parameters: {
        docs: { description: { story: "Состояния AmountField: обычное, ошибка, предупреждение, отключено." } },
        controls: { disable: true },
    },
};
