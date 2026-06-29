import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { EComponentSize } from "../../src";
import { SliderExtended, ISliderExtendedProps } from "../../src/components/SliderExtended/SliderExtended";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { range } from "lodash";

export default {
    title: "Components/Slider/SliderExtended",
    component: SliderExtended,
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

export const Playground: StoryObj<ISliderExtendedProps> = {
    render: (args) => {
        const [value, setValue] = useState(35);

        const handleChange = (newValue: number) => {
            setValue(newValue);
            action("onChange")(newValue);
        };

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <SliderExtended {...args}>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={value} onChange={handleChange}>
                        <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                    </SliderExtended.Dot>
                    <SliderExtended.Track />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                        <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    args: {
        min: 0,
        max: 100,
        step: 1,
        disabled: false,
        reverse: false,
        size: EComponentSize.MD,
    },
    argTypes: {
        min: {
            control: { type: "number" },
        },
        max: {
            control: { type: "number" },
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
    },
    parameters: {
        controls: {
            include: ["min", "max", "step", "disabled", "reverse", "size"],
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<ISliderExtendedProps> = {
    render: () => {
        const [value, setValue] = useState(35);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <SliderExtended min={0} max={100} size={EComponentSize.MD} step={1}>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={value} onChange={setValue}>
                        <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                    </SliderExtended.Dot>
                    <SliderExtended.Track />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                        <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const Range: StoryObj<ISliderExtendedProps> = {
    render: () => {
        const [value1, setValue1] = useState(35);
        const [value2, setValue2] = useState(60);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${value1}, ${value2}]`}</div>
                <br />
                <SliderExtended min={0} max={100} size={EComponentSize.MD} step={1}>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={value1} onChange={setValue1} />
                    <SliderExtended.Track />
                    <SliderExtended.Dot value={value2} onChange={setValue2} />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                        <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const RangeWithTooltip: StoryObj<ISliderExtendedProps> = {
    name: "Range with Tooltip",
    render: () => {
        const [value1, setValue1] = useState(35);
        const [value2, setValue2] = useState(60);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${value1}, ${value2}]`}</div>
                <br />
                <SliderExtended min={0} max={100} size={EComponentSize.MD} step={1}>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={value1} onChange={setValue1}>
                        <SliderExtended.Tooltip value={value1}>{value1}</SliderExtended.Tooltip>
                    </SliderExtended.Dot>
                    <SliderExtended.Track />
                    <SliderExtended.Dot value={value2} onChange={setValue2}>
                        <SliderExtended.Tooltip value={value2}>{value2}</SliderExtended.Tooltip>
                    </SliderExtended.Dot>
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                        <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const WithCustomSteps: StoryObj<ISliderExtendedProps> = {
    name: "With custom steps",
    render: () => {
        const [value, setValue] = useState(50);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <SliderExtended min={0} max={100} size={EComponentSize.MD} step={[0, 25, 50, 75, 100]}>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={value} onChange={setValue}>
                        <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                    </SliderExtended.Dot>
                    <SliderExtended.Track />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={25}>25</SliderExtended.Mark>
                        <SliderExtended.Mark value={50}>50</SliderExtended.Mark>
                        <SliderExtended.Mark value={75}>75</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const WithoutTooltip: StoryObj<ISliderExtendedProps> = {
    render: () => {
        const [value, setValue] = useState(35);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <SliderExtended min={0} max={100} size={EComponentSize.MD} step={1}>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={value} onChange={setValue} />
                    <SliderExtended.Track />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                        <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "SliderExtended без тултипа.",
            },
        },
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const Disabled: StoryObj<ISliderExtendedProps> = {
    render: () => {
        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <SliderExtended min={0} max={100} size={EComponentSize.MD} step={1} disabled>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={35} onChange={() => {}}>
                        <SliderExtended.Tooltip value={35}>35</SliderExtended.Tooltip>
                    </SliderExtended.Dot>
                    <SliderExtended.Track />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                        <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const Reverse: StoryObj<ISliderExtendedProps> = {
    render: () => {
        const [value, setValue] = useState(35);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <SliderExtended min={0} max={100} size={EComponentSize.MD} step={1} reverse>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot value={value} onChange={setValue}>
                        <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                    </SliderExtended.Dot>
                    <SliderExtended.Track />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                        <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                        <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const Amounts: StoryObj<ISliderExtendedProps> = {
    render: () => {
        const [value, setValue] = useState(1000000);

        const amounts = [
            0,
            10000,
            ...range(20000, 240000, 20000),
            ...range(240000, 1000000, 40000),
            ...range(1000000, 2150000, 50000),
            ...range(2150000, 2600000, 75000),
            ...range(2600000, 3000000, 100000),
            ...range(3000000, 3800000, 200000),
            ...range(3800000, 9000000, 400000),
            ...range(9000000, 10000000, 500000),
            ...range(10000000, 25000000, 2500000),
            ...range(25000000, 40000000, 5000000),
            ...range(40000000, 90000001, 10000000),
            100000000,
        ];

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>{new Intl.NumberFormat("ru-RU").format(value)}</div>
                <br />
                <SliderExtended min={0} max={99} size={EComponentSize.MD} step={1}>
                    <SliderExtended.Rail />
                    <SliderExtended.Dot
                        value={amounts.findIndex((v) => value === v)}
                        onChange={(value) => setValue(amounts[value])}
                    />
                    <SliderExtended.Track />
                    <SliderExtended.Marks>
                        <SliderExtended.Mark value={0}>0 млн</SliderExtended.Mark>
                        <SliderExtended.Mark value={32}>1 млн</SliderExtended.Mark>
                        <SliderExtended.Mark value={65}>3 млн</SliderExtended.Mark>
                        <SliderExtended.Mark value={99}>100 млн</SliderExtended.Mark>
                    </SliderExtended.Marks>
                </SliderExtended>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};
