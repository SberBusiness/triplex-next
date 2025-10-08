import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
    SegmentedControl,
    ESegmentedControlTheme,
    ESegmentedControlType,
    ESegmentedControlSize,
} from "../src/components/SegmentedControl";

export default {
    title: "Components/SegmentedControl",
    component: SegmentedControl,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlType),
            description: "Тип выбора элементов",
            table: {
                type: {
                    summary: Object.values(ESegmentedControlType).join(" | "),
                },
            },
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlTheme),
            description: "Визуальный стиль сегментов",
            table: {
                type: {
                    summary: Object.values(ESegmentedControlTheme).join(" | "),
                },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlSize),
            description: "Размер сегментов",
            table: {
                type: {
                    summary: Object.values(ESegmentedControlSize).join(" | "),
                },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Неактивное состояние",
            table: {
                type: { summary: "boolean" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
Компонент SegmentedControl позволяет пользователю выбирать один или несколько вариантов из набора опций.

## Особенности:
- Поддерживает два типа выбора: \`SINGLE\` (одиночный) и \`MULTIPLE\` (множественный);
- Имеет четыре визуальных стиля: \`GENERAL_1\`/\`GENERAL_2\` и \`SECONDARY_1\`/\`SECONDARY_2\`;
- Имеет три размера: \`SM\`, \`MD\` и \`LG\`;
- Поддерживает состояние \`disabled\`.

## Использование

### Одиночный выбор
Для одиночного выбора используйте тип \`ESegmentedControlType.SINGLE\`. Значение должно быть строкой.

### Множественный выбор
Для множественного выбора используйте тип \`ESegmentedControlType.MULTIPLE\`. Значение должно быть массивом строк.

## Примеры использования
`,
            },
        },
    },
};

export const Playground: StoryObj<typeof SegmentedControl> = {
    name: "Playground",
    args: {
        type: ESegmentedControlType.SINGLE,
        theme: ESegmentedControlTheme.GENERAL_1,
        size: ESegmentedControlSize.MD,
        disabled: false,
    },
    parameters: {
        docs: {
            description: {
                story: `
Интерактивная площадка для экспериментов с компонентом SegmentedControl. Используйте панель Controls для изменения параметров компонента.

\`\`\`tsx
const [type, setType] = useState<ESegmentedControlType>(ESegmentedControlType.SINGLE);
const [singleValue, setSingleValue] = useState("segment_3");
const [multipleValue, setMultipleValue] = useState(["segment_3"]);

const value = type === ESegmentedControlType.SINGLE ? singleValue : multipleValue;
const handleSelect = type === ESegmentedControlType.SINGLE ? setSingleValue : setMultipleValue;

return (
    <SegmentedControl
        type={type}
        theme={ESegmentedControlTheme.GENERAL_1}
        size={ESegmentedControlSize.MD}
        value={value}
        onSelect={handleSelect}
    >
        <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
        <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
        <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
        <SegmentedControl.Segment value="segment_4">Segment 4</SegmentedControl.Segment>
        <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
    </SegmentedControl>
);
\`\`\`
                `,
            },
        },
    },
    render: (args) => {
        const [singleValue, setSingleValue] = useState("segment_3");
        const [multipleValue, setMultipleValue] = useState(["segment_3"]);

        const value = args.type === ESegmentedControlType.SINGLE ? singleValue : multipleValue;
        const handleSelect = args.type === ESegmentedControlType.SINGLE ? setSingleValue : setMultipleValue;

        return (
            <SegmentedControl {...args} value={value} onSelect={handleSelect}>
                <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_4">Segment 4</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
            </SegmentedControl>
        );
    },
};

export const Types: StoryObj = {
    name: "Types",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: `
Сравнение обоих типов выбора - одиночного и множественного.

## Одиночный выбор (Single)
Пользователь может выбрать только один сегмент. При выборе нового сегмента предыдущий снимается.

## Множественный выбор (Multiple)
Пользователь может выбрать несколько сегментов. Каждый сегмент переключается независимо.

\`\`\`tsx
// Single selection
const [singleValue, setSingleValue] = useState("segment_2");

// Multiple selection
const [multipleValue, setMultipleValue] = useState(["segment_2", "segment_3"]);

return (
    <>
        <SegmentedControl
            type={ESegmentedControlType.SINGLE}
            value={singleValue}
            onSelect={setSingleValue}
        >
            <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
        </SegmentedControl>

        <SegmentedControl
            type={ESegmentedControlType.MULTIPLE}
            value={multipleValue}
            onSelect={setMultipleValue}
        >
            <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
        </SegmentedControl>
    </>
);
\`\`\`
                `,
            },
        },
    },
    render: () => {
        const [singleValue, setSingleValue] = useState("segment_2");
        const [multipleValue, setMultipleValue] = useState(["segment_2", "segment_4"]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <div style={{ marginBottom: "12px", fontWeight: "bold" }}>Single Selection (одиночный выбор)</div>
                    <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
                        Выбрано: <strong>{singleValue}</strong>
                    </div>
                    <SegmentedControl
                        type={ESegmentedControlType.SINGLE}
                        theme={ESegmentedControlTheme.GENERAL_1}
                        size={ESegmentedControlSize.MD}
                        value={singleValue}
                        onSelect={setSingleValue}
                    >
                        <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_4">Segment 4</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
                    </SegmentedControl>
                </div>

                <div>
                    <div style={{ marginBottom: "12px", fontWeight: "bold" }}>
                        Multiple Selection (множественный выбор)
                    </div>
                    <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
                        Выбрано: <strong>{JSON.stringify(multipleValue)}</strong>
                    </div>
                    <SegmentedControl
                        type={ESegmentedControlType.MULTIPLE}
                        value={multipleValue}
                        onSelect={setMultipleValue}
                        theme={ESegmentedControlTheme.GENERAL_1}
                        size={ESegmentedControlSize.MD}
                    >
                        <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_4">Segment 4</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
                    </SegmentedControl>
                </div>
            </div>
        );
    },
};

export const Themes: StoryObj = {
    name: "Themes",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Демонстрация всех доступных тем компонента.",
            },
        },
    },
    render: () => {
        const [singleValue, setSingleValue] = useState("segment_2");
        const [multipleValue, setMultipleValue] = useState(["segment_1", "segment_3"]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {Object.values(ESegmentedControlTheme).map((theme) => (
                    <div key={theme}>
                        <h4>{theme}</h4>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                            <div>
                                <div style={{ marginBottom: "8px", fontSize: "14px" }}>Single</div>
                                <SegmentedControl
                                    type={ESegmentedControlType.SINGLE}
                                    value={singleValue}
                                    onSelect={setSingleValue}
                                    theme={theme}
                                    size={ESegmentedControlSize.MD}
                                >
                                    <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                                    <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                                    <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                                </SegmentedControl>
                            </div>

                            <div>
                                <div style={{ marginBottom: "8px", fontSize: "14px" }}>Multiple</div>
                                <SegmentedControl
                                    type={ESegmentedControlType.MULTIPLE}
                                    value={multipleValue}
                                    onSelect={setMultipleValue}
                                    theme={theme}
                                    size={ESegmentedControlSize.MD}
                                >
                                    <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                                    <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                                    <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                                </SegmentedControl>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    },
};

export const Sizes: StoryObj = {
    name: "Sizes",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Демонстрация всех доступных размеров компонента.",
            },
        },
    },
    render: () => {
        const [value, setValue] = useState("segment_2");

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {Object.values(ESegmentedControlSize).map((size) => (
                    <div key={size}>
                        <h4>{size.toUpperCase()}</h4>
                        <SegmentedControl
                            type={ESegmentedControlType.SINGLE}
                            value={value}
                            onSelect={setValue}
                            theme={ESegmentedControlTheme.GENERAL_1}
                            size={size}
                        >
                            <SegmentedControl.Segment value="segment_1">Small segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_2">Medium segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_3">Large segment</SegmentedControl.Segment>
                        </SegmentedControl>
                    </div>
                ))}
            </div>
        );
    },
};

export const Disabled: StoryObj = {
    name: "Disabled",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Пример заблокированного состояния компонента.",
            },
        },
    },
    render: () => {
        const [singleValue, setSingleValue] = useState("segment_3");
        const [multipleValue, setMultipleValue] = useState(["segment_3"]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3>Single Selection</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <h4>Полностью заблокированный</h4>
                            <SegmentedControl
                                type={ESegmentedControlType.SINGLE}
                                value={singleValue}
                                onSelect={setSingleValue}
                                theme={ESegmentedControlTheme.GENERAL_1}
                                size={ESegmentedControlSize.MD}
                                disabled
                            >
                                <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_4">Segment 4</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
                            </SegmentedControl>
                        </div>

                        <div>
                            <h4>Частично заблокированный</h4>
                            <SegmentedControl
                                type={ESegmentedControlType.SINGLE}
                                value={singleValue}
                                onSelect={setSingleValue}
                                theme={ESegmentedControlTheme.GENERAL_1}
                                size={ESegmentedControlSize.MD}
                            >
                                <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_2" disabled>
                                    Segment 2
                                </SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_4" disabled>
                                    Segment 4
                                </SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
                            </SegmentedControl>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Multiple Selection</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <h4>Полностью заблокированный</h4>
                            <SegmentedControl
                                type={ESegmentedControlType.MULTIPLE}
                                value={multipleValue}
                                onSelect={setMultipleValue}
                                theme={ESegmentedControlTheme.GENERAL_1}
                                size={ESegmentedControlSize.MD}
                                disabled
                            >
                                <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_4">Segment 4</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
                            </SegmentedControl>
                        </div>

                        <div>
                            <h4>Частично заблокированный</h4>
                            <SegmentedControl
                                type={ESegmentedControlType.MULTIPLE}
                                value={multipleValue}
                                onSelect={setMultipleValue}
                                theme={ESegmentedControlTheme.GENERAL_1}
                                size={ESegmentedControlSize.MD}
                            >
                                <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_2" disabled>
                                    Segment 2
                                </SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_4" disabled>
                                    Segment 4
                                </SegmentedControl.Segment>
                                <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
                            </SegmentedControl>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
