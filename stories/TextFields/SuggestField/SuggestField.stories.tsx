import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Primary, Controls, Stories, Heading } from "@storybook/addon-docs/blocks";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import {
    SuggestField,
    Text,
    HelpBox,
    Link,
    ISuggestFieldOption,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
    ETooltipSize,
} from "../../../src";
import { useSuggestField, useSuggestFieldAsync } from "./useSuggestField";

const meta = {
    title: "Components/TextFields/SuggestField",
    component: SuggestField,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SuggestField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    decorators: [
        (Story) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SuggestField>;

export default meta;
type Story = StoryObj<typeof meta>;

const FRUIT_DATA = [
    { label: "Hot Pepper", icon: "🌶️", category: "Berries" },
    { label: "Corn", icon: "🌽", category: "Dry Fruits" },
    { label: "Tomato", icon: "🍅", category: "Berries" },
    { label: "Eggplant", icon: "🍆", category: "Berries" },
    { label: "Grapes", icon: "🍇", category: "Berries" },
    { label: "Melon", icon: "🍈", category: "Pepos" },
    { label: "Watermelon", icon: "🍉", category: "Pepos" },
    { label: "Tangerine", icon: "🍊", category: "Hesperidia" },
    { label: "Lemon", icon: "🍋", category: "Hesperidia" },
    { label: "Banana", icon: "🍌", category: "Berries" },
    { label: "Pineapple", icon: "🍍", category: "Multiple Fruits" },
    { label: "Red Apple", icon: "🍎", category: "Pomes" },
    { label: "Green Apple", icon: "🍏", category: "Pomes" },
    { label: "Pear", icon: "🍐", category: "Pomes" },
    { label: "Peach", icon: "🍑", category: "Drupes" },
    { label: "Cherries", icon: "🍒", category: "Drupes" },
    { label: "Strawberry", icon: "🍓", category: "Aggregate Fruits" },
    { label: "Avocado", icon: "🥑", category: "Berries" },
    { label: "Cucumber", icon: "🥒", category: "Pepos" },
    { label: "Kiwi", icon: "🥝", category: "Berries" },
    { label: "Coconut", icon: "🥥", category: "Drupes" },
    { label: "Mango", icon: "🥭", category: "Drupes" },
    { label: "Blueberries", icon: "🫐", category: "Berries" },
    { label: "Bell Pepper", icon: "🫑", category: "Berries" },
    { label: "Olive", icon: "🫒", category: "Drupes" },
    { label: "Pea Pod", icon: "🫛", category: "Dry Fruits" },
] as const;

const INITIAL_OPTIONS: ISuggestFieldOption[] = FRUIT_DATA.map((fruit, index) => ({
    id: `suggest-field-option-${index}`,
    label: fruit.label,
}));

export const Playground: Story = {
    name: "Playground",
    tags: ["!autodocs"],
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: [
                "size",
                "status",
                "label",
                "placeholder",
                "tooltipHint",
                "loading",
                "dropdownListLoading",
                "clearInputOnFocus",
            ],
        },
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                type: {
                    summary: Object.values(EComponentSize).join(" | "),
                },
                defaultValue: { summary: EComponentSize.LG },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            table: {
                type: {
                    summary: Object.values(EFormFieldStatus).join(" | "),
                },
                defaultValue: { summary: EFormFieldStatus.DEFAULT },
            },
        },
        label: {
            control: { type: "text" },
        },
        placeholder: {
            control: { type: "text" },
        },
        tooltipHint: {
            control: { type: "text" },
        },
        loading: {
            control: { type: "boolean" },
        },
        dropdownListLoading: {
            control: { type: "boolean" },
        },
        clearInputOnFocus: {
            control: { type: "boolean" },
        },
    },
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        placeholder: "Type to proceed",
        tooltipHint: "No matches found.",
        loading: false,
        dropdownListLoading: false,
        clearInputOnFocus: false,
    },
    render: (args) => {
        const { onClear, ...restSuggestField } = useSuggestField(INITIAL_OPTIONS);

        return <SuggestField {...args} {...restSuggestField} />;
    },
};

export const Default: Story = {
    parameters: {
        controls: {
            disable: true,
        },
    },
    render: () => {
        const { onClear, ...restSuggestField } = useSuggestField(INITIAL_OPTIONS);

        return (
            <SuggestField
                {...restSuggestField}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label={"Label"}
                placeholder={"Type to proceed"}
                tooltipHint={"No matches found."}
            />
        );
    },
};

export const Sizes: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <React.Fragment>
                {sizes.map((size) => {
                    const { onClear, ...restSuggestField } = useSuggestField(INITIAL_OPTIONS);

                    return (
                        <SuggestField
                            key={size}
                            {...restSuggestField}
                            size={size}
                            status={EFormFieldStatus.DEFAULT}
                            label={"Label"}
                            placeholder={"Type to proceed"}
                            tooltipHint={"No matches found."}
                        />
                    );
                })}
            </React.Fragment>
        );
    },
};

export const Statuses: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const statuses = Object.values(EFormFieldStatus);

        return (
            <React.Fragment>
                {statuses.map((status) => {
                    const { onClear, ...restSuggestField } = useSuggestField(INITIAL_OPTIONS);

                    return (
                        <SuggestField
                            key={status}
                            {...restSuggestField}
                            size={EComponentSize.LG}
                            status={status}
                            label={"Label"}
                            placeholder={"Type to proceed"}
                            tooltipHint={"No matches found."}
                        />
                    );
                })}
            </React.Fragment>
        );
    },
};

export const Loading: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const { onClear, ...restSuggestField } = useSuggestField([]);

        return (
            <SuggestField
                {...restSuggestField}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label={"Label"}
                placeholder={"Type to proceed"}
                tooltipHint={"No matches found."}
                loading={true}
            />
        );
    },
};

export const WithClearButton: Story = {
    name: "With clear button",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const suggestField = useSuggestField(INITIAL_OPTIONS, INITIAL_OPTIONS[0]);

        return (
            <SuggestField
                {...suggestField}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label={"Label"}
                placeholder={"Type to proceed"}
                tooltipHint={"No matches found."}
            />
        );
    },
};

const CUSTOM_INITIAL_OPTIONS: ISuggestFieldOption[] = FRUIT_DATA.map((fruit, index) => ({
    id: `suggest-field-custom-option-${index}`,
    label: fruit.label,
    content: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>{fruit.icon}</span>
            <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                {fruit.label}
            </Text>
            <Text size={ETextSize.B3} type={EFontType.SECONDARY} style={{ marginLeft: "auto" }}>
                {fruit.category}
            </Text>
        </div>
    ),
}));

export const WithCustomOptions: Story = {
    name: "With custom options",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const { onClear, ...restSuggestField } = useSuggestField(CUSTOM_INITIAL_OPTIONS);

        return (
            <SuggestField
                {...restSuggestField}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label={"Label"}
                placeholder={"Type to proceed"}
                tooltipHint={"No matches found."}
            />
        );
    },
};

export const Example: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const suggestField = useSuggestField(INITIAL_OPTIONS);

        return (
            <SuggestField
                {...suggestField}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label={"Label"}
                placeholder={"Type to proceed"}
                tooltipHint={"No matches found."}
                prefix={
                    <React.Fragment>
                        <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                    </React.Fragment>
                }
                postfix={
                    <React.Fragment>
                        <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    </React.Fragment>
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
        );
    },
};

export const ExampleAsync: Story = {
    name: "Example (async)",
    parameters: {
        controls: {
            disable: true,
        },
    },
    render: () => {
        const suggestFieldAsync = useSuggestFieldAsync(INITIAL_OPTIONS);

        return (
            <SuggestField
                {...suggestFieldAsync}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label={"Label"}
                placeholder={"Type to proceed"}
                tooltipHint={"No matches found."}
            />
        );
    },
};
