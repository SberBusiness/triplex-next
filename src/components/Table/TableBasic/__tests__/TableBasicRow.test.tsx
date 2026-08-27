import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TableBasicRow } from "../components/TableBasicRow";
import { ITableBasicColumn, ITableBasicRow } from "../types";
import { ECellType, EHorizontalAlign, EVerticalAlign } from "../enums";

const renderRow = (columns: ITableBasicColumn[], data: ITableBasicRow, onClickRow?: (rowKey: string) => void) =>
    render(
        <table>
            <tbody>
                <TableBasicRow columns={columns} data={data} onClickRow={onClickRow} />
            </tbody>
        </table>,
    );

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
        const { container } = renderRow(columns, row);
        const tds = container.querySelectorAll("td");
        // Only two cells should render because "missing" key is not present
        expect(tds.length).toBe(2);
        expect(tds[0].textContent).toContain("1");
        expect(tds[1].textContent).toContain("Test");
    });

    it("Should not render hidden columns", () => {
        const { container } = renderRow(
            [
                { fieldKey: "id", label: "ID" },
                { fieldKey: "secret", label: "Скрытая", hidden: true },
            ],
            { rowKey: "1", rowData: { id: 1, secret: "прячем" } },
        );

        const tds = container.querySelectorAll("td");
        expect(tds.length).toBe(1);
        expect(tds[0].textContent).toContain("1");
    });

    it("Should render a placeholder for an empty cell value", () => {
        const { container } = renderRow([{ fieldKey: "name", label: "Название" }], {
            rowKey: "1",
            rowData: { name: "" },
        });

        expect(container.querySelector("td")).toHaveTextContent("---");
    });

    it("Should render cell value through renderCell", () => {
        const renderCell = vi.fn((value: string) => <b data-testid="custom">{value.toUpperCase()}</b>);
        const { container } = renderRow([{ fieldKey: "name", label: "Название", renderCell }], {
            rowKey: "1",
            rowData: { name: "иванов" },
        });

        expect(renderCell).toHaveBeenCalledWith("иванов");
        expect(container.querySelector("[data-testid='custom']")).toHaveTextContent("ИВАНОВ");
    });

    it.each([
        [ECellType.TEXT, "textType"],
        [ECellType.COMPONENTS, "componentsType"],
        [ECellType.CHECKBOX, "checkboxType"],
    ])("Should apply class for cellType %s", (cellType, expectedClassName) => {
        const { container } = renderRow([{ fieldKey: "name", label: "Название", cellType }], {
            rowKey: "1",
            rowData: { name: "Значение" },
        });

        expect(container.querySelector("td")).toHaveClass(expectedClassName);
    });

    it("Should default vertical align to baseline for TEXT and to top for other cell types", () => {
        const { container } = renderRow(
            [
                { fieldKey: "text", label: "Текст", cellType: ECellType.TEXT },
                { fieldKey: "components", label: "Компоненты", cellType: ECellType.COMPONENTS },
            ],
            { rowKey: "1", rowData: { text: "Значение", components: "Значение" } },
        );

        const tds = container.querySelectorAll("td");
        expect(tds[0]).toHaveClass("verticalAlignBaseline");
        expect(tds[1]).toHaveClass("verticalAlignTop");
    });

    it("Should apply explicit vertical and horizontal align", () => {
        const { container } = renderRow(
            [
                {
                    fieldKey: "sum",
                    label: "Сумма",
                    horizontalAlign: EHorizontalAlign.RIGHT,
                    verticalAlign: EVerticalAlign.MIDDLE,
                },
            ],
            { rowKey: "1", rowData: { sum: "100" } },
        );

        const td = container.querySelector("td") as HTMLTableCellElement;
        expect(td).toHaveClass("alignRight");
        expect(td).toHaveClass("verticalAlignMiddle");
    });

    it("Should apply width from the column to the cell", () => {
        const { container } = renderRow([{ fieldKey: "id", label: "ID", width: "80px" }], {
            rowKey: "1",
            rowData: { id: 1 },
        });

        expect((container.querySelector("td") as HTMLTableCellElement).style.width).toBe("80px");
    });

    it("Should apply rowSpan and colSpan from rowLayout", () => {
        const { container } = renderRow(
            [
                { fieldKey: "id", label: "ID" },
                { fieldKey: "name", label: "Название" },
            ],
            {
                rowKey: "1",
                rowData: { id: 1, name: "Test" },
                rowLayout: { id: { rowSpan: 2 }, name: { colSpan: 3 } },
            },
        );

        const tds = container.querySelectorAll("td");
        expect(tds[0]).toHaveAttribute("rowspan", "2");
        expect(tds[1]).toHaveAttribute("colspan", "3");
    });

    it("Should mark the row as selected", () => {
        const { container } = renderRow([{ fieldKey: "id", label: "ID" }], {
            rowKey: "1",
            rowData: { id: 1 },
            selected: true,
        });

        expect(container.querySelector("tr")).toHaveClass("selected");
    });

    it("Should call onClickRow with the rowKey", () => {
        const onClickRow = vi.fn();
        const { container } = renderRow(
            [{ fieldKey: "id", label: "ID" }],
            { rowKey: "row-42", rowData: { id: 42 } },
            onClickRow,
        );

        (container.querySelector("tr") as HTMLElement).click();

        expect(onClickRow).toHaveBeenCalledWith("row-42");
    });

    it("Should apply aria and data attributes and build cell data-test-id", () => {
        const { container } = renderRow([{ fieldKey: "id", label: "ID" }], {
            rowKey: "1",
            rowData: { id: 1 },
            // Ключи передаются без префиксов — их добавляют getAriaHTMLAttributes / getDataHTMLAttributes.
            ariaAttributes: { label: "Строка платежа" },
            dataAttributes: { "test-id": "payment-row" },
        });

        const tr = container.querySelector("tr") as HTMLElement;
        expect(tr).toHaveAttribute("aria-label", "Строка платежа");
        expect(tr).toHaveAttribute("data-test-id", "payment-row");
        expect(container.querySelector("td")).toHaveAttribute("data-test-id", "payment-row__id__td");
    });
});
