import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Editable as EditableRender,
    EditableSource,
    Sizes as SizesRender,
    SizesSource,
    Disabled as DisabledRender,
    DisabledSource,
    WithCustomButtonProps as WithCustomButtonPropsRender,
    WithCustomButtonPropsSource,
    WithOverflow as WithOverflowRender,
    WithOverflowSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/Tag",
    component: Tag,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Tag демонстрирует выбранное значение того или иного параметра — например применённый фильтр. " +
                    "Кнопка удаления есть всегда, кнопка редактирования появляется, только когда передан `onEdit`. " +
                    "Оба колбэка получают `id` тега, поэтому в группе тегов не нужны отдельные замыкания на каждый элемент. " +
                    "Кнопки не содержат текста, поэтому `aria-label` для них задаёт потребитель через `editButtonProps` " +
                    "и `removeButtonProps`. Длинный контент обрезается многоточием по ширине контейнера.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Tag} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    // Props
    children: "Selected value",
    size: EComponentSize.LG,
    disabled: false,
    // Settings
    withEditButton: true,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        children: {
            description: "Содержимое тега.",
            control: "text",
            table: { category: "Props" },
        },
        size: {
            description: "Размер.",
            control: "select",
            options: Object.values(EComponentSize),
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
            },
        },
        disabled: {
            description: "Отключенное состояние.",
            control: "boolean",
            table: {
                category: "Props",
                defaultValue: { summary: "false" },
            },
        },
        withEditButton: {
            description: "С кнопкой редактирования — она появляется, когда передан onEdit.",
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "true" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальный тег: контент и кнопка удаления. `id` уходит аргументом в `onRemove` — на корневой элемент как атрибут он не попадает.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const Editable: Story = {
    render: EditableRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Тег с редактированием: кнопка появляется только вместе с колбэком `onEdit` и встаёт слева от кнопки удаления.",
            },
            source: { code: EditableSource, language: "tsx" },
        },
    },
};

export const Sizes: Story = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Размеры SM (20px) / MD (28px) / LG (32px). Размер тега задаёт размер текста и размер иконок в кнопках.",
            },
            source: { code: SizesSource, language: "tsx" },
        },
    },
};

export const Disabled: Story = {
    render: DisabledRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Отключенное состояние: текст приглушается, обе кнопки блокируются и колбэки не вызываются.",
            },
            source: { code: DisabledSource, language: "tsx" },
        },
    },
};

export const WithCustomButtonProps: Story = {
    name: "With custom button props",
    render: WithCustomButtonPropsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "`editButtonProps` и `removeButtonProps` уходят на `ButtonIcon`. Собственный `onClick` в них не заменяет `onEdit` / `onRemove`, а вызывается следом за ними.",
            },
            source: { code: WithCustomButtonPropsSource, language: "tsx" },
        },
        // Визуально повторяет Editable — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const WithOverflow: Story = {
    name: "With overflow",
    render: WithOverflowRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Тег не шире своего контейнера: длинный контент обрезается многоточием, кнопки остаются на месте.",
            },
            source: { code: WithOverflowSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ canvasElement, userEvent }) => {
        // Кольцо фокуса кнопки видно только при переходе с клавиатуры — заводим его в кадр.
        await userEvent.click(canvasElement);
        await userEvent.tab();
    },
};
