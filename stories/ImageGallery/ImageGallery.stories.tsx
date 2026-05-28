import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ImageGallery } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    FixedHeight as FixedHeightRender,
    FixedHeightSource,
    WithoutThumbnails as WithoutThumbnailsRender,
    WithoutThumbnailsSource,
    WithDots as WithDotsRender,
    WithDotsSource,
    PropsForwarding as PropsForwardingRender,
    PropsForwardingSource,
    WithoutBlur as WithoutBlurRender,
    WithoutBlurSource,
    InsideLightBox as InsideLightBoxRender,
    InsideLightBoxSource,
} from "./examples";

export default {
    title: "Components/ImageGallery",
    component: ImageGallery,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ImageGallery} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ImageGallery>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    height: "auto",
    withBlur: true,
    showThumbnails: true,
    showDots: true,
    defaultId: "photo-1",
    prevArrowProps: { "aria-label": "Предыдущее изображение" },
    nextArrowProps: { "aria-label": "Следующее изображение" },
    thumbnailsProps: {},
    dotsProps: {},
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        height: {
            control: { type: "select" },
            options: ["auto", 320, 480, 640],
            description: "Высота крупной картинки. `'auto'` — фиксированные значения по breakpoint.",
            table: { category: "Props" },
        },
        withBlur: {
            control: "boolean",
            description: "Показывать ли блюр-слой по краям крупного изображения.",
            table: { category: "Props" },
        },
        showThumbnails: {
            control: "boolean",
            description: "Показывать ли ленту миниатюр (десктоп).",
            table: { category: "Props" },
        },
        showDots: {
            control: "boolean",
            description: "Показывать ли ряд тиков-индикаторов (мобильный).",
            table: { category: "Props" },
        },
        defaultId: {
            control: { type: "select" },
            options: [
                "photo-1",
                "photo-2",
                "photo-3",
                "photo-4",
                "photo-5",
                "photo-6",
                "photo-7",
                "photo-8",
                "photo-9",
            ],
            description: "Идентификатор активного изображения по умолчанию.",
            table: { category: "Props" },
        },
        prevArrowProps: {
            control: "object",
            description: "Свойства кнопки перехода к предыдущему изображению.",
            table: { category: "Accessibility" },
        },
        nextArrowProps: {
            control: "object",
            description: "Свойства кнопки перехода к следующему изображению.",
            table: { category: "Accessibility" },
        },
        thumbnailsProps: {
            control: "object",
            description: "Свойства ленты миниатюр (десктоп).",
            table: { category: "Props" },
        },
        dotsProps: {
            control: "object",
            description: "Свойства ряда тиков-индикаторов (мобильный).",
            table: { category: "Props" },
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

export const Default: StoryObj<typeof ImageGallery> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
    render: DefaultRender,
};

export const FixedHeight: StoryObj<typeof ImageGallery> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: FixedHeightSource, language: "tsx" },
        },
    },
    render: FixedHeightRender,
};

export const WithoutThumbnails: StoryObj<typeof ImageGallery> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: WithoutThumbnailsSource, language: "tsx" },
        },
    },
    render: WithoutThumbnailsRender,
};

export const WithDots: StoryObj<typeof ImageGallery> = {
    parameters: {
        viewport: { defaultViewport: "XS" },
        docs: {
            controls: { disable: true },
            source: { code: WithDotsSource, language: "tsx" },
        },
    },
    render: WithDotsRender,
};

export const PropsForwarding: StoryObj<typeof ImageGallery> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: PropsForwardingSource, language: "tsx" },
        },
    },
    render: PropsForwardingRender,
};

export const WithoutBlur: StoryObj<typeof ImageGallery> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: WithoutBlurSource, language: "tsx" },
        },
    },
    render: WithoutBlurRender,
};

export const InsideLightBoxStory: StoryObj<typeof ImageGallery> = {
    name: "InsideLightBox",
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: InsideLightBoxSource, language: "tsx" },
        },
    },
    render: InsideLightBoxRender,
};
