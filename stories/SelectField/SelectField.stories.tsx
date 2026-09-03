import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EComponentSize, EFormFieldStatus, SelectField } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    IPlaygroundProps,
    Loading as LoadingRender,
    LoadingSource,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
    Statuses as StatusesRender,
    StatusesSource,
    VisualTests as VisualTestsRender,
    WithDescription as WithDescriptionRender,
    WithDescriptionSource,
} from "./examples";

const meta = {
    title: "Components/SelectField",
    component: SelectField,
    tags: ["autodocs"],
    // Обязательные props компонента. Все стори отрисовываются собственным render,
    // поэтому здесь заданы нейтральные заглушки.
    args: {
        size: EComponentSize.MD,
        options: [],
        onChange: () => {},
    },
    parameters: {
        docs: {
            description: {
                component: `
Готовый Select со списком опций: поле выбора и выпадающий блок собраны заранее. Построен на **SelectExtendedField** — состоянием открытости владеет он, поэтому prop'а **opened** у **SelectField** нет.

## Особенности

- Значение — целиком объект опции (**ISelectFieldOption**), а не её id. С опциями списка оно сопоставляется по полю **id**.
- Заголовок поля задаётся через **targetProps.fieldLabel**: собственного prop'а **fieldLabel** у компонента нет, **targetProps** уходит целиком в **SelectExtendedField.Target**.
- Ширина выпадающего блока всегда равна ширине поля (**EDropdownWidth.TARGET**). Остальные настройки блока — через **dropdownProps**.
- В мобильном режиме выпадающий блок раскрывается на весь экран, его заголовок задаёт **mobileTitle**.
- Список закрывается по Escape, по нажатию мышью вне поля и по Tab.
- Компонент связывает поле со списком сам: **role="combobox"**, **aria-controls** и **aria-activedescendant** выставляются автоматически. Доступное имя задаёт потребитель — через **targetProps.fieldLabel** либо **aria-labelledby**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SelectField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SelectField>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundProps = {
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    loading: false,
    placeholder: "Не выбрано",
    fieldLabel: "Выберите опцию",
    withDescription: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента.",
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Визуальное состояние поля. DISABLED блокирует открытие списка.",
            table: {
                category: "Props",
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
            },
        },
        loading: {
            control: "boolean",
            description: "Состояние загрузки: вместо каретки лоадер, список не открывается.",
            table: {
                category: "Props",
                defaultValue: { summary: "false" },
            },
        },
        placeholder: {
            control: "text",
            description: "Текст, отображаемый пока значение не выбрано.",
            table: { category: "Props" },
        },
        fieldLabel: {
            control: "text",
            description: "Заголовок поля. Передаётся через targetProps.",
            table: { category: "Settings" },
        },
        withDescription: {
            control: "boolean",
            description: "Описание под полем (FormFieldDescription).",
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

export const Default: StoryObj<typeof SelectField> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальный сценарий: список опций, выбранное значение хранит потребитель.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof SelectField> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Размеры SM / MD / LG. Размер задаётся один раз и применяется и к полю, и к выпадающему блоку.",
            },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: StoryObj<typeof SelectField> = {
    render: StatusesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Визуальные состояния поля. В состоянии DISABLED список не открывается ни мышью, ни с клавиатуры.",
            },
            source: {
                code: StatusesSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof SelectField> = {
    render: LoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Состояние загрузки: вместо каретки отображается лоадер, список не раскрывается.",
            },
            source: {
                code: LoadingSource,
                language: "tsx",
            },
        },
    },
};

export const WithDescription: StoryObj<typeof SelectField> = {
    render: WithDescriptionRender,
    parameters: {
        controls: { disable: true },
        // Поле повторяет состояния из Default и Statuses, отличается только текстом
        // FormFieldDescription — отдельный скриншот ничего не добавляет.
        testRunner: { skip: true },
        docs: {
            description: {
                story: "Описание и текст ошибки под полем: SelectField и FormFieldDescription внутри FormGroup.",
            },
            source: {
                code: WithDescriptionSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof SelectField> = {
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
        // Раскрываем список первого поля: подсветка выбранной опции и позиционирование
        // выпадающего блока иначе в скриншот не попадут.
        const [openedSelect] = await canvas.findAllByRole("combobox");

        await userEvent.click(openedSelect);
    },
};
