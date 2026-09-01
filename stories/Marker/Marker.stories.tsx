import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Marker, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Statuses as StatusesRender,
    StatusesSource,
    Sizes as SizesRender,
    SizesSource,
    WithAccessibleName as WithAccessibleNameRender,
    WithAccessibleNameSource,
} from "./examples";

const meta = {
    title: "Components/Marker",
    component: Marker,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Marker — цветная точка-индикатор статуса. Это обёртка над `Badge.Dot`: цвет задаёт `status`, " +
                    "диаметр — `size`, собственной логики и содержимого у компонента нет. " +
                    "Точка неинтерактивна и не имеет доступного имени, поэтому смысл статуса потребитель передаёт сам — " +
                    'текстом рядом (тогда точке ставится `aria-hidden`) либо `role="img"` с `aria-label`. ' +
                    "Если рядом с точкой нужна подпись статуса с описанием, готовая композиция — `MarkerStatus`.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Marker} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof Marker>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    // Props
    status: EMarkerStatus.SUCCESS,
    size: EComponentSize.MD,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        status: {
            description: "Статус, задающий цвет точки.",
            control: "select",
            options: Object.values(EMarkerStatus),
            table: {
                category: "Props",
                type: { summary: "EMarkerStatus" },
            },
        },
        size: {
            description: "Размер: SM (6px) / MD (8px) / LG (10px).",
            control: "select",
            options: Object.values(EComponentSize),
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
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
                story: "Минимальный вызов: оба props обязательны, значений по умолчанию у них нет.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
        // Визуально это та же точка, что и SUCCESS в Statuses — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Statuses: Story = {
    render: StatusesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Все статусы. Каждому соответствует свой токен фона; другой палитры у компонента нет.",
            },
            source: { code: StatusesSource, language: "tsx" },
        },
    },
};

export const Sizes: Story = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Размеры SM (6px) / MD (8px) / LG (10px) — приходят из `Badge.Dot` и задают диаметр точки.",
            },
            source: { code: SizesSource, language: "tsx" },
        },
    },
};

export const WithAccessibleName: Story = {
    name: "With accessible name",
    render: WithAccessibleNameRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story:
                    "Точка без подписи рядом ничего не сообщает скринридеру: корневой `<span>` без роли попадает в `generic`, " +
                    'а ему доступное имя запрещено — одного `aria-label` мало. Передайте роль, поддерживающую имя (`role="img"`), ' +
                    "вместе с текстом. Если же смысл статуса продублирован видимым текстом рядом — наоборот, скройте точку через `aria-hidden`.",
            },
            source: { code: WithAccessibleNameSource, language: "tsx" },
        },
        // Визуально это точка ERROR из Statuses — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};
