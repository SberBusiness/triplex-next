import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { MobileView } from "@sberbusiness/triplex-next";
import { Default as DefaultRender, DefaultSource, Example as ExampleRender, ExampleSource } from "./examples";

const meta = {
    title: "Components/MobileView",
    component: MobileView,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Компонент, который рендерит children при просмотре на мобильном устройстве (ширина окна браузера меньше 768px), в остальных случаях — fallback. Собственной разметки не добавляет. Сокращение над MediaWidth с maxWidth равным EScreenWidth.SM_MAX. Для той же проверки внутри собственной логики есть хук useMobileView.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MobileView} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof MobileView>;

export default meta;

export const Default: StoryObj<typeof MobileView> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Ветка выбирается по ширине окна браузера: уменьшите окно до 767px и меньше, чтобы увидеть children вместо fallback.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof MobileView> = {
    name: "Example: useMobileView",
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Хук useMobileView возвращает результат того же медиа-запроса. Он нужен, когда от ширины экрана зависят props или разметка вокруг, а не выбор между двумя готовыми элементами: на мобильном кнопки становятся блочными и меняют размер.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};
