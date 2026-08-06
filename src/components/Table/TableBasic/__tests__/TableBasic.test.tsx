import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MasterTable } from "../../MasterTable";
import { TableBasic } from "../TableBasic";
import { ITableBasicColumn, ITableBasicRow } from "../types";

const buildColumns = (): ITableBasicColumn[] => [
    { fieldKey: "id", label: "ID", title: "ID", width: 80 },
    { fieldKey: "name", label: "Название", title: "Название", width: 200 },
];

const buildRows = (count = 3): ITableBasicRow[] =>
    Array.from({ length: count }).map((_, i) => ({
        rowKey: String(i + 1),
        rowData: { id: i + 1, name: `Элемент ${i + 1}` },
    }));

describe("TableBasic", () => {
    it("Should render table with header and body", () => {
        const columns = buildColumns();
        const data = buildRows(2);
        const { container } = render(
            <MasterTable>
                <TableBasic columns={columns} data={data} renderNoData={() => <div data-testid="no-data" />} />
            </MasterTable>,
        );

        expect(container.querySelector("table")).toBeInTheDocument();
        expect(container.querySelector("thead")).toBeInTheDocument();
        const tbody = container.querySelector("tbody");
        expect(tbody).toBeInTheDocument();
        expect(tbody?.querySelectorAll("tr").length).toBe(2);
    });

    it("Should render renderNoColumns when all columns are hidden", () => {
        const columns: ITableBasicColumn[] = [
            { fieldKey: "id", label: "ID", hidden: true },
            { fieldKey: "name", label: "Название", hidden: true },
        ];
        render(
            <MasterTable>
                <TableBasic
                    columns={columns}
                    data={[]}
                    renderNoData={() => <div />}
                    renderNoColumns={() => <div data-testid="no-cols">Нет колонок</div>}
                />
            </MasterTable>,
        );
        expect(screen.getByTestId("no-cols")).toBeInTheDocument();
    });

    it("Should render no-data footer when empty and not loading", () => {
        const columns = buildColumns();
        render(
            <MasterTable>
                <TableBasic
                    columns={columns}
                    data={[]}
                    renderNoData={() => <div data-testid="empty">Нет данных</div>}
                />
            </MasterTable>,
        );
        expect(screen.getByTestId("empty")).toBeInTheDocument();
    });

    it("Should render loader instead of no-data footer when loading and empty", () => {
        const columns = buildColumns();
        const { container } = render(
            <MasterTable>
                <MasterTable.Content loading>
                    <TableBasic columns={columns} data={[]} renderNoData={() => <div data-testid="empty" />} />
                </MasterTable.Content>
            </MasterTable>,
        );
        expect(screen.queryByTestId("empty")).not.toBeInTheDocument();
        expect(container.querySelector("[class*='loaderMiddle']")).toBeInTheDocument();
    });

    it("Should render no-data footer after loading ends with empty data", () => {
        const columns = buildColumns();
        const renderContent = (loading: boolean) => (
            <MasterTable>
                <MasterTable.Content loading={loading}>
                    <TableBasic columns={columns} data={[]} renderNoData={() => <div data-testid="empty" />} />
                </MasterTable.Content>
            </MasterTable>
        );
        const { container, rerender } = render(renderContent(true));

        expect(screen.queryByTestId("empty")).not.toBeInTheDocument();

        rerender(renderContent(false));

        // Лоадер снят, и на его месте появляется заглушка "нет данных".
        expect(container.querySelector("[class*='loaderScreen']")).not.toBeInTheDocument();
        expect(screen.getByTestId("empty")).toBeInTheDocument();
    });

    it("Should cover table and pagination, but not panels outside the content, when loading", () => {
        const columns = buildColumns();
        const { container } = render(
            <MasterTable>
                <MasterTable.FilterPanel>
                    <div data-testid="filter" />
                </MasterTable.FilterPanel>
                <MasterTable.Content loading>
                    <TableBasic columns={columns} data={buildRows(1)} renderNoData={() => <div />} />
                    <MasterTable.PaginationPanel>
                        <div data-testid="pagination" />
                    </MasterTable.PaginationPanel>
                </MasterTable.Content>
            </MasterTable>,
        );

        const content = container.querySelector("[class*='masterTableContent']");

        // Оверлей лежит в одном контейнере с таблицей и пагинацией, поэтому перекрывает их.
        expect(content).toContainElement(container.querySelector("[class*='loaderScreen']"));
        expect(content).toContainElement(container.querySelector("table"));
        expect(content).toContainElement(screen.getByTestId("pagination"));
        // Панель фильтров остаётся снаружи обёртки и не перекрывается.
        expect(content).not.toContainElement(screen.getByTestId("filter"));
    });

    it("Should not render loader when content is not loading", () => {
        const columns = buildColumns();
        const { container } = render(
            <MasterTable>
                <MasterTable.Content>
                    <TableBasic columns={columns} data={buildRows(1)} renderNoData={() => <div />} />
                </MasterTable.Content>
            </MasterTable>,
        );
        expect(container.querySelector("[class*='loaderScreen']")).not.toBeInTheDocument();
    });
});
