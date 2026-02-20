import React, { useEffect, useState } from "react";
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
import {
    EPaginationNavigationIconDirection,
    Pagination,
    PaginationExtended,
    PaginationNavigation,
    PaginationNavigationButton,
    PaginationNavigationExtended,
    PaginationNavigationExtendedItem,
    PaginationPageButton,
    PaginationSelect,
} from "../src/components/Pagination";
import { ISelectExtendedFieldDefaultOption } from "../src/components/SelectExtendedField";

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
                    <Description of={Playground} />
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
};

interface IPaginationPlaygroundProps {
    currentPage?: number;
    totalPages?: number;
    boundaryCount?: number;
    siblingCount?: number;
    hidden?: boolean;
    paginationLabel?: string;
    className?: string;
}

export const Playground: StoryObj<IPaginationPlaygroundProps> = {
    tags: ["!autodocs"],
    render: (args) => {
        const [page, setPage] = useState(args.currentPage ?? 1);
        const [pageSize, setPageSize] = useState(10);

        useEffect(() => {
            setPage(args.currentPage ?? 1);
        }, [args.currentPage]);

        const totalPages = args.totalPages && args.totalPages <= 200 ? args.totalPages : 200;

        useEffect(() => {
            if (page > totalPages) {
                setPage(1);
            }
        }, [page, totalPages]);

        const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
            setPageSize(Number(option.value));
        };

        const options: ISelectExtendedFieldDefaultOption[] = [
            { id: "0", value: "10", label: "10" },
            { id: "1", value: "20", label: "20" },
            { id: "2", value: "50", label: "50" },
            { id: "3", value: "100", label: "100" },
        ];

        const selectedOption = options.find((option) => option.value === String(pageSize));

        return (
            <Pagination
                className={args.className}
                paginationNavigationProps={{
                    currentPage: page,
                    totalPages,
                    boundaryCount: args.boundaryCount ?? 0,
                    siblingCount: args.siblingCount ?? 0,
                    onCurrentPageChange: setPage,
                }}
                paginationSelectProps={{
                    paginationLabel: args.paginationLabel ?? "Показать на странице:",
                    hidden: args.hidden,
                    options,
                    value: selectedOption || options[0],
                    onChange: handlePageSizeChange,
                    targetProps: {
                        fieldLabel: "",
                    },
                }}
            />
        );
    },
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
        hidden: {
            control: { type: "boolean" },
            description: "Скрывать селект количества элементов",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
        paginationLabel: {
            control: { type: "text" },
            description: "Лейбл селекта количества элементов",
            table: { type: { summary: "string" }, defaultValue: { summary: "Показать на странице:" } },
            if: { arg: "hidden", truthy: false },
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
        hidden: false,
        paginationLabel: "Показать на странице:",
        className: "",
    },
    parameters: {
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
            include: ["currentPage", "totalPages", "boundaryCount", "siblingCount", "hidden", "paginationLabel"],
        },
    },
};

export const Default: StoryObj<typeof Pagination> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const totalItems = 50;
        const pageSize = 10;
        const [page, setPage] = useState(1);

        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

        return (
            <Pagination paginationNavigationProps={{ currentPage: page, totalPages, onCurrentPageChange: setPage }} />
        );
    },
};

export const WithSelectField: StoryObj<typeof Pagination> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [page, setPage] = useState(7);
        const [pageSize, setPageSize] = useState(10);
        const totalItems = 300;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

        const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
            setPageSize(Number(option.value));
        };

        const options: ISelectExtendedFieldDefaultOption[] = [
            { id: "0", value: "10", label: "10" },
            { id: "1", value: "20", label: "20" },
            { id: "2", value: "50", label: "50" },
            { id: "3", value: "100", label: "100" },
        ];

        const selectedOption = options.find((option) => option.value === String(pageSize));

        return (
            <Pagination
                paginationNavigationProps={{
                    currentPage: page,
                    totalPages,
                    boundaryCount: 1,
                    siblingCount: 1,
                    onCurrentPageChange: setPage,
                }}
                paginationSelectProps={{
                    paginationLabel: "Показать на странице:",
                    options,
                    value: selectedOption || options[0],
                    onChange: handlePageSizeChange,
                    targetProps: {
                        fieldLabel: "",
                    },
                }}
            />
        );
    },
};

export const Extended: StoryObj<typeof Pagination> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Для компоновки кастомной пагинации используется компонент PaginationExtended.",
            },
        },
    },
    render: () => {
        const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);
        const totalItems = 300;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

        console.log("totalPages - ", totalPages);

        const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
            setPageSize(Number(option.value));
        };

        const options: ISelectExtendedFieldDefaultOption[] = [
            { id: "0", value: "10", label: "10" },
            { id: "1", value: "20", label: "20" },
            { id: "2", value: "50", label: "50" },
            { id: "3", value: "100", label: "100" },
            { id: "4", value: "300", label: "300" },
        ];

        const selectedOption = options.find((option) => option.value === String(pageSize));

        return (
            <PaginationExtended>
                {totalPages > 1 && (
                    <PaginationNavigationExtended>
                        <PaginationNavigationExtendedItem>
                            <PaginationNavigationButton
                                direction={EPaginationNavigationIconDirection.BACK}
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            />
                        </PaginationNavigationExtendedItem>

                        <PaginationNavigationExtendedItem key="current-page">
                            <PaginationPageButton isCurrent onClick={() => {}}>
                                {page}
                            </PaginationPageButton>
                        </PaginationNavigationExtendedItem>

                        <PaginationNavigationExtendedItem>
                            <PaginationNavigationButton
                                direction={EPaginationNavigationIconDirection.NEXT}
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                            />
                        </PaginationNavigationExtendedItem>
                    </PaginationNavigationExtended>
                )}
                <PaginationSelect
                    paginationLabel="Показать на странице:"
                    value={selectedOption || options[0]}
                    options={options}
                    onChange={handlePageSizeChange}
                    targetProps={{
                        fieldLabel: "",
                    }}
                />
            </PaginationExtended>
        );
    },
};
