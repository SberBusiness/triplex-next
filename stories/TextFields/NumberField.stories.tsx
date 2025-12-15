import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { NumberField, EComponentSize, EFormFieldStatus, Text, ETextSize, EFontType } from "../../src";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

const meta: Meta<typeof NumberField> = {
    title: "Components/TextFields/NumberField",
    component: NumberField,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: `
NumberField - текстовое поле для ввода числовых значений.

## Использование

\`\`\`tsx
import React, { useState } from "react";
import { NumberField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

const [value, setValue] = useState("");

const handleChange: React.ChangeEventHandler<HTMLTextareaElement> = (event) => {
    setValue(event.target.value);
};

<NumberField
    size={EComponentSize.LG}
    status={EFormFieldStatus.DEFAULT}
    inputProps={{ value, placeholder: "0", onChange: handleChange }}
    label="Label"
    prefix="Prefix"
    postfix="Postfix"
    description="Description"
    counter="Counter"
/>
\`\`\`
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента.",
            table: {
                type: {
                    summary: Object.values(EComponentSize).join(" | "),
                },
            },
            defaultValue: { summary: EComponentSize.LG },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Визуальное состояние компонента.",
            table: {
                type: {
                    summary: Object.values(EFormFieldStatus).join(" | "),
                },
                defaultValue: { summary: EFormFieldStatus.DEFAULT },
            },
        },
        description: {
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
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "304px" }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof NumberField>;

const NumberFieldTemplate = (args) => {
    const [value, setValue] = useState("");
    const { inputProps, prefix, postfix, description, counter, ...restArgs } = args;
    const targetTextType = args.status === EFormFieldStatus.DISABLED ? EFontType.DISABLED : EFontType.SECONDARY;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <NumberField
            inputProps={{ ...inputProps, value: value, onChange: handleChange }}
            prefix={
                prefix?.length !== 0 && (
                    <Text tag="div" size={ETextSize.B2} type={targetTextType}>
                        {prefix}
                    </Text>
                )
            }
            postfix={
                postfix?.length !== 0 && (
                    <Text tag="div" size={ETextSize.B2} type={targetTextType}>
                        {postfix}
                    </Text>
                )
            }
            description={
                description?.length !== 0 && (
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        {description}
                    </Text>
                )
            }
            counter={
                counter?.length !== 0 && (
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        {counter}
                    </Text>
                )
            }
            {...restArgs}
        />
    );
};

export const Default: Story = {
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        inputProps: { placeholder: "0" },
        label: "Label",
        prefix: "Prefix",
        postfix: "Postfix",
        description: "Description",
        counter: "Counter",
    },
    render: NumberFieldTemplate,
    parameters: {
        controls: { disable: true },
    },
};

export const Playground: Story = {
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        inputProps: { placeholder: "0" },
        label: "Label",
        prefix: "Prefix",
        postfix: "Postfix",
        description: "Description",
        counter: "Counter",
    },
    render: NumberFieldTemplate,
    parameters: {
        controls: {
            include: ["size", "status", "description", "counter"],
        },
    },
};

const sizeToLabelMap = {
    [EComponentSize.SM]: "SM",
    [EComponentSize.MD]: "MD",
    [EComponentSize.LG]: "LG",
};

export const Sizes: Story = {
    args: {
        status: EFormFieldStatus.DEFAULT,
        inputProps: { placeholder: "0" },
    },
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {Object.values(EComponentSize).map((size) => (
                <NumberFieldTemplate key={size} size={size} label={sizeToLabelMap[size]} {...args} />
            ))}
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

const statusToLabelMap = {
    [EFormFieldStatus.DEFAULT]: "Default",
    [EFormFieldStatus.DISABLED]: "Disabled",
    [EFormFieldStatus.ERROR]: "Error",
    [EFormFieldStatus.WARNING]: "Warning",
};

export const Statuses: Story = {
    args: {
        size: EComponentSize.LG,
        inputProps: { placeholder: "0" },
    },
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {Object.values(EFormFieldStatus).map((status) => (
                <NumberFieldTemplate key={status} status={status} label={statusToLabelMap[status]} {...args} />
            ))}
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};
