import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Pagination, PaginationExtended, PaginationNavigation, PaginationSelect } from "../src/components/Pagination";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

const meta: Meta<typeof Pagination> = {
    title: "Components/Pagination",
    component: Pagination,
    parameters: {
        docs: {
            description: {
                component: "Компонент Pagination:",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
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
    hidden?: boolean;
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

        const totalPages = args.totalPages && args.totalPages <= 200 ? args.totalPages : 200;

        useEffect(() => {
            if (page > totalPages) {
                setPage(1);
            }
        }, [page, totalPages]);

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
            description: {
                story: "Интерактивная демонстрация Pagination с controls: текущая страница, общее количество страниц, boundary/sibling и отображение селекта.",
            },
        },
        controls: {
            include: ["currentPage", "totalPages", "boundaryCount", "siblingCount", "hidden", "paginationLabel"],
        },
    },
};

export const Default: Story = {
    name: "Default",
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
                    value: 10,
                    options: [10, 20, 50, 100],
                    onChange: () => {},
                }}
            />
        );
    },
};

export const WithBoundariesAndSiblings: Story = {
    parameters: {
        controls: { disable: true },
    },
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
    parameters: {
        controls: { disable: true },
    },
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
    parameters: {
        controls: { disable: true },
    },
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
    parameters: {
        controls: { disable: true },
    },
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

export const WithoutPaginationSelect: Story = {
    name: "Without Pagination Select",
    render: () => {
        const [page, setPage] = useState(1);
        const totalPages = 10;

        return (
            <Pagination
                paginationNavigationProps={{
                    currentPage: page,
                    totalPages,
                    onCurrentPageChange: setPage,
                }}
                paginationSelectProps={{
                    paginationLabel: "Показать на странице:",
                    hidden: true,
                }}
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Пример использования Pagination без селекта количества элементов. Навигация работает, селект скрыт с помощью props hidden.",
            },
        },
        controls: { disable: true },
    },
};

export const Extended: Story = {
    name: "Extended (container only)",
    parameters: {
        controls: { disable: true },
    },
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
