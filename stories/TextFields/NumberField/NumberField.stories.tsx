import React, { useState, useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    NumberField,
    FormFieldClear,
    Text,
    HelpBox,
    Link,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
    ETooltipSize,
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

export default {
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

type PlaygroundArgs = React.ComponentProps<typeof NumberField> & {
    /** С постфиксом. */
    withPostfix: boolean;
    /** С кнопкой очистки. */
    withClearButton: boolean;
    /** С описанием. */
    withDescription: boolean;
};

const STATUS_TO_POSTFIX_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.DISABLED,
    [EFormFieldStatus.ERROR]: EFontType.SECONDARY,
    [EFormFieldStatus.WARNING]: EFontType.SECONDARY,
};

const STATUS_TO_DESCRIPTION_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        inputProps: { placeholder: "0" },
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        active: false,
        // Settings
        withPostfix: false,
        withClearButton: false,
        withDescription: false,
    },
    render: ({ inputProps, status, withPostfix, withClearButton, withDescription, ...restArgs }) => {
        const [value, setValue] = useState("");

        const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
            (event) => setValue(event.target.value),
            [],
        );

        const renderPostfixInner = useCallback(() => {
            if (withPostfix) {
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {withClearButton && <FormFieldClear aria-label="clear value" onClick={() => setValue("")} />}
                        <Text size={ETextSize.B2} type={STATUS_TO_POSTFIX_FONT_TYPE_MAP[status!]}>
                            мм
                        </Text>
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    </div>
                );
            }
        }, [withPostfix, withClearButton, status]);

        const renderDescriptionInner = useCallback(() => {
            if (withDescription) {
                return (
                    <Text size={ETextSize.B4} type={STATUS_TO_DESCRIPTION_FONT_TYPE_MAP[status!]}>
                        (21) Description{" "}
                        <Link href="#" onClick={(event) => event.preventDefault()}>
                            Link text
                        </Link>
                    </Text>
                );
            }
        }, [withDescription, status]);

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
                />
            </div>
        );
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
        },
        active: {
            control: "boolean",
        },
        label: {
            control: { type: "text" },
        },
        prefix: {
            table: { disable: true },
        },
        postfix: {
            table: { disable: true },
        },
        description: {
            table: { disable: true },
        },
        counter: {
            table: { disable: true },
        },
        // Settings
        withPostfix: {
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withClearButton: {
            control: "boolean",
            if: { arg: "withPostfix", eq: true },
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withDescription: {
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
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
