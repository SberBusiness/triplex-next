import React, { useEffect, useState } from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";
import { Pagination, PaginationExtended, PaginationNavigation, PaginationSelect } from "../src/components/Pagination";
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
                    <h2>Props</h2>
                    <h3>Pagination</h3>
                    <ArgTypes of={Pagination} />
                    <h3>PaginationNavigation</h3>
                    <ArgTypes of={PaginationNavigation} />
                    <h3>PaginationSelect</h3>
                    <ArgTypes of={PaginationSelect} />
                    <h2>Playground</h2>
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
        const defaultPageSize = 10;
        const [page, setPage] = useState(args.currentPage ?? 1);
        const [pageSize, setPageSize] = useState(defaultPageSize);

        const totalItems = (args.totalPages && args.totalPages <= 200 ? args.totalPages : 200) * defaultPageSize;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

        useEffect(() => {
            setPage(args.currentPage ?? 1);
        }, [args.currentPage]);

        useEffect(() => {
            if (page > totalPages) {
                setPage(1);
            }
        }, [page, totalPages]);

        const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
            setPageSize(Number(option.value));
        };

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
                    value: pageSize,
                    hidden: args.hidden,
                    options: [10, 20, 50, 100],
                    onChange: handlePageSizeChange,
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
        const [page, setPage] = useState(1);

        return (
            <Pagination
                paginationNavigationProps={{ currentPage: page, totalPages: 10, onCurrentPageChange: setPage }}
                paginationSelectProps={{
                    paginationLabel: "Показать на странице:",
                    hidden: true,
                }}
            />
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
                    value: pageSize,
                    options: [10, 20, 50, 100],
                    onChange: handlePageSizeChange,
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

        const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
            setPageSize(Number(option.value));
        };

        return (
            <PaginationExtended>
                <PaginationNavigation
                    currentPage={page}
                    totalPages={totalPages}
                    boundaryCount={1}
                    siblingCount={1}
                    onCurrentPageChange={setPage}
                />
                <PaginationSelect
                    paginationLabel="Показать на странице:"
                    value={pageSize}
                    options={[10, 20, 50, 100]}
                    onChange={handlePageSizeChange}
                />
            </PaginationExtended>
        );
    },
};
