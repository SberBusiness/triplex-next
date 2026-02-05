import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
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
                <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
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
                <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
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
        const [singleValue, setSingleValue] = useState("segment_3");
        const [multipleValue, setMultipleValue] = useState(["segment_3"]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <div style={{ marginBottom: "12px", fontWeight: "bold" }}>Single</div>
                    <SegmentedControl
                        type={ESegmentedControlType.SINGLE}
                        theme={ESegmentedControlTheme.GENERAL_1}
                        size={ESegmentedControlSize.LG}
                        value={singleValue}
                        onSelect={setSingleValue}
                    >
                        <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
                    </SegmentedControl>
                </div>

                <div>
                    <div style={{ marginBottom: "12px", fontWeight: "bold" }}>Multiple</div>
                    <SegmentedControl
                        type={ESegmentedControlType.MULTIPLE}
                        value={multipleValue}
                        onSelect={setMultipleValue}
                        theme={ESegmentedControlTheme.GENERAL_1}
                        size={ESegmentedControlSize.LG}
                    >
                        <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                        <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
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
        const themes = Object.values(ESegmentedControlTheme);
        const [values, setValues] = useState(() =>
            themes.reduce(
                (acc, theme) => {
                    acc[theme] = "segment_3";
                    return acc;
                },
                {} as Record<string, string>,
            ),
        );

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {themes.map((theme) => (
                    <div key={theme}>
                        <h4>{theme}</h4>
                        <SegmentedControl
                            type={ESegmentedControlType.SINGLE}
                            theme={theme}
                            size={ESegmentedControlSize.LG}
                            value={values[theme]}
                            onSelect={(value: string) => setValues((prevValues) => ({ ...prevValues, [theme]: value }))}
                        >
                            <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
                        </SegmentedControl>
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
        const sizes = Object.values(ESegmentedControlSize);
        const [values, setValues] = useState(() =>
            sizes.reduce(
                (acc, theme) => {
                    acc[theme] = "segment_3";
                    return acc;
                },
                {} as Record<string, string>,
            ),
        );

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {sizes.map((size) => (
                    <div key={size}>
                        <h4>{size.toUpperCase()}</h4>
                        <SegmentedControl
                            type={ESegmentedControlType.SINGLE}
                            theme={ESegmentedControlTheme.GENERAL_1}
                            size={size}
                            value={values[size]}
                            onSelect={(value: string) => setValues((prevValues) => ({ ...prevValues, [size]: value }))}
                        >
                            <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                            <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
                        </SegmentedControl>
                    </div>
                ))}
            </div>
        );
    },
};

export const Disabled: Story = {
    parameters: {
        docs: { description: { story: "Демонстрация заблокированного состояния компонента." } },
        controls: { disable: true },
    },
    render: () => {
        const [singleValue, setSingleValue] = useState("segment_3");

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <SegmentedControl
                    type={ESegmentedControlType.SINGLE}
                    value={singleValue}
                    onSelect={setSingleValue}
                    theme={ESegmentedControlTheme.GENERAL_1}
                    size={ESegmentedControlSize.LG}
                    disabled
                >
                    <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
                </SegmentedControl>
            </div>
        );
    },
};

export const Example: Story = {
    parameters: {
        docs: { description: { story: "В сочетании с иконками." } },
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("segment_2");

        return (
            <div style={{ width: "144px" }}>
                <SegmentedControl
                    value={value}
                    onSelect={setValue}
                    type={ESegmentedControlType.SINGLE}
                    theme={ESegmentedControlTheme.GENERAL_1}
                    size={ESegmentedControlSize.LG}
                >
                    <SegmentedControl.Segment value="segment_1" aria-label="segment 1">
                        <DefaulticonStrokePrdIcon20
                            paletteIndex={value === "segment_1" ? 7 : 5}
                            style={{ display: "block" }}
                        />
                    </SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_2" aria-label="segment 2">
                        <DefaulticonStrokePrdIcon20
                            paletteIndex={value === "segment_2" ? 7 : 5}
                            style={{ display: "block" }}
                        />
                    </SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_3" aria-label="segment 3">
                        <DefaulticonStrokePrdIcon20
                            paletteIndex={value === "segment_3" ? 7 : 5}
                            style={{ display: "block" }}
                        />
                    </SegmentedControl.Segment>
                </SegmentedControl>
            </div>
        );
    },
};
