import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { AmountField } from "../../src/components/AmountField/AmountField";
import { Text, ETextSize, EFontType } from "../../src/components/Typography";
import { EFormFieldStatus } from "../../src/components/FormField/enums";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { Link } from "../../src/components/Link";
import { ETooltipSize } from "../../src/components/Tooltip/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";

const meta = {
    title: "Components/TextFields/AmountField",
    component: AmountField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Title>Props</Title>
                    <Controls of={Basic} />
                    <Title>Playground</Title>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof AmountField>;

export default meta;
type Story = StoryObj<typeof meta>;

const useAmountFieldLogic = (defaultValue = "") => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (value: string) => setValue(value);

    const handleClear = () => setValue("");

    return {
        value,
        onChange: handleChange,
        onClear: handleClear,
    };
};

export const Playground: Story = {
    parameters: {
        docs: {
            description: { story: "Интерактивная демонстрация." },
            canvas: { sourceState: "none" },
        },
    },
    tags: ["!autodocs"],
    argTypes: {
        inputProps: {
            description: "Свойства поля ввода",
            table: { type: { summary: "object" } },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние поля",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "DEFAULT" },
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
        label: {
            control: { type: "text" },
            description: "Текст лейбла",
            table: { type: { summary: "string" } },
        },
        description: {
            control: { type: "text" },
            description: "Текст описания",
            table: { type: { summary: "string" } },
        },
        currency: {
            control: { type: "text" },
            description: "Валюта",
            table: { type: { summary: "string" } },
        },
        prefix: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: { type: { summary: "string" } },
        },
        postfix: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: { type: { summary: "string" } },
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
        inputProps: { placeholder: "0,00" },
        status: EFormFieldStatus.DEFAULT,
        size: EComponentSize.LG,
        label: "Label",
        currency: "RUB",
        prefix: "",
        postfix: "",
        description: "",
        maxIntegerDigits: 16,
        fractionDigits: 2,
    },
    render: (args) => {
        const { value, onChange } = useAmountFieldLogic();
        const { inputProps, ...restArgs } = args;

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    {...restArgs}
                    inputProps={{
                        value,
                        onChange,
                        ...inputProps,
                    }}
                />
            </div>
        );
    },
};

export const Basic: Story = {
    parameters: {
        docs: {
            description: { story: "Базовый пример." },
            controls: { disable: true },
        },
    },
    render: () => {
        const { value, onChange } = useAmountFieldLogic();

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    inputProps={{
                        value,
                        onChange,
                        placeholder: "0,00",
                    }}
                    status={EFormFieldStatus.DEFAULT}
                    size={EComponentSize.LG}
                    label="Label"
                    currency="RUB"
                    maxIntegerDigits={18}
                    fractionDigits={2}
                />
            </div>
        );
    },
};

export const Sizes: Story = {
    parameters: {
        docs: { description: { story: "Размеры" } },
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <div style={{ maxWidth: "304px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {sizes.map((size) => {
                    const { value, onChange } = useAmountFieldLogic();

                    return (
                        <AmountField
                            key={size}
                            inputProps={{ value, onChange, placeholder: "0,00" }}
                            size={size}
                            label="Label"
                        />
                    );
                })}
            </div>
        );
    },
};

export const Statuses: Story = {
    parameters: {
        docs: { description: { story: "Статусы." } },
        controls: { disable: true },
    },
    render: () => {
        const statuses = Object.values(EFormFieldStatus);

        return (
            <div style={{ maxWidth: "304px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {statuses.map((status) => {
                    const { value, onChange } = useAmountFieldLogic();

                    return (
                        <AmountField
                            key={status}
                            inputProps={{ value, onChange, placeholder: "0,00" }}
                            status={status}
                            label="Label"
                        />
                    );
                })}
            </div>
        );
    },
};

export const WithClearButton: Story = {
    name: "With clear button",
    parameters: {
        docs: { description: { story: "С кнопкой очистки." } },
        controls: { disable: true },
    },
    render: () => {
        const { value, onChange, onClear } = useAmountFieldLogic("123.45");

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    inputProps={{
                        value,
                        onChange,
                    }}
                    label="Label"
                    onClear={onClear}
                />
            </div>
        );
    },
};

export const Example: Story = {
    parameters: {
        docs: { description: { story: "В сочетании с другими компонентами." } },
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <AmountField
                    inputProps={{
                        value,
                        onChange: setValue,
                    }}
                    label="Label"
                    currency="RUB"
                    postfix={<HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>}
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description{" "}
                            <Link href="#" onClick={(event) => event.preventDefault()}>
                                Link text
                            </Link>
                        </Text>
                    }
                />
            </div>
        );
    },
};
