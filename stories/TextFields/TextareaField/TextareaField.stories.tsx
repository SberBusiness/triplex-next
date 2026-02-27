import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    TextareaField,
    FormFieldClear,
    HelpBox,
    Text,
    Link,
    EComponentSize,
    EFormFieldStatus,
    ETooltipSize,
    ETextSize,
    EFontType,
} from "../../../src";
import { getTextareaPostfixInnerStyles, getTextareaDescriptionTextProps } from "./utils";

const meta = {
    title: "Components/TextFields/TextareaField",
    component: TextareaField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TextareaField} />
                    <Heading>Playground</Heading>
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

interface IPlaygroundStoryArgs {
    withClearButton: boolean;
}

type PlaygroundStory = StoryObj<React.ComponentProps<typeof TextareaField> & IPlaygroundStoryArgs>;

export const Playground: PlaygroundStory = {
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    tags: ["!autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            table: {
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
            },
        },
        label: {
            control: { type: "text" },
        },
        prefix: {
            control: { type: "text" },
        },
        postfix: {
            control: { type: "text" },
        },
        description: {
            control: { type: "text" },
        },
        counter: {
            control: { type: "text" },
        },
        withClearButton: {
            control: "boolean",
            description: "С кнопкой очистки.",
            table: {
                category: "Playground Only",
            },
        },
    },
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        textareaProps: { placeholder: "Type to proceed" },
        label: "Label",
        prefix: "",
        postfix: "",
        description: "",
        counter: "",
        // Playground
        withClearButton: false,
    },
    render: ({ textareaProps, postfix, description, counter, withClearButton, ...restArgs }) => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "300px" }}>
                <TextareaField
                    {...restArgs}
                    textareaProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
                        ...textareaProps,
                    }}
                    postfix={
                        (postfix || withClearButton) && (
                            <div style={getTextareaPostfixInnerStyles(restArgs.size)}>
                                {withClearButton && (
                                    <FormFieldClear onClick={() => setValue("")} aria-label="Clear value" />
                                )}
                                {postfix}
                            </div>
                        )
                    }
                    description={
                        description && <Text {...getTextareaDescriptionTextProps(restArgs.status)}>{description}</Text>
                    }
                    counter={
                        counter && (
                            <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {counter}
                            </Text>
                        )
                    }
                />
            </div>
        );
    },
};

export const Basic: Story = {
    parameters: {
        docs: {
            controls: { disable: true },
        },
    },
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        textareaProps: { placeholder: "Type to proceed" },
        label: "Label",
    },
    render: ({ textareaProps, ...restArgs }) => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "300px" }}>
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

export const Sizes: Story = {
    parameters: {
        controls: { disable: true },
    },
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        textareaProps: { placeholder: "Type to proceed" },
        label: "Label",
    },
    render: ({ textareaProps, ...restArgs }) => {
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
            <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {sizes.map((size) => (
                    <TextareaField
                        key={size}
                        {...restArgs}
                        size={size}
                        textareaProps={{
                            value: values[size],
                            onChange: (event) =>
                                setValues((prevValues) => ({ ...prevValues, [size]: event.target.value })),
                            ...textareaProps,
                        }}
                    />
                ))}
            </div>
        );
    },
};

export const Statuses: Story = {
    parameters: {
        controls: { disable: true },
    },
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        textareaProps: { placeholder: "Type to proceed" },
        label: "Label",
    },
    render: ({ textareaProps, ...restArgs }) => {
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
            <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {statuses.map((status) => (
                    <TextareaField
                        key={status}
                        {...restArgs}
                        status={status}
                        textareaProps={{
                            value: values[status],
                            onChange: (event) =>
                                setValues((prevValues) => ({ ...prevValues, [status]: event.target.value })),
                            ...textareaProps,
                        }}
                    />
                ))}
            </div>
        );
    },
};

export const WithClearButton: Story = {
    name: "With clear button",
    parameters: {
        controls: { disable: true },
    },
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        textareaProps: { placeholder: "Type to proceed" },
        label: "Label",
    },
    render: ({ textareaProps, ...restArgs }) => {
        const [value, setValue] = useState("8967");

        return (
            <div style={{ maxWidth: "300px" }}>
                <TextareaField
                    {...restArgs}
                    textareaProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
                        ...textareaProps,
                    }}
                    postfix={
                        <div style={getTextareaPostfixInnerStyles(restArgs.size)}>
                            <FormFieldClear onClick={() => setValue("")} aria-label="Clear value" />
                        </div>
                    }
                />
            </div>
        );
    },
};

export const Example: Story = {
    parameters: {
        controls: { disable: true },
    },
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        textareaProps: { placeholder: "Type to proceed" },
        label: "Label",
    },
    render: ({ textareaProps, ...restArgs }) => {
        const [value, setValue] = useState("");

        return (
            <div style={{ maxWidth: "300px" }}>
                <TextareaField
                    {...restArgs}
                    textareaProps={{
                        value,
                        onChange: (event) => setValue(event.target.value),
                        ...textareaProps,
                    }}
                    postfix={
                        <div style={getTextareaPostfixInnerStyles(restArgs.size)}>
                            <FormFieldClear onClick={() => setValue("")} aria-label="Clear value" />
                            <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                        </div>
                    }
                    description={
                        <Text {...getTextareaDescriptionTextProps(restArgs.status)}>
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
