import moment from "moment";
import "moment/locale/ru";
import React, { useState } from "react";
import { Calendar, ECalendarPickType, ECalendarDateMarkType } from "../src/components/Calendar";
import { dateFormatYYYYMMDD } from "../src/consts/DateConst";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";

// Устанавливаем российскую локаль.
moment.locale("ru");

export default {
    title: "Components/Calendar",
    component: Calendar,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
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
};

export const Playground: StoryObj<typeof Calendar> = {
    tags: ["!autodocs"],
    args: {
        defaultViewDate: moment(),
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
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => {
        // Устанавливаем российскую локаль.
        moment.locale("ru");

        const [pickedDate, setPickedDate] = useState(moment());

        const markedDays = {
            [moment().subtract(1, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.BASIC,
            [moment().subtract(2, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.STANDARD,
            [moment().add(1, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.ATTENTION,
            [moment().add(2, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.CRITICAL,
        };

        const disabledDays = [
            moment().subtract(3, "days").format(dateFormatYYYYMMDD),
            moment().subtract(4, "days").format(dateFormatYYYYMMDD),
            moment().add(3, "days").format(dateFormatYYYYMMDD),
            moment().add(4, "days").format(dateFormatYYYYMMDD),
        ];

        return (
            <Calendar
                {...args}
                pickedDate={pickedDate}
                onDateChange={setPickedDate}
                markedDays={markedDays}
                disabledDays={disabledDays}
                yesterdayButtonProps={{
                    children: "Вчера",
                }}
                todayButtonProps={({ currentPeriodSelected }) => ({
                    children: currentPeriodSelected ? "Сегодня" : "К текущей дате",
                })}
                tomorrowButtonProps={{
                    children: "Завтра",
                }}
            />
        );
    },
};

export const Default: StoryObj<typeof Calendar> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        // Устанавливаем российскую локаль.
        moment.locale("ru");

        const [pickedDate, setPickedDate] = useState(moment());

        return <Calendar pickedDate={pickedDate} onDateChange={setPickedDate} />;
    },
};
