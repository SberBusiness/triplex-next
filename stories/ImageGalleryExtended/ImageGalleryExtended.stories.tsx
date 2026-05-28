import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ImageGalleryExtended } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    MainOnly as MainOnlyRender,
    MainOnlySource,
    WithDots as WithDotsRender,
    WithDotsSource,
    CustomLayout as CustomLayoutRender,
    CustomLayoutSource,
    ManyThumbnails as ManyThumbnailsRender,
    ManyThumbnailsSource,
    OpenFromAvatar as OpenFromAvatarRender,
    OpenFromAvatarSource,
    VisualTestsArrows as VisualTestsArrowsRender,
    VisualTestsDots as VisualTestsDotsRender,
} from "./examples";

export default {
    title: "Components/ImageGalleryExtended",
    component: ImageGalleryExtended,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ImageGalleryExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ImageGalleryExtended>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    withBlur: false,
    height: "auto",
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        withBlur: {
            control: "boolean",
            description: "Показывать ли блюр-слой по краям крупного изображения (`ImageGalleryExtended.Main`).",
            table: { category: "Main" },
        },
        height: {
            control: { type: "select" },
            options: ["auto", 320, 480, 640],
            description: "Высота крупной картинки. `'auto'` — фиксированные значения по breakpoint.",
            table: { category: "Main" },
        },
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
    render: DefaultRender,
};

export const MainOnly: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: MainOnlySource, language: "tsx" },
        },
    },
    render: MainOnlyRender,
};

export const WithDots: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        viewport: { defaultViewport: "XS" },
        docs: {
            controls: { disable: true },
            source: { code: WithDotsSource, language: "tsx" },
        },
    },
    render: WithDotsRender,
};

export const CustomLayout: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: CustomLayoutSource, language: "tsx" },
        },
    },
    render: CustomLayoutRender,
};

export const ManyThumbnails: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: ManyThumbnailsSource, language: "tsx" },
        },
    },
    render: ManyThumbnailsRender,
};

export const OpenFromAvatar: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: OpenFromAvatarSource, language: "tsx" },
        },
    },
    render: OpenFromAvatarRender,
};

/**
 * Скриншот-тест стрелок навигации поверх крупной картинки: слева — первое
 * изображение (стрелка «назад» disabled), справа — последнее (стрелка «вперёд»
 * disabled). Фиксирует disabled-состояния стрелок на границах диапазона.
 */
export const VisualTestsArrows: StoryObj<typeof ImageGalleryExtended> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsArrowsRender,
};

/** Скриншот-тест тиков-индикаторов (мобильный preset): активный тик и обычные. */
export const VisualTestsDots: StoryObj<typeof ImageGalleryExtended> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsDotsRender,
};
