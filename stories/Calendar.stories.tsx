import moment from "moment/dist/moment";
import ru from "moment/dist/locale/ru";
import React, { useState } from "react";
import { Calendar, ECalendarPickType, ECalendarDateMarkType } from "../src/components/Calendar";
import { dateFormatYYYYMMDD } from "../src/consts/DateConst";

import { StoryObj } from "@storybook/react";

// Устанавливаем российскую локаль.
moment.locale("ru", ru);

export default {
    title: "Components/Calendar",
    component: Calendar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент календаря.
## Использование
\`\`\`tsx
import { Calendar } from '@sberbusiness/triplex-next';

<Calendar pickedDate={pickedDate} onDateChange={setPickedDate} />
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Calendar> = {
    name: "Playground",
    args: {
        defaultViewDate: moment(),
        reversedPick: false,
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
            options: Object.values(ECalendarPickType),
            description: "Вариант выбора даты",
            table: {
                type: { summary: "ECalendarPickType" },
                defaultValue: undefined,
            },
        },
        limitRange: {
            control: { type: "text" },
            description: "Ограничение выбираемого периода",
            table: {
                type: { summary: "IDateLimitRange | undefined" },
            },
        },
        markedDays: {
            control: { type: "text" },
            description: "Отмеченные дни",
            table: {
                type: { summary: "TCalendarMarkedDays | undefined" },
            },
        },
        disabledDays: {
            control: { type: "text" },
            description: "Дни недоступные для выбора",
            table: {
                type: { summary: "string[] | undefined" },
            },
        },
        reversedPick: {
            control: { type: "boolean" },
            description: "Обратный порядок выбора даты",
            table: {
                type: { summary: "boolean" },
            },
        },
        onPageChange: {
            // control: { type: "text" },
            // description: "Обработчик изменения страницы",
            // table: {
            //     type: { summary: "(viewDate: Moment, viewMode: ECalendarViewMode) => void" },
            // },
            table: {
                disable: true,
            },
        },
        onViewChange: {
            // control: { type: "text" },
            // description: "Обработчик изменения вида",
            // table: {
            //     type: { summary: "(viewDate: Moment, viewMode: ECalendarViewMode) => void" },
            // },
            table: {
                disable: true,
            },
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
