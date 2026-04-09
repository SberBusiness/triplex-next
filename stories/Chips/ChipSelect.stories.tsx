import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ChipSelect, IChipSelectProps } from "../../src/components/Chip/";
import { ISelectFieldOption } from "../../src/components/SelectField/SelectField";
import { Title, Description, Controls, Stories, Heading, ArgTypes, Primary } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    WithCustomDisplayedValueExample,
    WithCustomDisplayedValueExampleSource,
} from "./examples/ChipSelect";

const meta = {
    title: "Components/Chips/ChipSelect",
    component: ChipSelect,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент ChipSelect позволяет выбрать одно значение из списка опций. Выбранное значение отображается в виде компонента Chip.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSelect} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipSelect>;

export default meta;

const demoOptions: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" },
    { id: "2", value: "option2", label: "Вторая опция" },
    { id: "3", value: "option3", label: "Третья опция" },
    { id: "4", value: "option4", label: "Четвертая опция" },
    { id: "5", value: "option5", label: "Пятая опция" },
    { id: "6", value: "option6", label: "Шестая опция" },
];

interface IChipSelectPlaygroundProps extends Omit<
    IChipSelectProps,
    "onChange" | "clearSelected" | "value" | "options"
> {
    selectedValueId?: string;
}

export const Playground: StoryObj<IChipSelectPlaygroundProps> = {
    tags: ["!autodocs"],
    render: (args) => {
        const [selectedOption, setSelectedOption] = useState<ISelectFieldOption | undefined>(
            args.selectedValueId
                ? (demoOptions.find(
                      (opt) => (opt as ISelectFieldOption & { id: string }).id === args.selectedValueId,
                  ) as ISelectFieldOption | undefined)
                : undefined,
        );

        const handleChange = (option: ISelectFieldOption) => {
            setSelectedOption(option);
        };

        const handleClear = () => {
            setSelectedOption(undefined);
        };

        return (
            <ChipSelect
                {...args}
                displayedValue={args.displayedValue || undefined}
                options={demoOptions}
                value={selectedOption}
                onChange={handleChange}
                clearSelected={handleClear}
            />
        );
    },
    argTypes: {
        label: {
            control: { type: "text" },
            description: "Название поля, отображаемое когда значение не выбрано",
            table: {
                type: { summary: "React.ReactNode" },
                defaultValue: { summary: "undefined" },
            },
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, отображаемый вместо выбранного значения",
            table: {
                type: { summary: "React.ReactNode" },
                defaultValue: { summary: "undefined" },
            },
        },
        size: {
            control: { type: "inline-radio" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Отключенное состояние",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        selectedValueId: {
            control: { type: "select" },
            options: ["", ...demoOptions.map((opt) => (opt as ISelectFieldOption & { id: string }).id)],
            description: "Предварительно выбранное значение (для демонстрации)",
            table: {
                type: { summary: "string" },
            },
        },
    },
    args: {
        label: "Select label",
        displayedValue: undefined,
        size: EComponentSize.MD,
        disabled: false,
        selectedValueId: "",
    },
    parameters: {
        controls: {
            include: ["label", "displayedValue", "size", "disabled", "selectedValueId"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};

export const Sizes: StoryObj = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesExampleSource, language: "tsx" } },
    },
};

export const States: StoryObj = {
    render: StatesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSelect в состояниях selected, disabled.",
            },
            source: { code: StatesExampleSource, language: "tsx" },
        },
    },
};

export const WithNotificationIcon: StoryObj = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSelect с опциями, у которых задан showNotificationIcon. Флаг передаётся напрямую в объект опции.",
            },
        },
    },
    render: () => {
        const options: ISelectFieldOption[] = [
            { id: "1", value: "option1", label: "Первая опция" },
            { id: "2", value: "option2", label: "Вторая опция", showNotificationIcon: true },
            { id: "3", value: "option3", label: "Третья опция" },
            { id: "4", value: "option4", label: "Четвертая опция" },
        ];

        const [selected, setSelected] = useState<ISelectFieldOption | undefined>();

        return (
            <ChipSelect
                size={EComponentSize.MD}
                label="Select label"
                options={options}
                value={selected}
                onChange={setSelected}
                clearSelected={() => setSelected(undefined)}
            />
        );
    },
};

export const WithCustomDisplayedValue: StoryObj = {
    render: WithCustomDisplayedValueExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSelect с переданным displayedValue.",
            },
            source: { code: WithCustomDisplayedValueExampleSource, language: "tsx" },
        },
    },
};
