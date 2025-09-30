import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TableBasicBody } from "../components/TableBasicBody";
import { ITableBasicColumn, ITableBasicRow } from "../types";

describe("TableBasicBody", () => {
    const columns: ITableBasicColumn[] = [
        { fieldKey: "id", label: "ID" },
        { fieldKey: "name", label: "Название" },
    ];

    it("Should not render when data is empty", () => {
        const { container } = render(
            <table>
                <TableBasicBody columns={columns} data={[]} />
            </table>,
        );
        expect(container.querySelector("tbody")).toBeNull();
    });

    it("Should render rows and pass onClickRow", () => {
        const data: ITableBasicRow[] = [
            { rowKey: "1", rowData: { id: 1, name: "A" } },
            { rowKey: "2", rowData: { id: 2, name: "B" } },
        ];
        const onClickRow = vi.fn();
        const { container } = render(
            <table>
                <TableBasicBody columns={columns} data={data} onClickRow={onClickRow} />
            </table>,
        );
        const trs = container.querySelectorAll("tbody tr");
        expect(trs.length).toBe(2);
        (trs[0] as HTMLElement).click();
        expect(onClickRow).toHaveBeenCalledWith("1");
    });
});
