import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Primary, Controls, Stories, Heading } from "@storybook/addon-docs/blocks";
import {
    AmountField,
    HelpBox,
    Text,
    Link,
    EComponentSize,
    EFormFieldStatus,
    ETooltipSize,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";

export default {
    title: "Components/TextFields/AmountField",
    component: AmountField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={AmountField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof AmountField>;

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

export const Playground: StoryObj<typeof AmountField> = {
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
        },
        testRunner: { skip: true },
    },
    tags: ["!autodocs"],
    argTypes: {
        inputProps: {
            table: { type: { summary: "object" } },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
        label: {
            control: { type: "text" },
        },
        currency: {
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
        maxIntegerDigits: {
            control: { type: "number" },
        },
        fractionDigits: {
            control: { type: "number" },
        },
        active: {
            control: { type: "boolean" },
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
        counter: "",
        maxIntegerDigits: 16,
        fractionDigits: 2,
        active: false,
    },
    render: (args) => {
        const { value, onChange } = useAmountFieldLogic();
        const { inputProps, ...restArgs } = args;

        return (
            <div style={{ maxWidth: 300 }}>
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

export const Default: StoryObj<typeof AmountField> = {
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: () => {
        const { value, onChange } = useAmountFieldLogic();

        return (
            <div style={{ maxWidth: 300 }}>
                <AmountField
                    inputProps={{
                        value,
                        placeholder: "0,00",
                        onChange,
                    }}
                    status={EFormFieldStatus.DEFAULT}
                    size={EComponentSize.LG}
                    label="Label"
                    maxIntegerDigits={18}
                    fractionDigits={2}
                />
            </div>
        );
    },
};

export const Sizes: StoryObj<typeof AmountField> = {
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <div style={{ maxWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>
                {sizes.map((size) => {
                    const { value, onChange } = useAmountFieldLogic();

                    return (
                        <AmountField
                            key={size}
                            inputProps={{
                                value,
                                placeholder: "0,00",
                                onChange,
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

export const Statuses: StoryObj<typeof AmountField> = {
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: () => {
        const statuses = Object.values(EFormFieldStatus);

        return (
            <div style={{ maxWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>
                {statuses.map((status) => {
                    const { value, onChange } = useAmountFieldLogic();

                    return (
                        <AmountField
                            key={status}
                            inputProps={{
                                value,
                                placeholder: "0,00",
                                onChange,
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

export const WithClearButton: StoryObj<typeof AmountField> = {
    name: "With clear button",
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: () => {
        const { value, onChange, onClear } = useAmountFieldLogic("8967452.31");

        return (
            <div style={{ maxWidth: 300 }}>
                <AmountField
                    inputProps={{
                        value,
                        placeholder: "0,00",
                        onChange,
                    }}
                    label="Label"
                    onClear={onClear}
                />
            </div>
        );
    },
};

export const Production: StoryObj<typeof AmountField> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: () => {
        const { value, onChange, onClear } = useAmountFieldLogic("");

        return (
            <div style={{ maxWidth: 300 }}>
                <AmountField
                    inputProps={{
                        value,
                        placeholder: "0,00",
                        onChange,
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
                    onClear={onClear}
                />
            </div>
        );
    },
};
