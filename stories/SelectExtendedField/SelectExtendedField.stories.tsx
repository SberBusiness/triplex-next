import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EComponentSize, EFormFieldStatus, SelectExtendedField } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
    IPlaygroundProps,
    Loading as LoadingRender,
    LoadingSource,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
    Statuses as StatusesRender,
    StatusesSource,
    VisualTests as VisualTestsRender,
    WithClearButton as WithClearButtonRender,
    WithClearButtonSource,
    WithPrefixAndPostfix as WithPrefixAndPostfixRender,
    WithPrefixAndPostfixSource,
} from "./examples";

const meta = {
    title: "Components/SelectExtendedField",
    component: SelectExtendedField,
    tags: ["autodocs"],
    // Обязательные props компонента. Все стори отрисовываются собственным render,
    // поэтому здесь заданы нейтральные заглушки.
    args: {
        renderTarget: () => null,
        children: () => null,
    },
    parameters: {
        docs: {
            description: {
                component: `
Базовый компонент Select: владеет только состоянием открытости выпадающего блока. Разметку поля выбора задаёт **renderTarget**, разметку выпадающего блока — **children**. На его основе построены **SelectField**, **MultiselectField** и фильтр-чипы **Chip.Select**, **Chip.Sort**, **Chip.Multiselect**.

## Особенности

- Состояние открытости внутреннее. Рендер-функции получают **opened** и **setOpened** и решают, что показывать.
- Содержимое выпадающего блока произвольное: список опций, форма фильтра, любой блок. Готовое поле выбора даёт **SelectExtendedFieldTarget**, готовый выпадающий блок — **SelectExtendedFieldDropdown**.
- Закрывается по Escape и по нажатию мышью вне поля и вне выпадающего блока. Клик внутри выпадающего блока учитывается через **dropdownRef**, поэтому работает и с рендером через Portal.
- Закрытие по Tab включается отдельно — prop **closeOnTab**.
- **onOpen** и **onClose** вызываются только на смену состояния и не срабатывают на первом рендере.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SelectExtendedField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SelectExtendedField>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundProps = {
    closeOnTab: true,
    size: EComponentSize.MD,
    status: EFormFieldStatus.DEFAULT,
    fieldLabel: "Выберите опцию",
    placeholder: "Не выбрано",
    loading: false,
    withClearButton: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        closeOnTab: {
            control: "boolean",
            description: "Закрытие выпадающего блока при нажатии клавиши Tab.",
            table: {
                category: "Props",
                defaultValue: { summary: "false" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер поля выбора (prop компонента SelectExtendedFieldTarget).",
            table: {
                category: "Settings",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Визуальное состояние поля выбора (prop компонента SelectExtendedFieldTarget).",
            table: {
                category: "Settings",
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
            },
        },
        fieldLabel: {
            control: "text",
            description: "Заголовок поля выбора.",
            table: { category: "Settings" },
        },
        placeholder: {
            control: "text",
            description: "Текст, отображаемый пока значение не выбрано.",
            table: { category: "Settings" },
        },
        loading: {
            control: "boolean",
            description: "Состояние загрузки: вместо каретки лоадер, поле не открывается.",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withClearButton: {
            control: "boolean",
            description: "Кнопка очистки выбранного значения.",
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

export const Default: StoryObj<typeof SelectExtendedField> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Поле выбора и список опций: SelectExtendedFieldTarget в renderTarget и SelectExtendedFieldDropdown в children.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof SelectExtendedField> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Размеры SM / MD / LG. Размер задаётся полю выбора, выпадающему блоку и списку отдельно.",
            },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: StoryObj<typeof SelectExtendedField> = {
    render: StatusesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Визуальные состояния поля выбора. В состоянии DISABLED поле не открывается ни мышью, ни с клавиатуры.",
            },
            source: {
                code: StatusesSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof SelectExtendedField> = {
    render: LoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Состояние загрузки: вместо каретки отображается лоадер, поле не реагирует на клик и клавиатуру.",
            },
            source: {
                code: LoadingSource,
                language: "tsx",
            },
        },
    },
};

export const WithClearButton: StoryObj<typeof SelectExtendedField> = {
    render: WithClearButtonRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Кнопка очистки появляется, когда в SelectExtendedFieldTarget передан onClear.",
            },
            source: {
                code: WithClearButtonSource,
                language: "tsx",
            },
        },
    },
};

export const WithPrefixAndPostfix: StoryObj<typeof SelectExtendedField> = {
    render: WithPrefixAndPostfixRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Слоты prefix и postfix поля выбора. Постфикс отображается после каретки.",
            },
            source: {
                code: WithPrefixAndPostfixSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof SelectExtendedField> = {
    name: "Example: произвольный выпадающий блок",
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Ради таких сценариев компонент и нужен: вместо списка опций в выпадающем блоке чекбоксы и кнопки, значение подтверждается явно.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof SelectExtendedField> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ canvas, userEvent }) => {
        await userEvent.click(await canvas.findByText("Открыть список"));
    },
};
