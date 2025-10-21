import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TableBasicRow } from "../components/TableBasicRow";
import { ITableBasicColumn, ITableBasicRow } from "../types";

describe("TableBasicRow", () => {
    const columns: ITableBasicColumn[] = [
        { fieldKey: "id", label: "ID" },
        { fieldKey: "name", label: "Название" },
        { fieldKey: "missing", label: "Нет в данных" },
    ];

    it("Should render only cells present in rowData and preserve order", () => {
        const row: ITableBasicRow = {
            rowKey: "1",
            rowData: { id: 1, name: "Test" },
        };
        const { container } = render(
            <table>
                <tbody>
                    <TableBasicRow columns={columns} data={row} />
                </tbody>
            </table>,
        );
        const tds = container.querySelectorAll("td");
        // Only two cells should render because "missing" key is not present
        expect(tds.length).toBe(2);
        expect(tds[0].textContent).toContain("1");
        expect(tds[1].textContent).toContain("Test");
    });
});
