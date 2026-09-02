import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Suggest, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    DropdownListLoading as DropdownListLoadingRender,
    DropdownListLoadingSource,
    VisualTests as VisualTestsRender,
    VisualTestsDropdownListLoading as VisualTestsDropdownListLoadingRender,
    type TPlaygroundArgs,
} from "./examples";

export default {
    title: "Components/Suggest",
    component: Suggest,
    tags: ["autodocs"],
    parameters: {
        // Suggest headless: собственной разметки он не рендерит, поэтому в кадре закрытых
        // стори — только обвязка примеров (TextField, Dropdown) с собственным покрытием.
        // Скриншоты включаются обратно точечно, у стори, где play-функция открывает список.
        testRunner: { skip: true },
        docs: {
            description: {
                component:
                    "Headless-основа выпадающего списка с фильтрацией по введённому значению. Собственной разметки не добавляет: рендерит div-обёртку и раздаёт потомкам через SuggestContext значение поля ввода, видимость выпадающего списка и обработчики выбора и фильтрации. Управляющий элемент и выпадающий список пишет потребитель — хук useSuggestContext отдаёт всё нужное состояние. Готовые компоненты на этой основе — ChipSuggest и SuggestField.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Suggest} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Suggest>;

const PLAYGROUND_ARGS: TPlaygroundArgs = {
    size: EComponentSize.LG,
    placeholder: "Type to proceed",
    noOptionsText: "No matches found.",
    clearInputOnFocus: false,
    dropdownListLoading: false,
};

export const Playground: StoryObj<TPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: "select",
            options: Object.values(EComponentSize),
            description: "Размер. Suggest его не отображает — пример раздаёт значение полю ввода и списку.",
            table: {
                type: { summary: "EComponentSize" },
            },
        },
        placeholder: {
            control: "text",
        },
        noOptionsText: {
            control: "text",
        },
        clearInputOnFocus: {
            control: "boolean",
        },
        dropdownListLoading: {
            control: "boolean",
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof Suggest> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальная композиция: Suggest, управляющий элемент и выпадающий список. Клик по полю открывает список, ввод фильтрует опции, выбор и Escape его закрывают.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof Suggest> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Suggest не отображает размер сам — прокидывайте его в управляющий элемент и выпадающий список.",
            },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const DropdownListLoading: StoryObj<typeof Suggest> = {
    render: DropdownListLoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Пока идёт запрос за опциями, dropdownListLoading дорисовывает лоадер под уже загруженным списком.",
            },
            source: {
                code: DropdownListLoadingSource,
                language: "tsx",
            },
        },
    },
};

// Скриншот-стори возвращаются в прогон точечно: набор исключён на уровне meta.
const visualTestsStoryParameters = {
    testRunner: { skip: false },
    controls: { disable: true },
    docs: {
        canvas: { sourceState: "none" as const },
        codePanel: false,
    },
};

export const VisualTests: StoryObj<typeof Suggest> = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: visualTestsStoryParameters,
    play: async ({ canvas, userEvent }) => {
        const inputs = await canvas.findAllByRole("combobox");

        // Последний случай — с открытым списком; клик внутри Suggest не считается внешним.
        await userEvent.click(inputs[inputs.length - 1]);
    },
};

export const VisualTestsDropdownListLoading: StoryObj<typeof Suggest> = {
    tags: ["!autodocs"],
    render: VisualTestsDropdownListLoadingRender,
    parameters: visualTestsStoryParameters,
    play: async ({ canvas, userEvent }) => {
        await userEvent.click(await canvas.findByRole("combobox"));
    },
};
