import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";
import { TextareaField } from "../../src/components/TextareaField";
import { Text, ETextSize, EFontType } from "../../src/components/Typography";
import { EFormFieldStatus } from "../../src/components/FormField/enums";
import { FormFieldClear } from "../../src/components/FormField/components/FormFieldClear";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { Link } from "../../src/components/Link";
import { ETooltipSize } from "../../src/components/Tooltip/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";

const meta = {
    title: "Components/TextFields/TextareaField",
    component: TextareaField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Title>Props</Title>
                    <ArgTypes of={TextareaField} />
                    <Title>Playground</Title>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof TextareaField>;

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
        textareaProps: {
            description: "Свойства компонента FormFieldTextarea.",
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
            description: "Текст постфикса",
            table: { type: { summary: "string" } },
        },
        postfix: {
            control: { type: "text" },
            description: "Текст префикса",
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
        textareaProps: { placeholder: "Type to proceed" },
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        prefix: "",
        postfix: "",
        description: "",
        counter: "",
    },
    render: ({ textareaProps, ...restArgs }) => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextareaField
                    {...restArgs}
                    textareaProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
                        ...textareaProps,
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
    args: {
        textareaProps: { placeholder: "Type to proceed" },
    },
    render: ({ textareaProps }) => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextareaField
                    textareaProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
                        ...textareaProps,
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
    args: {
        textareaProps: { placeholder: "Type to proceed" },
    },
    render: ({ textareaProps }) => {
        const sizes = Object.values(EComponentSize);
        const [values, setValues] = useState(() =>
            sizes.reduce(
                (acc, size) => {
                    acc[size] = "";
                    return acc;
                },
                {} as Record<EComponentSize, string>,
            ),
        );

        return (
            <div style={{ maxWidth: "304px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {sizes.map((size) => (
                    <TextareaField
                        key={size}
                        textareaProps={{
                            value: values[size],
                            onChange: (event) =>
                                setValues((prevValues) => ({ ...prevValues, [size]: event.target.value })),
                            ...textareaProps,
                        }}
                        size={size}
                        label="Label"
                    />
                ))}
            </div>
        );
    },
};

export const Statuses: Story = {
    parameters: {
        docs: { description: { story: "Статусы." } },
        controls: { disable: true },
    },
    args: {
        textareaProps: { placeholder: "Type to proceed" },
    },
    render: ({ textareaProps }) => {
        const statuses = Object.values(EFormFieldStatus);
        const [values, setValues] = useState(() =>
            statuses.reduce(
                (acc, status) => {
                    acc[status] = "";
                    return acc;
                },
                {} as Record<EFormFieldStatus, string>,
            ),
        );

        return (
            <div style={{ maxWidth: "304px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {statuses.map((status) => (
                    <TextareaField
                        key={status}
                        textareaProps={{
                            value: values[status],
                            onChange: (event) =>
                                setValues((prevValues) => ({ ...prevValues, [status]: event.target.value })),
                            ...textareaProps,
                        }}
                        status={status}
                        label="Label"
                    />
                ))}
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
    args: {
        textareaProps: { placeholder: "Type to proceed" },
    },
    render: ({ textareaProps }) => {
        const [value, setValue] = useState("8967");

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextareaField
                    textareaProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
                        ...textareaProps,
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
    args: {
        textareaProps: { placeholder: "Type to proceed" },
    },
    render: ({ textareaProps }) => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "304px" }}>
                <TextareaField
                    textareaProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
                        ...textareaProps,
                    }}
                    label="Label"
                    postfix={
                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                alignSelf: "flex-start",
                                alignItems: "center",
                                height: "18px",
                            }}
                        >
                            <FormFieldClear onClick={() => setValue("")} />
                            <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                        </div>
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
