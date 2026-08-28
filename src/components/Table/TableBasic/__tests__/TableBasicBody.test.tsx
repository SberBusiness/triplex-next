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
    const data: ITableBasicRow[] = [
        { rowKey: "1", rowData: { id: 1, name: "A" } },
        { rowKey: "2", rowData: { id: 2, name: "B" } },
    ];

    const renderBody = (props: Partial<React.ComponentProps<typeof TableBasicBody>> = {}) =>
        render(
            <table>
                <TableBasicBody columns={columns} data={data} {...props} />
            </table>,
        );

    it("Should not render when data is empty", () => {
        const { container } = renderBody({ data: [] });
        expect(container.querySelector("tbody")).toBeNull();
    });

    it("Should render rows and pass onClickRow", () => {
        const onClickRow = vi.fn();
        const { container } = renderBody({ onClickRow });
        const trs = container.querySelectorAll("tbody tr");
        expect(trs.length).toBe(2);
        (trs[0] as HTMLElement).click();
        expect(onClickRow).toHaveBeenCalledWith("1");
    });

    it("Should not mark rows as clickable or hoverable by default", () => {
        const { container } = renderBody();
        const tbody = container.querySelector("tbody") as HTMLElement;

        expect(tbody).not.toHaveClass("clickable");
        expect(tbody).not.toHaveClass("hoverable");
    });

    it("Should mark rows as hoverable when highlightRowOnHover is set", () => {
        const { container } = renderBody({ highlightRowOnHover: true });
        const tbody = container.querySelector("tbody") as HTMLElement;

        expect(tbody).toHaveClass("hoverable");
        expect(tbody).not.toHaveClass("clickable");
    });

    it("Should mark rows as clickable and hoverable when onClickRow is set", () => {
        const { container } = renderBody({ onClickRow: vi.fn() });
        const tbody = container.querySelector("tbody") as HTMLElement;

        expect(tbody).toHaveClass("clickable");
        expect(tbody).toHaveClass("hoverable");
    });
});
