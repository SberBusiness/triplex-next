import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    ArgTypes,
    Controls,
    Description,
    Heading,
    Primary,
    Stories,
    Title as SBTitle,
} from "@storybook/addon-docs/blocks";
import { EComponentSize, ModalWindow } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    IPlaygroundArgs,
    LoadingState as LoadingStateRender,
    LoadingStateSource,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
    VISUAL_TESTS_TRIGGER_LABEL,
    VisualTestsDefault,
    VisualTestsLoading,
    VisualTestsLongContent,
    VisualTestsSizeLg,
    VisualTestsSizeSm,
    WithLongContent as WithLongContentRender,
    WithLongContentSource,
} from "./examples";

const STORY_META_DESCRIPTION = `
Компонент **ModalWindow** отображает модальное окно поверх страницы с затемнённым фоном.

## Возможности

- **Размеры**: SM, MD, LG
- **Состояние загрузки**: отображение лоадера поверх контента
- **Фокус-ловушка**: фокус остаётся внутри модального окна
- **Закрытие по Escape**: автоматическое закрытие при нажатии Escape

## Структура

- \`ModalWindow\` — основной компонент
- \`ModalWindowContent\` — контейнер контента
- \`ModalWindowHeader\` — заголовок
- \`ModalWindowBody\` — тело
- \`ModalWindowFooter\` — футер
- \`ModalWindowClose\` — кнопка закрытия
`;

const meta = {
    title: "Components/ModalWindow",
    component: ModalWindow,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
            page: () => (
                <>
                    <SBTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ModalWindow} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ModalWindow>;

export default meta;

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        isLoading: false,
        size: EComponentSize.MD,
    },
    argTypes: {
        isLoading: {
            control: { type: "boolean" },
            description: "Показать состояние загрузки модального окна.",
            table: {
                category: "Состояния",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        size: {
            control: { type: "select" },
            options: [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG],
            description: "Размер модального окна.",
            table: {
                category: "Внешний вид",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "MD" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["isLoading", "size"],
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof ModalWindow> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof ModalWindow> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Примеры модальных окон разных размеров: SM, MD и LG.",
            },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const WithLongContent: StoryObj<typeof ModalWindow> = {
    render: WithLongContentRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Пример модального окна с длинным контентом и прилипающими заголовком и футером.",
            },
            source: {
                code: WithLongContentSource,
                language: "tsx",
            },
        },
    },
};

export const LoadingState: StoryObj<typeof ModalWindow> = {
    render: LoadingStateRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Пример модального окна в состоянии загрузки.",
            },
            source: {
                code: LoadingStateSource,
                language: "tsx",
            },
        },
    },
};

const visualTestsStoryParameters = {
    testRunner: { skip: false },
    controls: { disable: true },
    docs: {
        canvas: { sourceState: "none" as const },
        codePanel: false,
    },
};

const openModalPlay = async ({
    canvas,
    userEvent,
}: Parameters<NonNullable<StoryObj<typeof ModalWindow>["play"]>>[0]) => {
    const trigger = await canvas.findByRole("button", { name: VISUAL_TESTS_TRIGGER_LABEL });
    await userEvent.click(trigger);
};

export const VisualTestsDefaultSize: StoryObj<typeof ModalWindow> = {
    name: "Visual tests: Default",
    tags: ["!autodocs"],
    parameters: visualTestsStoryParameters,
    render: VisualTestsDefault,
    play: openModalPlay,
};

export const VisualTestsSm: StoryObj<typeof ModalWindow> = {
    name: "Visual tests: Size SM",
    tags: ["!autodocs"],
    parameters: visualTestsStoryParameters,
    render: VisualTestsSizeSm,
    play: openModalPlay,
};

export const VisualTestsLg: StoryObj<typeof ModalWindow> = {
    name: "Visual tests: Size LG",
    tags: ["!autodocs"],
    parameters: visualTestsStoryParameters,
    render: VisualTestsSizeLg,
    play: openModalPlay,
};

export const VisualTestsWithLongContent: StoryObj<typeof ModalWindow> = {
    name: "Visual tests: Long Content",
    tags: ["!autodocs"],
    parameters: visualTestsStoryParameters,
    render: VisualTestsLongContent,
    play: openModalPlay,
};

export const VisualTestsLoadingState: StoryObj<typeof ModalWindow> = {
    name: "Visual tests: Loading",
    tags: ["!autodocs"],
    parameters: visualTestsStoryParameters,
    render: VisualTestsLoading,
    play: openModalPlay,
};
