import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipSelect, IChipSelectProps } from "../../src/components/Chip/ChipSelect";
import { ISelectFieldOption } from "../../src/components/SelectField/SelectField";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Chips/ChipSelect",
    component: ChipSelect,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент ChipSelect позволяет выбрать одно значение из списка опций. Выбранное значение отображается в виде Chip компонента.

## Основные возможности:
- Выбор одного значения из списка опций
- Отображение выбранного значения в виде Chip
- Возможность очистки выбранного значения через кнопку очистки
- Поддержка кастомного отображаемого значения (displayedValue)
- Поддержка различных размеров (SM, MD, LG)
- Состояние disabled
- Автоматическое открытие/закрытие выпадающего списка

## Использование:
Компонент принимает массив опций и обрабатывает выбор через onChange. При выборе опции она отображается в Chip, а при клике на кнопку очистки вызывается clearSelected.
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
};

// Демонстрационные опции
const demoOptions: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" } as ISelectFieldOption,
    { id: "2", value: "option2", label: "Вторая опция" } as ISelectFieldOption,
    { id: "3", value: "option3", label: "Третья опция" } as ISelectFieldOption,
    { id: "4", value: "option4", label: "Четвертая опция" } as ISelectFieldOption,
    { id: "5", value: "option5", label: "Пятая опция" } as ISelectFieldOption,
    { id: "6", value: "option6", label: "Шестая опция" } as ISelectFieldOption,
];

interface IChipSelectPlaygroundProps
    extends Omit<IChipSelectProps, "onChange" | "clearSelected" | "value" | "options"> {
    selectedValueId?: string;
}

export const Playground: StoryObj<IChipSelectPlaygroundProps> = {
    render: function Render(args) {
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
        className: {
            control: { type: "text" },
            description: "Дополнительный CSS класс",
            table: {
                type: { summary: "string" },
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
        label: "Выберите опцию",
        displayedValue: undefined,
        size: EComponentSize.MD,
        disabled: false,
        className: undefined,
        selectedValueId: "",
    },
    parameters: {
        controls: {
            include: ["label", "displayedValue", "size", "disabled", "selectedValueId"],
        },
    },
};

export const Default: StoryObj = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selected, setSelected] = useState<ISelectFieldOption | undefined>();

        return (
            <ChipSelect
                label="Выберите опцию"
                options={demoOptions}
                value={selected}
                onChange={setSelected}
                clearSelected={() => setSelected(undefined)}
            />
        );
    },
};

export const Sizes: StoryObj = {
    name: "Sizes",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedSM, setSelectedSM] = useState<ISelectFieldOption | undefined>();
        const [selectedMD, setSelectedMD] = useState<ISelectFieldOption | undefined>();
        const [selectedLG, setSelectedLG] = useState<ISelectFieldOption | undefined>();

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "20px" }}>
                <div>
                    <h3 style={{ marginBottom: "12px" }}>Small (SM)</h3>
                    <ChipSelect
                        label="Выберите опцию"
                        options={demoOptions}
                        value={selectedSM}
                        onChange={setSelectedSM}
                        clearSelected={() => setSelectedSM(undefined)}
                        size={EComponentSize.SM}
                    />
                </div>
                <div>
                    <h3 style={{ marginBottom: "12px" }}>Medium (MD)</h3>
                    <ChipSelect
                        label="Выберите опцию"
                        options={demoOptions}
                        value={selectedMD}
                        onChange={setSelectedMD}
                        clearSelected={() => setSelectedMD(undefined)}
                        size={EComponentSize.MD}
                    />
                </div>
                <div>
                    <h3 style={{ marginBottom: "12px" }}>Large (LG)</h3>
                    <ChipSelect
                        label="Выберите опцию"
                        options={demoOptions}
                        value={selectedLG}
                        onChange={setSelectedLG}
                        clearSelected={() => setSelectedLG(undefined)}
                        size={EComponentSize.LG}
                    />
                </div>
            </div>
        );
    },
};

export const States: StoryObj = {
    name: "States",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedDefault, setSelectedDefault] = useState<ISelectFieldOption | undefined>();
        const [selectedWithValue, setSelectedWithValue] = useState<ISelectFieldOption | undefined>(demoOptions[0]);
        const [selectedDisabled, setSelectedDisabled] = useState<ISelectFieldOption | undefined>(demoOptions[1]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "20px" }}>
                <div>
                    <h3 style={{ marginBottom: "12px" }}>Без выбранного значения</h3>
                    <ChipSelect
                        label="Выберите опцию"
                        options={demoOptions}
                        value={selectedDefault}
                        onChange={setSelectedDefault}
                        clearSelected={() => setSelectedDefault(undefined)}
                        size={EComponentSize.MD}
                    />
                </div>
                <div>
                    <h3 style={{ marginBottom: "12px" }}>С выбранным значением</h3>
                    <ChipSelect
                        label="Выберите опцию"
                        options={demoOptions}
                        value={selectedWithValue}
                        onChange={setSelectedWithValue}
                        clearSelected={() => setSelectedWithValue(undefined)}
                        size={EComponentSize.MD}
                    />
                </div>
                <div>
                    <h3 style={{ marginBottom: "12px" }}>Отключенное состояние</h3>
                    <ChipSelect
                        label="Выберите опцию"
                        options={demoOptions}
                        value={selectedDisabled}
                        onChange={setSelectedDisabled}
                        clearSelected={() => setSelectedDisabled(undefined)}
                        disabled
                        size={EComponentSize.MD}
                    />
                </div>
            </div>
        );
    },
};

export const WithDisplayedValue: StoryObj = {
    name: "With Displayed Value",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selected, setSelected] = useState<ISelectFieldOption | undefined>(demoOptions[0]);

        return (
            <div style={{ padding: "20px" }}>
                <h3 style={{ marginBottom: "12px" }}>С кастомным отображаемым значением</h3>
                <ChipSelect
                    label="Выберите услугу"
                    options={demoOptions}
                    value={selected}
                    onChange={setSelected}
                    clearSelected={() => setSelected(undefined)}
                    displayedValue={
                        selected
                            ? `⭐ ${String((selected as ISelectFieldOption & { label: React.ReactNode }).label)}`
                            : undefined
                    }
                    size={EComponentSize.MD}
                />
                <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                    <strong>Выбрано:</strong>{" "}
                    {selected ? String((selected as ISelectFieldOption & { label: React.ReactNode }).label) : ""}{" "}
                    (value: {selected ? (selected as ISelectFieldOption & { value: string }).value : ""})
                    <br />
                    <strong>Отображается:</strong> ⭐{" "}
                    {selected ? String((selected as ISelectFieldOption & { label: React.ReactNode }).label) : ""}
                </div>
            </div>
        );
    },
};
