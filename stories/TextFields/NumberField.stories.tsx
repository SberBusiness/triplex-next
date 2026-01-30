import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";
import { NumberField } from "../../src/components/NumberField/NumberField";
import { Text, ETextSize, EFontType } from "../../src/components/Typography";
import { EFormFieldStatus } from "../../src/components/FormField/enums";
import { FormFieldClear } from "../../src/components/FormField/components/FormFieldClear";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { Link } from "../../src/components/Link";
import { ETooltipSize } from "../../src/components/Tooltip/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";

const meta = {
    title: "Components/TextFields/NumberField",
    component: NumberField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Title>Props</Title>
                    <ArgTypes of={NumberField} />
                    <Title>Playground</Title>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

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
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер поля",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
            },
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
        label: {
            control: { type: "text" },
            description: "Текст лейбла",
            table: { type: { summary: "string" } },
        },
        prefix: {
            control: { type: "text" },
            description: "Текст префикса",
            table: { type: { summary: "string" } },
        },
        postfix: {
            control: { type: "text" },
            description: "Текст постфикса",
            table: { type: { summary: "string" } },
        },
        description: {
            control: { type: "text" },
            description: "Текст описания",
            table: { type: { summary: "string" } },
        },
        counter: {
            control: { type: "text" },
            description: "Текст счётчика",
            table: { type: { summary: "string" } },
        },
    },
    args: {
        inputProps: { placeholder: "0" },
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        prefix: "",
        postfix: "",
        description: "",
        counter: "",
    },
    render: (args) => {
        const [value, setValue] = useState("");
        const { inputProps, ...restArgs } = args;

        return (
            <div style={{ maxWidth: "304px" }}>
                <NumberField
                    {...restArgs}
                    inputProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
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
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <NumberField
                    inputProps={{
                        value,
                        placeholder: "0",
                        onChange: (event) => setValue(event.target.value),
                    }}
                    status={EFormFieldStatus.DEFAULT}
                    size={EComponentSize.LG}
                    label="Label"
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
                    const [value, setValue] = useState("");

                    return (
                        <NumberField
                            key={size}
                            inputProps={{
                                value,
                                placeholder: "0",
                                onChange: (event) => setValue(event.target.value),
                            }}
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
                    const [value, setValue] = useState("");

                    return (
                        <NumberField
                            key={status}
                            inputProps={{
                                value,
                                placeholder: "0",
                                onChange: (event) => setValue(event.target.value),
                            }}
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
        const [value, setValue] = useState("8967");

        return (
            <div style={{ maxWidth: "304px" }}>
                <NumberField
                    inputProps={{
                        value,
                        placeholder: "0",
                        onChange: (event) => setValue(event.target.value),
                    }}
                    label="Label"
                    postfix={<FormFieldClear onClick={() => setValue("")} />}
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
                <NumberField
                    inputProps={{
                        value,
                        placeholder: "0",
                        onChange: (event) => setValue(event.target.value),
                    }}
                    label="Label"
                    postfix={
                        <>
                            <FormFieldClear onClick={() => setValue("")} />
                            <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
                                мм
                            </Text>
                            <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                        </>
                    }
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
