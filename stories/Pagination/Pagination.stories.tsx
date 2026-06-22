import React from "react";
import { StoryObj } from "@storybook/react";
import {
    Title,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
    Subheading,
} from "@storybook/addon-docs/blocks";
import { action } from "storybook/actions";
import {
    Pagination,
    PaginationNavigation,
    PaginationSelect,
    ISelectExtendedFieldDefaultOption,
} from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    IPaginationPlaygroundProps,
    Default as DefaultRender,
    DefaultSource,
    WithSelectField as WithSelectFieldRender,
    WithSelectFieldSource,
    Extended as ExtendedRender,
    ExtendedSource,
} from "./examples/Pagination";

export default {
    title: "Components/Pagination",
    component: Pagination,
    parameters: {
        docs: {
            description: {
                component: `
Компонент пагинации для отображения списка.
`,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <Subheading>Pagination</Subheading>
                    <ArgTypes of={Pagination} />
                    <Subheading>PaginationNavigation</Subheading>
                    <ArgTypes of={PaginationNavigation} />
                    <Subheading>PaginationSelect</Subheading>
                    <ArgTypes of={PaginationSelect} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
};

export const Playground: StoryObj<IPaginationPlaygroundProps> = {
    tags: ["!autodocs"],
    render: (args) => <PlaygroundRender {...args} />,
    argTypes: {
        currentPage: {
            control: { type: "number", min: 1 },
            description: "Текущая страница",
            table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
        },
        totalPages: {
            control: { type: "number", min: 1, max: 200 },
            description: "Общее количество страниц",
            table: { type: { summary: "number" }, defaultValue: { summary: "10" } },
        },
        boundaryCount: {
            control: { type: "number", min: 0 },
            description: "Количество видимых страниц в начале и в конце",
            table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
        },
        siblingCount: {
            control: { type: "number", min: 0 },
            description: "Количество видимых соседей около текущей",
            table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
        },
        hidePaginationSelect: {
            control: { type: "boolean" },
            description: "Скрывать селект количества элементов",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
        paginationLabel: {
            control: { type: "text" },
            description: "Лейбл селекта количества элементов",
            table: { type: { summary: "string" }, defaultValue: { summary: "Показать на странице:" } },
            if: { arg: "hidePaginationSelect", truthy: false },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: { type: { summary: "string" } },
        },
    },
    args: {
        currentPage: 1,
        totalPages: 10,
        boundaryCount: 0,
        siblingCount: 0,
        hidePaginationSelect: false,
        paginationLabel: "Показать на странице:",
        className: "",
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            description: {
                story: "Интерактивная демонстрация Pagination. В данном примере Pagination.Select не влияет на количество страниц, т.к. totalPages задается напрямую через панель controls.",
            },
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: [
                "currentPage",
                "totalPages",
                "boundaryCount",
                "siblingCount",
                "hidePaginationSelect",
                "paginationLabel",
            ],
        },
    },
};

export const Default: StoryObj<typeof Pagination> = {
    render: DefaultRender,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithSelectField: StoryObj<typeof Pagination> = {
    render: WithSelectFieldRender,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: WithSelectFieldSource,
                language: "tsx",
            },
        },
    },
};

export const Extended: StoryObj<typeof Pagination> = {
    render: ExtendedRender,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            description: {
                story: "Для компоновки кастомной пагинации используется компонент PaginationExtended.",
            },
            source: {
                code: ExtendedSource,
                language: "tsx",
            },
        },
    },
};

interface IVisualCaseProps {
    label: string;
    currentPage: number;
    totalPages: number;
    boundaryCount?: number;
    siblingCount?: number;
}

const VISUAL_CASES: IVisualCaseProps[] = [
    // Короткая навигация без многоточий
    { label: "Короткая, текущая в начале", currentPage: 1, totalPages: 5 },
    { label: "Короткая, текущая в середине", currentPage: 3, totalPages: 5 },
    { label: "Короткая, текущая в конце (disabled «вперёд»)", currentPage: 5, totalPages: 5 },
    // Длинная навигация с многоточиями
    {
        label: "Длинная, многоточие справа (текущая в начале, disabled «назад»)",
        currentPage: 1,
        totalPages: 30,
        boundaryCount: 1,
        siblingCount: 1,
    },
    {
        label: "Длинная, многоточие с обеих сторон (текущая в середине)",
        currentPage: 15,
        totalPages: 30,
        boundaryCount: 1,
        siblingCount: 1,
    },
    {
        label: "Длинная, многоточие слева (текущая в конце, disabled «вперёд»)",
        currentPage: 30,
        totalPages: 30,
        boundaryCount: 1,
        siblingCount: 1,
    },
];

const VISUAL_SELECT_OPTIONS: ISelectExtendedFieldDefaultOption[] = [
    { id: "0", value: "10", label: "10" },
    { id: "1", value: "20", label: "20" },
    { id: "2", value: "50", label: "50" },
    { id: "3", value: "100", label: "100" },
];

export const VisualTests: StoryObj<typeof Pagination> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {VISUAL_CASES.map((visualCase) => (
                <div key={visualCase.label}>
                    <div style={{ marginBottom: 8, fontSize: 14, fontWeight: 700 }}>{visualCase.label}</div>
                    <Pagination
                        paginationNavigationProps={{
                            currentPage: visualCase.currentPage,
                            totalPages: visualCase.totalPages,
                            boundaryCount: visualCase.boundaryCount ?? 0,
                            siblingCount: visualCase.siblingCount ?? 0,
                            onCurrentPageChange: action("onCurrentPageChange"),
                        }}
                    />
                </div>
            ))}
            <div>
                <div style={{ marginBottom: 8, fontSize: 14, fontWeight: 700 }}>С селектом количества элементов</div>
                <Pagination
                    paginationNavigationProps={{
                        currentPage: 7,
                        totalPages: 30,
                        boundaryCount: 1,
                        siblingCount: 1,
                        onCurrentPageChange: action("onCurrentPageChange"),
                    }}
                    paginationSelectProps={{
                        paginationLabel: "Показать на странице:",
                        options: VISUAL_SELECT_OPTIONS,
                        value: VISUAL_SELECT_OPTIONS[0],
                        onChange: action("onPageSizeChange"),
                        targetProps: {
                            fieldLabel: "",
                        },
                    }}
                />
            </div>
        </div>
    ),
};
