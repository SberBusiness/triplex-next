import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MasterTable } from "../../MasterTable";
import { MasterTableContext } from "../../MasterTableContext";
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

    it("Should forward ref to the table element", () => {
        const ref = React.createRef<HTMLTableElement>();
        render(
            <MasterTable>
                <TableBasic ref={ref} columns={buildColumns()} data={buildRows(1)} renderNoData={() => <div />} />
            </MasterTable>,
        );

        expect(ref.current).toBeInstanceOf(HTMLTableElement);
    });

    it("Should pass className and rest html attributes to the table element", () => {
        const { container } = render(
            <MasterTable>
                <TableBasic
                    className="custom-table"
                    id="payments"
                    aria-label="Платежи"
                    columns={buildColumns()}
                    data={buildRows(1)}
                    renderNoData={() => <div />}
                />
            </MasterTable>,
        );

        const table = container.querySelector("table");
        expect(table).toHaveClass("custom-table");
        expect(table).toHaveAttribute("id", "payments");
        expect(table).toHaveAttribute("aria-label", "Платежи");
    });

    it("Should not render header when headless is set", () => {
        const { container } = render(
            <MasterTable>
                <TableBasic headless columns={buildColumns()} data={buildRows(1)} renderNoData={() => <div />} />
            </MasterTable>,
        );

        expect(container.querySelector("thead")).toBeNull();
        expect(container.querySelector("tbody")).toBeInTheDocument();
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

    it("Should still render the table when all columns are hidden but renderNoColumns is not passed", () => {
        const columns: ITableBasicColumn[] = [
            { fieldKey: "id", label: "ID", hidden: true },
            { fieldKey: "name", label: "Название", hidden: true },
        ];
        const { container } = render(
            <MasterTable>
                <TableBasic columns={columns} data={buildRows(1)} renderNoData={() => <div />} />
            </MasterTable>,
        );

        expect(container.querySelector("table")).toBeInTheDocument();
        // Все колонки скрыты, поэтому ни одной ячейки в шапке и теле нет.
        expect(container.querySelectorAll("th").length).toBe(0);
        expect(container.querySelectorAll("td").length).toBe(0);
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

    it("Should render overlay and spinner when loading and empty", () => {
        const columns = buildColumns();
        const { container } = render(
            <MasterTable loading>
                <TableBasic columns={columns} data={[]} renderNoData={() => <div data-testid="empty" />} />
            </MasterTable>,
        );
        expect(container.querySelector(".overlayCover")).toBeInTheDocument();
        // LoaderMiddle inside footer
        expect(screen.getByRole("status", { name: "loading" })).toBeInTheDocument();
        // Заглушка renderNoData во время загрузки не показывается.
        expect(screen.queryByTestId("empty")).toBeNull();
    });

    it("Should render spinner wrapper when loading and has data", () => {
        const columns = buildColumns();
        const data = buildRows(1);
        const { container } = render(
            <MasterTable loading>
                <TableBasic columns={columns} data={data} renderNoData={() => <div />} />
            </MasterTable>,
        );
        expect(container.querySelector(".spinnerWrapper")).toBeInTheDocument();
        expect(container.querySelector(".overlayCover")).toBeNull();
    });

    it("Should not render any footer when there is data and no loading", () => {
        const { container } = render(
            <MasterTable>
                <TableBasic columns={buildColumns()} data={buildRows(1)} renderNoData={() => <div />} />
            </MasterTable>,
        );

        expect(container.querySelector(".footerEmptyData")).toBeNull();
        expect(container.querySelector(".spinnerWrapper")).toBeNull();
    });

    it("Should publish columns into MasterTable context", () => {
        const ColumnsProbe = () => {
            const { columns } = useContext(MasterTableContext);

            return <div data-testid="context-columns">{columns.map((column) => column.fieldKey).join(",")}</div>;
        };

        render(
            <MasterTable>
                <TableBasic columns={buildColumns()} data={buildRows(1)} renderNoData={() => <div />} />
                <ColumnsProbe />
            </MasterTable>,
        );

        expect(screen.getByTestId("context-columns")).toHaveTextContent("id,name");
    });
});
