import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ImageGalleryExtended } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    DefaultRender,
    DefaultSource,
    MainOnlyRender,
    MainOnlySource,
    CustomLayoutRender,
    CustomLayoutSource,
    ManyThumbnailsRender,
    ManyThumbnailsSource,
    OpenFromAvatarRender,
    OpenFromAvatarSource,
    VisualTestsArrowsRender,
    type IPlaygroundArgs,
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

/** Интерактивный playground: `withBlur` и `height` (`Main`) настраиваются через панель Controls. */
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

/** Полный состав, собранный вручную: крупная картинка со стрелками (`Main` + `Nav`/`Arrow`) и лента миниатюр (`Thumbnails`), на мобильном — индикаторы страниц через `MobileView`. */
export const Default: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: DefaultSource, language: "tsx" },
        },
    },
    render: DefaultRender,
};

/** Только крупная картинка со стрелками — без миниатюр и индикаторов страниц. */
export const MainOnly: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: MainOnlySource, language: "tsx" },
        },
    },
    render: MainOnlyRender,
};

/** Кастомизация через render-функции: панель навигации «Назад · N / Total · Вперёд» через `Nav` вместо стрелок и миниатюры с собственным доступным именем через `Thumbnails`. */
export const CustomLayout: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: CustomLayoutSource, language: "tsx" },
        },
    },
    render: CustomLayoutRender,
};

/** Большой набор (20 изображений): горизонтальный скролл ленты миниатюр с автоцентровкой активной, на мобильном — индикаторы страниц. */
export const ManyThumbnails: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: ManyThumbnailsSource, language: "tsx" },
        },
    },
    render: ManyThumbnailsRender,
};

/** Открытие крупного изображения в `LightBox` по клику на превью-`Avatar`. */
export const OpenFromAvatar: StoryObj<typeof ImageGalleryExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
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
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsArrowsRender,
};
