import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Pagination, PaginationExtended, PaginationNavigation, PaginationSelect } from "../src/components/Pagination";

const meta: Meta<typeof Pagination> = {
    title: "Components/Pagination",
    parameters: {
        docs: {
            description: {
                component: "Компонент Pagination:",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

interface IPaginationPlaygroundProps {
    currentPage?: number;
    totalPages?: number;
    boundaryCount?: number;
    siblingCount?: number;
    showSelect?: boolean;
    paginationLabel?: string;
    className?: string;
}

export const Playground: StoryObj<IPaginationPlaygroundProps> = {
    render: (args) => {
        const [page, setPage] = useState(args.currentPage ?? 1);
        const [pageSize, setPageSize] = useState(10);

        useEffect(() => {
            setPage(args.currentPage ?? 1);
        }, [args.currentPage]);

        useEffect(() => {
            setPageSize(args.totalPages ?? 10);
        }, [args.totalPages]);

        const totalItems = 200;
        const computedTotalPages = Math.max(1, Math.ceil(totalItems / pageSize));

        useEffect(() => {
            if (page > computedTotalPages) {
                setPage(computedTotalPages);
            }
        }, [page, pageSize, computedTotalPages]);

        return (
            <Pagination
                className={args.className}
                paginationNavigationProps={{
                    currentPage: page,
                    totalPages: computedTotalPages,
                    boundaryCount: args.boundaryCount ?? 0,
                    siblingCount: args.siblingCount ?? 0,
                    onCurrentPageChange: setPage,
                }}
                paginationSelectProps={{
                    paginationLabel: args.paginationLabel ?? "Показать на странице:",
                    value: pageSize,
                    hidden: args.showSelect,
                    options: [10, 20, 50, 100],
                    onChange: setPageSize,
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
        showSelect: {
            control: { type: "boolean" },
            description: "Показывать селект количества элементов",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
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
        boundaryCount: 0,
        siblingCount: 0,
        showSelect: true,
        paginationLabel: "Показать на странице:",
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация Pagination с controls: текущая страница, общее количество страниц, boundary/sibling и отображение селекта.",
            },
        },
    },
};

export const Default: Story = {
    render: () => {
        const [page, setPage] = useState(1);

        return (
            <Pagination
                paginationNavigationProps={{ currentPage: page, totalPages: 10, onCurrentPageChange: setPage }}
                paginationSelectProps={{
                    paginationLabel: "Показать на странице:",
                    value: 10,
                    options: [10, 20, 50, 100],
                    onChange: () => {},
                }}
            />
        );
    },
};

export const WithBoundariesAndSiblings: Story = {
    render: () => {
        const [page, setPage] = useState(5);

        return (
            <Pagination
                paginationNavigationProps={{
                    currentPage: page,
                    totalPages: 20,
                    boundaryCount: 1,
                    siblingCount: 2,
                    onCurrentPageChange: setPage,
                }}
                paginationSelectProps={{
                    paginationLabel: "Показать на странице:",
                    value: 10,
                    options: [10, 20, 50, 100],
                    onChange: () => {},
                }}
            />
        );
    },
};

export const ManyPages: Story = {
    render: () => {
        const [page, setPage] = useState(50);

        return (
            <Pagination
                paginationNavigationProps={{
                    currentPage: page,
                    totalPages: 100,
                    boundaryCount: 2,
                    siblingCount: 1,
                    onCurrentPageChange: setPage,
                }}
                paginationSelectProps={{
                    paginationLabel: "Показать на странице:",
                    value: 10,
                    options: [10, 20, 50, 100],
                    onChange: () => {},
                }}
            />
        );
    },
};

export const WithSelect: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);
        const totalItems = 150;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

        return (
            <Pagination
                paginationNavigationProps={{ currentPage: page, totalPages, onCurrentPageChange: setPage }}
                paginationSelectProps={{
                    paginationLabel: "Показать на странице:",
                    value: pageSize,
                    options: [10, 20, 50, 100],
                    onChange: setPageSize,
                }}
            />
        );
    },
};

export const FullExample: Story = {
    render: () => {
        const [page, setPage] = useState(7);
        const [pageSize, setPageSize] = useState(10);
        const totalItems = 300;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

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
                    onChange: setPageSize,
                }}
            />
        );
    },
};

export const Extended: Story = {
    name: "Extended (container only)",
    render: () => {
        const [page, setPage] = useState(1);

        return (
            <PaginationExtended>
                <PaginationNavigation currentPage={page} totalPages={10} onCurrentPageChange={setPage} />
                <PaginationSelect
                    paginationLabel="Показать на странице:"
                    value={10}
                    options={[10, 20, 50, 100]}
                    onChange={() => {}}
                />
            </PaginationExtended>
        );
    },
};
