import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Confirm, EConfirmParentComponent } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
    IConfirmPlaygroundProps,
    ParentComponents as ParentComponentsRender,
    ParentComponentsSource,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
} from "./examples";

const STORY_META_DESCRIPTION = `
Компонент **Confirm** — предупреждение о закрытии лайтбокса или его боковой панели: карточка **Island** типа TYPE_1 с ролью \`dialog\`.

- **Назначение**: подтвердить действие, которое приведёт к потере данных.
- **Состав**: текст (\`Confirm.Content\` с \`Title\` и \`SubTitle\`), кнопки действий (\`Confirm.Controls\`) и кнопка закрытия (\`Confirm.Close\`).
- **Ширина**: ограничивается свойством \`parentComponent\` — по ширине контента лайтбокса или боковой панели SM / MD / LG.
- **Состояния нет**: компонент ничего не открывает и не закрывает, обработчики задаёт потребитель.

Обычно открывается внутри \`TopOverlay\` (он же \`LightBox.TopOverlay\`) — см. стори **Example**.
`;

const meta = {
    title: "Components/Confirm",
    component: Confirm,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Confirm} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Confirm>;

export default meta;

const PLAYGROUND_ARGS = {
    parentComponent: EConfirmParentComponent.LIGHTBOX,
    withCloseButton: true,
    clickByEsc: false,
};

export const Playground: StoryObj<IConfirmPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        parentComponent: {
            control: { type: "select" },
            options: Object.values(EConfirmParentComponent),
            description: "Компонент, в котором используется Confirm. Задаёт максимальную ширину.",
            table: {
                type: { summary: "EConfirmParentComponent" },
                defaultValue: { summary: "EConfirmParentComponent.LIGHTBOX" },
            },
        },
        withCloseButton: {
            control: { type: "boolean" },
            description: "С кнопкой закрытия Confirm.Close.",
            table: { category: "Settings" },
        },
        clickByEsc: {
            control: { type: "boolean" },
            description: "Нажатие Esc вызывает click по кнопке закрытия.",
            table: { category: "Settings" },
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

export const Default: StoryObj<typeof Confirm> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Предупреждение с заголовком, поясняющим текстом, кнопками действий и крестиком." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const ParentComponents: StoryObj<typeof Confirm> = {
    name: "Parent components",
    render: ParentComponentsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Максимальная ширина под каждое значение EConfirmParentComponent: ширина контента лайтбокса и боковых панелей SM / MD / LG. Разница видна на широком экране — на узком ширину ограничивает контейнер.",
            },
            source: {
                code: ParentComponentsSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof Confirm> = {
    render: ExampleRender,
    parameters: {
        // Лайтбокс с верхней панелью открывается по клику — статичный скриншот показал бы только кнопку.
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            description: {
                story: "Confirm внутри TopOverlay: закрытие LightBox с несохранёнными данными требует подтверждения.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Confirm> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
