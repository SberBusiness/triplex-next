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

    it("Should render overlay and spinner when loading and empty", () => {
        const columns = buildColumns();
        const { container } = render(
            <MasterTable loading>
                <TableBasic columns={columns} data={[]} renderNoData={() => <div />} />
            </MasterTable>,
        );
        expect(container.querySelector(".overlayCover")).toBeInTheDocument();
        // LoaderMiddle inside footer
        expect(container.querySelector("[class*='loaderMiddle']")).toBeInTheDocument();
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
    });
});
