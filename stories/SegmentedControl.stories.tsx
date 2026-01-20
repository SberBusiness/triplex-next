import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    SegmentedControl,
    ESegmentedControlTheme,
    ESegmentedControlType,
    ESegmentedControlSize,
} from "../src/components/SegmentedControl";
import { Title, Description, ArgTypes, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

const meta = {
    title: "Components/SegmentedControl",
    component: SegmentedControl,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Title>Props</Title>
                    <ArgTypes of={Basic} />
                    <Title>Playground</Title>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        controls: {
            include: ["type", "theme", "size", "disabled"],
        },
        docs: {
            description: { story: "Интерактивный пример." },
            canvas: { sourceState: "none" },
        },
    },
    tags: ["!autodocs"],
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlType),
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlTheme),
        },
        size: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlSize),
        },
        disabled: {
            control: { type: "boolean" },
        },
    },
    args: {
        type: ESegmentedControlType.SINGLE,
        theme: ESegmentedControlTheme.GENERAL_1,
        size: ESegmentedControlSize.LG,
        disabled: false,
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

export const Basic: Story = {
    parameters: {
        docs: { description: { story: "Базовый пример." } },
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("segment_3");

        return (
            <SegmentedControl
                type={ESegmentedControlType.SINGLE}
                theme={ESegmentedControlTheme.GENERAL_1}
                size={ESegmentedControlSize.LG}
                value={value}
                onSelect={setValue}
            >
                <SegmentedControl.Segment value="segment_1">Segment 1</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment 2</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment 3</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_4">Segment 4</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_5">Segment 5</SegmentedControl.Segment>
            </SegmentedControl>
        );
    },
};

export const Types: Story = {
    parameters: {
        docs: { description: { story: "Демонстрация всех типов компонента." } },
        controls: { disable: true },
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

export const Themes: Story = {
    parameters: {
        docs: { description: { story: "Демонстрация всех доступных тем компонента." } },
        controls: { disable: true },
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

export const Sizes: Story = {
    parameters: {
        docs: { description: { story: "Демонстрация всех доступных размеров компонента." } },
        controls: { disable: true },
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

export const Disabled: Story = {
    parameters: {
        docs: { description: { story: "Пример заблокированного состояния компонента." } },
        controls: { disable: true },
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
