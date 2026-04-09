import moment from "moment";
import "moment/locale/ru";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Calendar, ECalendarPickType } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    PickTypesExample,
    PickTypesExampleSource,
    PlaygroundExample,
} from "./examples/index";

moment.locale("ru");

const meta = {
    title: "Components/Calendar",
    component: Calendar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент календаря.

## Особенности

- Возможен выбор даты (**ECalendarPickType.datePick**) или выбор месяца и года (**ECalendarPickType.monthYearPick**)
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Calendar} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        defaultViewDate: moment().format("YYYY-MM-DD"),
        reversedPick: false,
        pickType: ECalendarPickType.datePick,
    },
    argTypes: {
        defaultViewDate: {
            control: { type: "text" },
            description: "Отображаемая по умолчанию дата",
            table: {
                type: { summary: "string | Moment" },
            },
        },
        format: {
            control: { type: "text" },
            description: "Формат для значения",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        pickType: {
            control: { type: "select" },
            options: Object.values(ECalendarPickType).filter((v) => typeof v === "number"),
            description: "Вариант выбора даты",
            table: {
                type: { summary: "ECalendarPickType" },
            },
        },
        reversedPick: {
            control: { type: "boolean" },
            description: "Обратный порядок выбора даты",
            table: {
                type: { summary: "boolean" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["defaultViewDate", "format", "pickType", "reversedPick"],
        },
        testRunner: { skip: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const PickTypes: Story = {
    render: PickTypesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: PickTypesExampleSource,
                language: "tsx",
            },
        },
    },
};
