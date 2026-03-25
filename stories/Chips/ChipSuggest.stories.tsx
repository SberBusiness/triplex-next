import React, { useState, useRef, useLayoutEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ChipSuggest } from "../../src/components/Chip/ChipSuggest/ChipSuggest";
import { ISuggestFieldOption } from "../../src/components/SuggestField/types";
import { EComponentSize } from "../../src/enums";
import { Title, Description, Controls, Stories, Primary, Heading, ArgTypes } from "@storybook/addon-docs/blocks";

const meta = {
    title: "Components/Chips/ChipSuggest",
    component: ChipSuggest,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент выбора одного значения из списка с возможностью фильтрации. Выбранное значение отображается в виде компонента Chip.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSuggest} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента.",
            table: {
                type: {
                    summary: Object.values(EComponentSize).join(" | "),
                },
                defaultValue: { summary: EComponentSize.LG },
            },
        },
        label: {
            control: { type: "text" },
            description: "Текст лейбла, который отображается над полем ввода.",
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, отображаемый вместо выбранного значения.",
        },
        placeholder: {
            control: { type: "text" },
        },
        noOptionsText: {
            control: { type: "text" },
            description: "Текст, отображаемый при отсутствии опций.",
        },
        loading: {
            control: { type: "boolean" },
            description: "Флаг состояния загрузки.",
        },
        clearInputOnFocus: {
            control: { type: "boolean" },
            description: "Определяет, нужно ли очищать поле ввода при получении фокуса.",
        },
    },
} satisfies Meta<typeof ChipSuggest>;

export default meta;

export const Playground: StoryObj<typeof ChipSuggest> = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.LG,
        label: "Suggest label",
        displayedValue: undefined,
        placeholder: "Type to proceed",
        noOptionsText: "No matches found.",
        loading: false,
        clearInputOnFocus: false,
        targetProps: { disabled: false },
    },
    parameters: {
        controls: {
            include: [
                "size",
                "label",
                "displayedValue",
                "placeholder",
                "noOptionsText",
                "loading",
                "clearInputOnFocus",
            ],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: (args) => {
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

        const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
            id: `suggest-option-${index}`,
            label: fruit,
        }));

        const [value, setValue] = useState<ISuggestFieldOption>();
        const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
        const [tooltipOpen, setTooltipOpen] = useState(false);
        const initialOptionsRef = useRef<ISuggestFieldOption[]>(initialOptions);

        const handleDropdownOpen = () => {
            setOptions(initialOptionsRef.current);
            setTooltipOpen(false);
        };

        const handleFilter = (inputValue: string) => {
            if (inputValue.length === 0) {
                setOptions(initialOptionsRef.current);
                setTooltipOpen(false);
                return;
            }

            const filteredOptions = initialOptionsRef.current.filter(({ label }) =>
                label.toLowerCase().includes(inputValue.toLowerCase()),
            );

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0);
        };

        return (
            <ChipSuggest
                {...args}
                value={value}
                options={options}
                tooltipOpen={tooltipOpen}
                onSelect={setValue}
                onFilter={handleFilter}
                targetProps={{ clearSelected: () => setValue(undefined), ...args.targetProps }}
                dropdownProps={{ onOpen: handleDropdownOpen }}
            />
        );
    },
};

export const Default: StoryObj<typeof ChipSuggest> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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

        const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
            id: `suggest-option-${index}`,
            label: fruit,
        }));

        const [value, setValue] = useState<ISuggestFieldOption>();
        const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
        const [tooltipOpen, setTooltipOpen] = useState(false);
        const initialOptionsRef = useRef<ISuggestFieldOption[]>(initialOptions);

        const handleDropdownOpen = () => {
            setOptions(initialOptionsRef.current);
            setTooltipOpen(false);
        };

        const handleFilter = (inputValue: string) => {
            if (inputValue.length === 0) {
                setOptions(initialOptionsRef.current);
                setTooltipOpen(false);
                return;
            }

            const filteredOptions = initialOptionsRef.current.filter(({ label }) =>
                label.toLowerCase().includes(inputValue.toLowerCase()),
            );

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0);
        };

        return (
            <ChipSuggest
                value={value}
                options={options}
                tooltipOpen={tooltipOpen}
                onSelect={setValue}
                onFilter={handleFilter}
                targetProps={{ clearSelected: () => setValue(undefined) }}
                dropdownProps={{ onOpen: handleDropdownOpen }}
                label="Suggest label"
                placeholder="Type to proceed"
                noOptionsText="No matches found."
                size={EComponentSize.MD}
            />
        );
    },
};

export const Sizes: StoryObj<typeof ChipSuggest> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

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

        const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
            id: `suggest-option-${index}`,
            label: fruit,
        }));

        const [valueSM, setValueSM] = useState<ISuggestFieldOption>();
        const [valueMD, setValueMD] = useState<ISuggestFieldOption>();
        const [valueLG, setValueLG] = useState<ISuggestFieldOption>();

        const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
        const [tooltipOpen, setTooltipOpen] = useState(false);
        const initialOptionsRef = useRef<ISuggestFieldOption[]>(initialOptions);

        const handleDropdownOpen = () => {
            setOptions(initialOptionsRef.current);
            setTooltipOpen(false);
        };

        const handleFilter = (inputValue: string) => {
            if (inputValue.length === 0) {
                setOptions(initialOptionsRef.current);
                setTooltipOpen(false);
                return;
            }

            const filteredOptions = initialOptionsRef.current.filter(({ label }) =>
                label.toLowerCase().includes(inputValue.toLowerCase()),
            );

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                {sizes.map((size) => {
                    return (
                        <ChipSuggest
                            key={size}
                            size={size}
                            label={size.toUpperCase()}
                            placeholder="Type to proceed"
                            noOptionsText="No matches found."
                            value={
                                size === EComponentSize.SM ? valueSM : size === EComponentSize.MD ? valueMD : valueLG
                            }
                            options={options}
                            tooltipOpen={tooltipOpen}
                            onSelect={
                                size === EComponentSize.SM
                                    ? setValueSM
                                    : size === EComponentSize.MD
                                      ? setValueMD
                                      : setValueLG
                            }
                            onFilter={handleFilter}
                            targetProps={{
                                clearSelected: () =>
                                    size === EComponentSize.SM
                                        ? setValueSM(undefined)
                                        : size === EComponentSize.MD
                                          ? setValueMD(undefined)
                                          : setValueLG(undefined),
                            }}
                            dropdownProps={{ onOpen: handleDropdownOpen }}
                        />
                    );
                })}
            </div>
        );
    },
};

export const States: StoryObj<typeof ChipSuggest> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSuggest в состояниях selected, disabled.",
            },
        },
    },
    render: () => {
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

        const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
            id: `suggest-option-${index}`,
            label: fruit,
        }));

        const [valueSelected, setValueSelected] = useState<ISuggestFieldOption>();
        const [valueDisabled, setValueDisabled] = useState<ISuggestFieldOption>();
        const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
        const [tooltipOpen, setTooltipOpen] = useState(false);
        const initialOptionsRef = useRef<ISuggestFieldOption[]>(initialOptions);

        const handleDropdownOpen = () => {
            setOptions(initialOptionsRef.current);
            setTooltipOpen(false);
        };

        const handleFilter = (inputValue: string) => {
            if (inputValue.length === 0) {
                setOptions(initialOptionsRef.current);
                setTooltipOpen(false);
                return;
            }

            const filteredOptions = initialOptionsRef.current.filter(({ label }) =>
                label.toLowerCase().includes(inputValue.toLowerCase()),
            );

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                {[
                    { label: "Suggest label", targetProps: { selected: true } },
                    { label: "Suggest label", targetProps: { disabled: true } },
                ].map((state) => {
                    return (
                        <ChipSuggest
                            key={state.label}
                            label={state.targetProps.selected ? "Selected" : "Disabled"}
                            size={EComponentSize.MD}
                            placeholder="Type to proceed"
                            noOptionsText="No matches found."
                            value={state.targetProps.selected ? valueSelected : valueDisabled}
                            options={options}
                            tooltipOpen={tooltipOpen}
                            onSelect={state.targetProps.selected ? setValueSelected : setValueDisabled}
                            onFilter={handleFilter}
                            targetProps={{
                                clearSelected: () =>
                                    state.targetProps.selected
                                        ? setValueSelected(undefined)
                                        : setValueDisabled(undefined),
                                ...state.targetProps,
                            }}
                            dropdownProps={{ onOpen: handleDropdownOpen }}
                        />
                    );
                })}
            </div>
        );
    },
};

export const VisualTests: StoryObj<typeof ChipSuggest> = {
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

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

        const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
            id: `suggest-option-${index}`,
            label: fruit,
        }));

        const [valueSM, setValueSM] = useState<ISuggestFieldOption>();
        const [valueMD, setValueMD] = useState<ISuggestFieldOption>();
        const [valueLG, setValueLG] = useState<ISuggestFieldOption>();

        const [options, setOptions] = useState<ISuggestFieldOption[]>(initialOptions);
        const [tooltipOpen, setTooltipOpen] = useState(false);
        const initialOptionsRef = useRef<ISuggestFieldOption[]>(initialOptions);
        const rootRef = useRef<HTMLDivElement>(null);

        useLayoutEffect(() => {
            const targets = rootRef.current?.querySelectorAll<HTMLElement>('[role="button"]');
            targets?.forEach((el) => el.click());
        }, []);

        const handleFilter = (inputValue: string) => {
            if (inputValue.length === 0) {
                setOptions(initialOptionsRef.current);
                setTooltipOpen(false);
                return;
            }

            const filteredOptions = initialOptionsRef.current.filter(({ label }) =>
                label.toLowerCase().includes(inputValue.toLowerCase()),
            );

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0);
        };

        return (
            <div
                ref={rootRef}
                style={{ display: "flex", maxWidth: 900, alignItems: "flex-start", justifyContent: "space-between" }}
            >
                {sizes.map((size) => {
                    return (
                        <ChipSuggest
                            key={size}
                            size={size}
                            label={size.toUpperCase()}
                            placeholder="Type to proceed"
                            noOptionsText="No matches found."
                            value={
                                size === EComponentSize.SM ? valueSM : size === EComponentSize.MD ? valueMD : valueLG
                            }
                            options={options}
                            tooltipOpen={tooltipOpen}
                            onSelect={
                                size === EComponentSize.SM
                                    ? setValueSM
                                    : size === EComponentSize.MD
                                      ? setValueMD
                                      : setValueLG
                            }
                            onFilter={handleFilter}
                            targetProps={{
                                clearSelected: () =>
                                    size === EComponentSize.SM
                                        ? setValueSM(undefined)
                                        : size === EComponentSize.MD
                                          ? setValueMD(undefined)
                                          : setValueLG(undefined),
                            }}
                        />
                    );
                })}
            </div>
        );
    },
};
