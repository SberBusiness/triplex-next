import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MasterTable } from "../MasterTable";
import { IMasterTableContextContext, MasterTableContext } from "../MasterTableContext";
import { NoColumns } from "../NoColumns";
import { FilterPanel } from "../FilterPanel";
import { ChipPanel } from "../ChipPanel";
import { PaginationPanel } from "../PaginationPanel";
import { TableBasic } from "../TableBasic/TableBasic";
import { TableBasicSettings } from "../TableBasicSettings/TableBasicSettings";
import { TableFooter } from "../TableFooter/TableFooter";
import { ITableBasicColumn } from "../TableBasic/types";

const getRoot = () => screen.getByTestId("master-table");

/** Колонки, которые тестовый потребитель кладёт в контекст. */
const COLUMNS: ITableBasicColumn[] = [
    { fieldKey: "docNumber", label: "Номер" },
    { fieldKey: "sum", label: "Сумма" },
];

/** Потребитель контекста: показывает его содержимое и умеет записать в него колонки. */
const ContextProbe = () => {
    const { columns, loading, setColumns } = useContext(MasterTableContext);

    return (
        <div>
            <span data-testid="loading">{String(loading)}</span>
            <span data-testid="columns">{columns.map((column) => column.fieldKey).join(",")}</span>
            <button type="button" onClick={() => setColumns(COLUMNS)}>
                Установить колонки
            </button>
        </div>
    );
};

describe("MasterTable", () => {
    describe("Рендер и проброс props", () => {
        it("Should render children inside the root element", () => {
            render(<MasterTable data-testid="master-table">Содержимое</MasterTable>);

            expect(getRoot()).toBeInTheDocument();
            expect(screen.getByText("Содержимое")).toBeInTheDocument();
        });

        it("Should render root as div with own class", () => {
            render(<MasterTable data-testid="master-table" />);

            const root = getRoot();
            expect(root.tagName).toBe("DIV");
            expect(root).toHaveClass("masterTable");
        });

        it("Should merge custom className with own class", () => {
            render(<MasterTable className="custom-class" data-testid="master-table" />);

            const root = getRoot();
            expect(root).toHaveClass("masterTable");
            expect(root).toHaveClass("custom-class");
        });

        it("Should spread rest props on the root element", () => {
            render(<MasterTable id="master-table-id" role="region" aria-label="Таблица" data-testid="master-table" />);

            const root = getRoot();
            expect(root).toHaveAttribute("id", "master-table-id");
            expect(root).toHaveAttribute("role", "region");
            expect(root).toHaveAttribute("aria-label", "Таблица");
        });

        it("Should set data-tx attribute and not let rest props override it", () => {
            render(<MasterTable data-testid="master-table" data-tx="overridden" />);

            const root = getRoot();
            expect(root).not.toHaveAttribute("data-tx", "overridden");
            expect(root).toHaveAttribute("data-tx", process.env.npm_package_version);
        });

        it("Should not render loading prop as DOM attribute", () => {
            render(<MasterTable loading data-testid="master-table" />);

            expect(getRoot()).not.toHaveAttribute("loading");
        });

        it("Should forward object ref to the root div", () => {
            const ref = React.createRef<HTMLDivElement>();

            render(<MasterTable ref={ref} data-testid="master-table" />);

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toBe(getRoot());
        });

        it("Should forward callback ref to the root div", () => {
            const ref = vi.fn();

            render(<MasterTable ref={ref} data-testid="master-table" />);

            expect(ref).toHaveBeenCalledWith(getRoot());
        });
    });

    describe("Контекст", () => {
        it("Should provide loading false by default", () => {
            render(
                <MasterTable data-testid="master-table">
                    <ContextProbe />
                </MasterTable>,
            );

            expect(screen.getByTestId("loading")).toHaveTextContent("false");
        });

        it("Should provide loading from props", () => {
            render(
                <MasterTable loading data-testid="master-table">
                    <ContextProbe />
                </MasterTable>,
            );

            expect(screen.getByTestId("loading")).toHaveTextContent("true");
        });

        it("Should provide empty columns before any child sets them", () => {
            render(
                <MasterTable data-testid="master-table">
                    <ContextProbe />
                </MasterTable>,
            );

            expect(screen.getByTestId("columns")).toHaveTextContent("");
        });

        it("Should share columns set through setColumns with context consumers", async () => {
            const user = userEvent.setup();

            render(
                <MasterTable data-testid="master-table">
                    <ContextProbe />
                </MasterTable>,
            );

            await user.click(screen.getByRole("button", { name: "Установить колонки" }));

            expect(screen.getByTestId("columns")).toHaveTextContent("docNumber,sum");
        });

        it("Should fill context columns from MasterTable.TableBasic", async () => {
            render(
                <MasterTable data-testid="master-table">
                    <MasterTable.TableBasic columns={COLUMNS} data={[]} renderNoData={() => <div>Нет данных</div>} />
                    <ContextProbe />
                </MasterTable>,
            );

            expect(await screen.findByTestId("columns")).toHaveTextContent("docNumber,sum");
        });

        it("Should keep context value referentially stable between re-renders", () => {
            const values: IMasterTableContextContext[] = [];
            const ContextValueProbe = () => {
                values.push(useContext(MasterTableContext));

                return null;
            };

            const { rerender } = render(
                <MasterTable data-testid="master-table">
                    <ContextValueProbe />
                </MasterTable>,
            );
            rerender(
                <MasterTable data-testid="master-table">
                    <ContextValueProbe />
                </MasterTable>,
            );

            expect(values[1]).toBe(values[0]);
        });
    });

    describe("Составной компонент", () => {
        it.each([
            ["NoColumns", MasterTable.NoColumns, NoColumns],
            ["FilterPanel", MasterTable.FilterPanel, FilterPanel],
            ["ChipPanel", MasterTable.ChipPanel, ChipPanel],
            ["TableBasic", MasterTable.TableBasic, TableBasic],
            ["TableBasicSettings", MasterTable.TableBasicSettings, TableBasicSettings],
            ["TableFooter", MasterTable.TableFooter, TableFooter],
            ["PaginationPanel", MasterTable.PaginationPanel, PaginationPanel],
        ])("Should expose %s as static subcomponent", (_name, staticSubcomponent, expected) => {
            expect(staticSubcomponent).toBe(expected);
        });

        it("Should render composed structure", () => {
            render(
                <MasterTable data-testid="master-table">
                    <MasterTable.FilterPanel data-testid="filter-panel">Фильтры</MasterTable.FilterPanel>
                    <MasterTable.ChipPanel data-testid="chip-panel">
                        <MasterTable.ChipPanel.Links data-testid="chip-panel-links">Ссылки</MasterTable.ChipPanel.Links>
                    </MasterTable.ChipPanel>
                    <MasterTable.TableFooter data-testid="table-footer">Подвал</MasterTable.TableFooter>
                    <MasterTable.PaginationPanel data-testid="pagination-panel">Пагинация</MasterTable.PaginationPanel>
                </MasterTable>,
            );

            expect(screen.getByTestId("filter-panel")).toHaveClass("filterPanel");
            expect(screen.getByTestId("chip-panel")).toHaveClass("chipPanel");
            expect(screen.getByTestId("chip-panel-links")).toHaveClass("chipPanelLinks");
            expect(screen.getByTestId("table-footer")).toHaveClass("tableFooterWrapper");
            expect(screen.getByTestId("pagination-panel")).toHaveClass("paginationPanel");
        });

        it("Should set displayName", () => {
            expect(MasterTable.displayName).toBe("MasterTable");
        });
    });
});
