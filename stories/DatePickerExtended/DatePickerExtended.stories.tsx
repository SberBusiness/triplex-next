import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { DatePickerExtended, ECalendarPickType, EDropdownAlignment } from "@sberbusiness/triplex-next";
import {
    Alignments as AlignmentsRender,
    AlignmentsSource,
    Default as DefaultRender,
    DefaultSource,
    IPlaygroundProps,
    PickTypes as PickTypesRender,
    PickTypesSource,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
    VisualTestsAlignmentRight as VisualTestsAlignmentRightRender,
    VisualTestsMonthYear as VisualTestsMonthYearRender,
    WithFooterButtons as WithFooterButtonsRender,
    WithFooterButtonsSource,
    WithMarkedAndDisabledDays as WithMarkedAndDisabledDaysRender,
    WithMarkedAndDisabledDaysSource,
} from "./examples";

const meta = {
    title: "Components/Date components/DatePickerExtended",
    component: DatePickerExtended,
    tags: ["autodocs"],
    // Обязательные props компонента. Все стори отрисовываются собственным render,
    // поэтому здесь заданы нейтральные заглушки.
    args: {
        pickedDate: null,
        onDateChange: () => {},
        renderTarget: () => null,
        renderDropdownHeaderTarget: () => null,
    },
    parameters: {
        docs: {
            description: {
                component: `
База для компонентов выбора даты: рендерит произвольный целевой элемент и выпадающий **Calendar** над ним.

## Особенности

- Состояние открытости календаря хранится внутри компонента. Целевой элемент, отрисованный через **renderTarget**, получает его из контекста **DatePickerExtendedContext** — так устроены **DateField**, **MonthYearField** и **ChipDatePicker**.
- Календарь закрывается по Escape, по клику вне компонента и после выбора даты.
- На мобильной ширине экрана вместо десктопного меню открывается полноэкранная версия, в заголовок которой попадает **renderDropdownHeaderTarget**.
- Все props календаря (**pickType**, **format**, **limitRange**, **markedDays**, **disabledDays**, кнопки футера и т.д.) пробрасываются во вложенный **Calendar**, остальные — на корневой элемент.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={DatePickerExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof DatePickerExtended>;

export default meta;

type TPlay = NonNullable<StoryObj<typeof DatePickerExtended>["play"]>;

/** Раскрывает календарь — иначе на скриншот попадёт только целевой элемент. */
const openCalendar: TPlay = async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole("button", { name: "Открыть календарь" }));
};

const PLAYGROUND_ARGS: IPlaygroundProps = {
    alignment: EDropdownAlignment.LEFT,
    pickType: ECalendarPickType.DATE,
    reversedPick: false,
    withFooterButtons: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        alignment: {
            control: { type: "select" },
            options: Object.values(EDropdownAlignment),
            description: "Выравнивание выпадающего календаря относительно целевого элемента.",
            table: {
                category: "Props",
                type: { summary: "EDropdownAlignment" },
                defaultValue: { summary: "EDropdownAlignment.LEFT" },
            },
        },
        pickType: {
            control: { type: "select" },
            options: Object.values(ECalendarPickType),
            description: "Вариант выбора даты.",
            table: {
                category: "Props",
                type: { summary: "ECalendarPickType" },
                defaultValue: { summary: "ECalendarPickType.DATE" },
            },
        },
        reversedPick: {
            control: "boolean",
            description: "Обратный порядок выбора даты: год → месяц → день.",
            table: {
                category: "Props",
                defaultValue: { summary: "false" },
            },
        },
        withFooterButtons: {
            control: "boolean",
            description: "С кнопками «Вчера» / «Сегодня» / «Завтра» в футере календаря.",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof DatePickerExtended> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Целевой элемент открывает и закрывает календарь через DatePickerExtendedContext. Выбор даты закрывает календарь.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Alignments: StoryObj<typeof DatePickerExtended> = {
    render: AlignmentsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выравнивание календаря относительно целевого элемента. Раскрытое состояние — в скриншот-тестах.",
            },
            source: {
                code: AlignmentsSource,
                language: "tsx",
            },
        },
        // Закрытое состояние повторяет Default, раскрытое снимается в VisualTests.
        testRunner: { skip: true },
    },
};

export const PickTypes: StoryObj<typeof DatePickerExtended> = {
    render: PickTypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выбор дня (DATE) и выбор месяца с годом (MONTH_YEAR). Раскрытое состояние — в скриншот-тестах.",
            },
            source: {
                code: PickTypesSource,
                language: "tsx",
            },
        },
        // Закрытое состояние повторяет Default, раскрытое снимается в VisualTestsMonthYear.
        testRunner: { skip: true },
    },
};

export const WithMarkedAndDisabledDays: StoryObj<typeof DatePickerExtended> = {
    render: WithMarkedAndDisabledDaysRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Отмеченные дни, недоступные для выбора дни и ограничение выбираемого периода пробрасываются в Calendar.",
            },
            source: {
                code: WithMarkedAndDisabledDaysSource,
                language: "tsx",
            },
        },
        // Закрытое состояние повторяет Default, раскрытое снимается в VisualTests.
        testRunner: { skip: true },
    },
};

export const WithFooterButtons: StoryObj<typeof DatePickerExtended> = {
    render: WithFooterButtonsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Кнопки футера календаря. Футер появляется только вместе с `todayButtonProps`, поэтому без него не будет и «Вчера» с «Завтра». Сами «Вчера» и «Завтра» показываются только на странице текущего месяца.",
            },
            source: {
                code: WithFooterButtonsSource,
                language: "tsx",
            },
        },
        // Пример завязан на текущую дату — скриншот был бы нестабильным.
        testRunner: { skip: true },
    },
};

export const VisualTests: StoryObj<typeof DatePickerExtended> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: openCalendar,
};

export const VisualTestsMonthYear: StoryObj<typeof DatePickerExtended> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsMonthYearRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: openCalendar,
};

export const VisualTestsAlignmentRight: StoryObj<typeof DatePickerExtended> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsAlignmentRightRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: openCalendar,
};
