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
        theme: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlTheme),
            description: "Визуальный стиль сегментов",
        },
        size: {
            control: { type: "select" },
            options: Object.values(ESegmentedControlSize),
            description: "Размер сегментов",
        },
        disabled: {
            control: { type: "boolean" },
            description: "Неактивное состояние",
        },
    },
    parameters: {},
};

export const Single: StoryObj<typeof SegmentedControl> = {
    name: "Single",
    args: {
        theme: ESegmentedControlTheme.GENERAL_1,
        size: ESegmentedControlSize.MD,
        disabled: false,
    },
    render: (args) => {
        const [value, setValue] = useState(3);

        return (
            <SegmentedControl type={ESegmentedControlType.SINGLE} value={value} onSelect={setValue} {...args}>
                {[1, 2, 3, 4, 5].map((segmentValue) => (
                    <SegmentedControl.Segment key={segmentValue} value={segmentValue}>
                        {`Segment ${segmentValue}`}
                    </SegmentedControl.Segment>
                ))}
            </SegmentedControl>
        );
    },
};

export const Multiple: StoryObj<typeof SegmentedControl> = {
    name: "Multiple",
    args: {
        theme: ESegmentedControlTheme.GENERAL_1,
        size: ESegmentedControlSize.MD,
        disabled: false,
    },
    render: (args) => {
        const [value, setValue] = useState([3]);

        return (
            <SegmentedControl type={ESegmentedControlType.MULTIPLE} value={value} onSelect={setValue} {...args}>
                {[1, 2, 3, 4, 5].map((segmentValue) => (
                    <SegmentedControl.Segment key={segmentValue} value={segmentValue}>
                        {`Segment ${segmentValue}`}
                    </SegmentedControl.Segment>
                ))}
            </SegmentedControl>
        );
    },
};
