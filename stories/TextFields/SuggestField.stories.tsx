import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
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
} from "../../src";

const meta = {
    title: "Components/TextFields/SuggestField",
    component: SuggestField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Title>Props</Title>
                    <ArgTypes of={SuggestField} />
                    <Title>Playground</Title>
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

const fruits = [
    "Hot Pepper",
    "Corn",
    "Tomato",
    "Eggplant",
    "Grapes",
    "Melon",
    "Watermelon",
    "Tangerine",
    "Lemon",
    "Banana",
    "Pineapple",
    "Red Apple",
    "Green Apple",
    "Pear",
    "Peach",
    "Cherries",
    "Strawberry",
    "Avocado",
    "Cucumber",
    "Kiwi",
    "Coconut",
    "Mango",
    "Blueberries",
    "Bell Pepper",
    "Olive",
    "Pea Pod",
];

const basicOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
    id: `suggest-option-${index}`,
    label: fruit,
}));

// Базовая логика для переиспользования
const useSuggestFieldLogic = (defaultValue?: ISuggestFieldOption, initialOptions = basicOptions) => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(defaultValue);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleInputFocus = () => {
        setOptions(initialOptions);
        setTooltipOpen(false);
    };

    const handleFilter = (inputValue: string) => {
        if (inputValue.length === 0) {
            setOptions(initialOptions);
            setTooltipOpen(false);
            return;
        }

        const filteredOptions = initialOptions.filter(({ label }) =>
            label.toLowerCase().includes(inputValue.toLowerCase()),
        );

        setOptions(filteredOptions);
        setTooltipOpen(filteredOptions.length === 0);
    };

    const handleSelect = (value?: ISuggestFieldOption) => {
        setValue(value);
    };

    return {
        value,
        setValue,
        options,
        tooltipOpen,
        onFilter: handleFilter,
        onSelect: handleSelect,
        inputProps: {
            onFocus: handleInputFocus,
        },
    };
};

export const Playground: Story = {
    name: "Playground",
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
    parameters: {
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
    render: (args) => {
        const { value, options, tooltipOpen, onFilter, onSelect, inputProps } = useSuggestFieldLogic();

        return (
            <SuggestField
                value={value}
                options={options}
                tooltipOpen={tooltipOpen}
                onFilter={onFilter}
                onSelect={onSelect}
                inputProps={inputProps}
                {...args}
            />
        );
    },
};

export const Default: Story = {
    parameters: {
        controls: {
            disable: true,
        },
    },
    render: () => {
        const { value, options, tooltipOpen, onFilter, onSelect, inputProps } = useSuggestFieldLogic();

        return (
            <SuggestField
                value={value}
                options={options}
                label="Label"
                placeholder="Type to proceed"
                tooltipHint="No matches found."
                tooltipOpen={tooltipOpen}
                onFilter={onFilter}
                onSelect={onSelect}
                inputProps={inputProps}
            />
        );
    },
};

const SuggestFieldExample = ({
    size,
    status,
    loading,
}: {
    size?: EComponentSize;
    status?: EFormFieldStatus;
    loading?: boolean;
}) => {
    const { value, options, tooltipOpen, onFilter, onSelect, inputProps } = useSuggestFieldLogic();

    return (
        <SuggestField
            value={value}
            options={options}
            size={size}
            status={status}
            label="Label"
            placeholder="Type to proceed"
            tooltipHint="No matches found."
            tooltipOpen={tooltipOpen}
            loading={loading}
            onFilter={onFilter}
            onSelect={onSelect}
            inputProps={inputProps}
        />
    );
};

export const Sizes: Story = {
    parameters: {
        docs: { description: { story: "Размеры" } },
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <React.Fragment>
                {sizes.map((size) => (
                    <SuggestFieldExample key={size} size={size} />
                ))}
            </React.Fragment>
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
            <React.Fragment>
                {statuses.map((status) => (
                    <SuggestFieldExample key={status} status={status} />
                ))}
            </React.Fragment>
        );
    },
};

export const Loading: Story = {
    parameters: {
        docs: { description: { story: "Состояние загрузки." } },
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <React.Fragment>
                {sizes.map((size) => (
                    <SuggestFieldExample key={size} size={size} loading={true} />
                ))}
            </React.Fragment>
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
        const { value, setValue, options, tooltipOpen, onFilter, onSelect, inputProps } = useSuggestFieldLogic(
            basicOptions[0],
        );

        return (
            <SuggestField
                size={EComponentSize.LG}
                value={value}
                options={options}
                label="Label"
                placeholder="Type to proceed"
                tooltipHint="No matches found."
                tooltipOpen={tooltipOpen}
                onFilter={onFilter}
                onSelect={onSelect}
                onClear={() => setValue(undefined)}
                inputProps={inputProps}
            />
        );
    },
};

const fruitToTupleMap: Record<string, [string, string]> = {
    "Hot Pepper": ["🌶️", "Berries"],
    Corn: ["🌽", "Dry Fruits"],
    Tomato: ["🍅", "Berries"],
    Eggplant: ["🍆", "Berries"],
    Grapes: ["🍇", "Berries"],
    Melon: ["🍈", "Pepos"],
    Watermelon: ["🍉", "Pepos"],
    Tangerine: ["🍊", "Hesperidia"],
    Lemon: ["🍋", "Hesperidia"],
    Banana: ["🍌", "Berries"],
    Pineapple: ["🍍", "Multiple Fruits"],
    "Red Apple": ["🍎", "Pomes"],
    "Green Apple": ["🍏", "Pomes"],
    Pear: ["🍐", "Pomes"],
    Peach: ["🍑", "Drupes"],
    Cherries: ["🍒", "Drupes"],
    Strawberry: ["🍓", "Aggregate Fruits"],
    Avocado: ["🥑", "Berries"],
    Cucumber: ["🥒", "Pepos"],
    Kiwi: ["🥝", "Berries"],
    Coconut: ["🥥", "Drupes"],
    Mango: ["🥭", "Drupes"],
    Blueberries: ["🫐", "Berries"],
    "Bell Pepper": ["🫑", "Berries"],
    Olive: ["🫒", "Drupes"],
    "Pea Pod": ["🫛", "Dry Fruits"],
};

export const WithCustomOptions: Story = {
    name: "With custom options",
    parameters: {
        docs: { description: { story: "С кастомным наполнением опции." } },
        controls: { disable: true },
    },
    render: () => {
        const customInitialOptions: ISuggestFieldOption[] = basicOptions.map((option) => ({
            ...option,
            content: (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{fruitToTupleMap[option.label][0]}</span>
                    <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                        {option.label}
                    </Text>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY} style={{ marginLeft: "auto" }}>
                        {fruitToTupleMap[option.label][1]}
                    </Text>
                </div>
            ),
        }));

        const { value, options, tooltipOpen, onFilter, onSelect, inputProps } = useSuggestFieldLogic(
            undefined,
            customInitialOptions,
        );

        return (
            <SuggestField
                size={EComponentSize.LG}
                value={value}
                options={options}
                label="Label"
                placeholder="Type to proceed"
                tooltipHint="No matches found."
                tooltipOpen={tooltipOpen}
                onFilter={onFilter}
                onSelect={onSelect}
                inputProps={inputProps}
            />
        );
    },
};

export const Example: Story = {
    parameters: {
        docs: { description: { story: "В сочетании с другими компонентами." } },
        controls: { disable: true },
    },
    render: () => {
        const { value, setValue, options, tooltipOpen, onFilter, onSelect, inputProps } = useSuggestFieldLogic();

        return (
            <div style={{ maxWidth: "304px" }}>
                <SuggestField
                    size={EComponentSize.LG}
                    value={value}
                    options={options}
                    label="Label"
                    placeholder="Type to proceed"
                    tooltipHint="No matches found."
                    tooltipOpen={tooltipOpen}
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
                    onFilter={onFilter}
                    onSelect={onSelect}
                    onClear={() => setValue(undefined)}
                    inputProps={inputProps}
                />
            </div>
        );
    },
};
