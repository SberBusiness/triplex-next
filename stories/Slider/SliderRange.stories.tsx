import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ISliderRangeProps, SliderRange, TSliderRangeValues } from "../../src/components/SliderRange/SliderRange";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Slider/SliderRange",
    component: SliderRange,
    tags: ["autodocs"],
    parameters: {
        docs: {
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
} as const;

export const Playground: StoryObj<ISliderRangeProps> = {
    render: (args) => {
        const [values, setValues] = useState<TSliderRangeValues>(args.values ?? [35, 60]);

        const handleChange = (newValues: TSliderRangeValues) => {
            setValues(newValues);
            action("onChange")(newValues);
        };

        return (
            <div style={{ maxWidth: 750, padding: 30 }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange {...args} values={values} onChange={handleChange} />
            </div>
        );
    },
    args: {
        min: 0,
        max: 100,
        values: [35, 60],
        step: 1,
        disabled: false,
        reverse: false,
        size: EComponentSize.MD,
        draggableTrack: true,
        marks: [
            { value: 0, label: "0" },
            { value: 35, label: "35" },
            { value: 66, label: "66" },
            { value: 100, label: "100" },
        ],
    },
    argTypes: {
        min: {
            control: { type: "number" },
        },
        max: {
            control: { type: "number" },
        },
        values: {
            control: { type: "object" },
        },
        step: {
            control: { type: "number" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        reverse: {
            control: { type: "boolean" },
        },
        size: {
            control: { type: "select" },
            options: [EComponentSize.MD, EComponentSize.LG],
        },
        draggableTrack: {
            control: { type: "boolean" },
        },
        marks: {
            control: { type: "object" },
        },
    },
    parameters: {
        controls: {
            include: ["min", "max", "values", "step", "disabled", "reverse", "size", "draggableTrack", "marks"],
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<ISliderRangeProps> = {
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([30, 50]);

        const marks = [
            { label: 0, value: 0 },
            { label: 30, value: 30 },
            { label: 70, value: 70 },
            { label: 100, value: 100 },
        ];

        return (
            <div style={{ maxWidth: 750, padding: 30 }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange values={values} marks={marks} min={0} max={100} step={1} onChange={setValues} />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const WithTooltip: StoryObj<ISliderRangeProps> = {
    name: "With Tooltip",
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([35, 60]);

        return (
            <div style={{ maxWidth: 750, padding: 30 }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    renderTooltipContent={(val) => `${val}%`}
                    size={EComponentSize.LG}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const WithCustomSteps: StoryObj<ISliderRangeProps> = {
    name: "With custom steps",
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([25, 75]);

        return (
            <div style={{ maxWidth: 750, padding: 30 }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    step={[0, 25, 50, 75, 100]}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 25, label: "25" },
                        { value: 50, label: "50" },
                        { value: 75, label: "75" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const NonDraggableTrack: StoryObj<ISliderRangeProps> = {
    name: "Non-draggable Track",
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([35, 60]);

        return (
            <div style={{ maxWidth: 750, padding: 30 }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    draggableTrack={false}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const Disabled: StoryObj<ISliderRangeProps> = {
    render: () => {
        return (
            <div style={{ maxWidth: 750, padding: 30 }}>
                <SliderRange
                    min={0}
                    max={100}
                    values={[35, 60]}
                    onChange={() => {}}
                    disabled
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const Reverse: StoryObj<ISliderRangeProps> = {
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([35, 60]);

        return (
            <div style={{ maxWidth: 750, padding: 30 }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    reverse
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};
