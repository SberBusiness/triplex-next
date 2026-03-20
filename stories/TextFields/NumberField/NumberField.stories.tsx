import React, { useState, useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    NumberField,
    FormFieldClear,
    Text,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatusesExample,
    StatusesExampleSource,
    ProductionExample,
    ProductionExampleSource,
} from "./examples";

const meta = {
    title: "Components/TextFields/NumberField",
    component: NumberField,
    parameters: {
        testRunner: { skip: true },
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={NumberField} />
                    <Heading>Playground</Heading>
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

const STATUS_TO_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

export const Playground: StoryObj<typeof meta> = {
    tags: ["!autodocs"],
    args: {
        inputProps: { placeholder: "0" },
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        prefix: "",
        postfix: "",
        description: "",
        counter: "",
        // Settings
        withClearButton: false,
    },
    render: ({ inputProps, status, postfix, description, counter, withClearButton, ...restArgs }) => {
        const [value, setValue] = useState("");

        const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
            (event) => setValue(event.target.value),
            [],
        );

        const renderPostfixInner = useCallback(() => {
            if (postfix.length !== 0) {
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {withClearButton && <FormFieldClear aria-label="clear value" onClick={() => setValue("")} />}
                        {postfix}
                    </div>
                );
            }
        }, [postfix, withClearButton]);

        const renderDescriptionInner = useCallback(() => {
            if (description.length !== 0) {
                return (
                    <Text size={ETextSize.B4} type={STATUS_TO_FONT_TYPE_MAP[status]}>
                        {description}
                    </Text>
                );
            }
        }, [status, description]);

        const renderCounterInner = useCallback(() => {
            if (counter.length !== 0) {
                return (
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        {counter}
                    </Text>
                );
            }
        }, [counter]);

        return (
            <div style={{ maxWidth: "300px" }}>
                <NumberField
                    {...restArgs}
                    status={status}
                    inputProps={{
                        value,
                        onChange: handleInputChange,
                        ...inputProps,
                    }}
                    postfix={renderPostfixInner()}
                    description={renderDescriptionInner()}
                    counter={renderCounterInner()}
                />
            </div>
        );
    },
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
        // Settings
        withClearButton: {
            control: "boolean",
            description: "С кнопкой очистки.",
            table: {
                category: "Settings",
            },
        },
    },
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof NumberField> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof NumberField> = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: StoryObj<typeof NumberField> = {
    name: "Statuses",
    render: StatusesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: StatusesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Production: StoryObj<typeof NumberField> = {
    name: "Example: production",
    render: ProductionExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
    },
};
