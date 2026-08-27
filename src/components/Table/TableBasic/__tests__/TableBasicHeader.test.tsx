import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TableBasicHeader } from "../components/TableBasicHeader";
import { ISortOrder, ITableBasicColumn } from "../types";
import { ECellType, EHorizontalAlign, EOrderDirection } from "../enums";

const renderHeader = (columns: ITableBasicColumn[], onOrderBy?: (order: ISortOrder) => void) =>
    render(
        <table>
            <TableBasicHeader columns={columns} onOrderBy={onOrderBy} />
        </table>,
    );

describe("TableBasicHeader", () => {
    it("Should render headers and handle order click", () => {
        const columns: ITableBasicColumn[] = [
            { fieldKey: "id", label: "ID", orderDirection: EOrderDirection.NONE },
            { fieldKey: "name", label: "Название", orderDirection: EOrderDirection.ASC },
        ];
        const onOrderBy = vi.fn();
        const { container } = renderHeader(columns, onOrderBy);

        const ths = container.querySelectorAll("th");
        expect(ths.length).toBe(2);

        // Нажимаем на первый столбец (NONE -> ASC)
        (ths[0].querySelector("span") as HTMLElement).click();
        expect(onOrderBy).toHaveBeenCalledWith({ fieldKey: "id", direction: EOrderDirection.ASC });
    });

    it.each([
        [EOrderDirection.NONE, EOrderDirection.ASC],
        [EOrderDirection.ASC, EOrderDirection.DESC],
        [EOrderDirection.DESC, EOrderDirection.NONE],
    ])("Should switch order direction %s -> %s on click", (current, next) => {
        const onOrderBy = vi.fn();
        const { container } = renderHeader([{ fieldKey: "sum", label: "Сумма", orderDirection: current }], onOrderBy);

        (container.querySelector("th span") as HTMLElement).click();

        expect(onOrderBy).toHaveBeenCalledWith({ fieldKey: "sum", direction: next });
    });

    it("Should not enable ordering when onOrderBy is not passed", () => {
        const { container } = renderHeader([{ fieldKey: "id", label: "ID", orderDirection: EOrderDirection.ASC }]);

        expect(container.querySelector(".order")).toBeNull();
        expect(container.querySelector(".orderButton")).toBeNull();
    });

    it("Should not enable ordering for a column without orderDirection", () => {
        const onOrderBy = vi.fn();
        const { container } = renderHeader([{ fieldKey: "id", label: "ID" }], onOrderBy);

        expect(container.querySelector(".order")).toBeNull();

        (container.querySelector("th span") as HTMLElement).click();
        expect(onOrderBy).not.toHaveBeenCalled();
    });

    it("Should mark order button as sorted only for ASC and DESC", () => {
        const onOrderBy = vi.fn();
        const { container } = renderHeader(
            [
                { fieldKey: "none", label: "Без сортировки", orderDirection: EOrderDirection.NONE },
                { fieldKey: "asc", label: "По возрастанию", orderDirection: EOrderDirection.ASC },
                { fieldKey: "desc", label: "По убыванию", orderDirection: EOrderDirection.DESC },
            ],
            onOrderBy,
        );

        const orderButtons = container.querySelectorAll(".orderButton");
        expect(orderButtons.length).toBe(3);
        expect(orderButtons[0]).not.toHaveClass("sorted");
        expect(orderButtons[1]).toHaveClass("sorted");
        expect(orderButtons[2]).toHaveClass("sorted");
    });

    it("Should put order button before the label for right-aligned columns", () => {
        const onOrderBy = vi.fn();
        const { container } = renderHeader(
            [
                {
                    fieldKey: "sum",
                    label: "Сумма",
                    horizontalAlign: EHorizontalAlign.RIGHT,
                    orderDirection: EOrderDirection.ASC,
                },
            ],
            onOrderBy,
        );

        const thBlock = container.querySelector(".thBlock") as HTMLElement;
        expect(thBlock.firstElementChild).toHaveClass("orderButton");
        // У правого выравнивания кнопка прижимается к левому краю заголовка.
        expect(container.querySelector(".orderButton")).toHaveClass("alignLeft");
    });

    it("Should not render hidden columns", () => {
        const { container } = renderHeader([
            { fieldKey: "id", label: "ID" },
            { fieldKey: "secret", label: "Скрытая", hidden: true },
        ]);

        const ths = container.querySelectorAll("th");
        expect(ths.length).toBe(1);
        expect(ths[0]).toHaveTextContent("ID");
    });

    it("Should apply horizontal align class and checkbox cell type class", () => {
        const { container } = renderHeader([
            { fieldKey: "check", label: "", cellType: ECellType.CHECKBOX },
            { fieldKey: "center", label: "Центр", horizontalAlign: EHorizontalAlign.CENTER },
            { fieldKey: "right", label: "Право", horizontalAlign: EHorizontalAlign.RIGHT },
            { fieldKey: "default", label: "По умолчанию" },
        ]);

        const ths = container.querySelectorAll("th");
        expect(ths[0]).toHaveClass("checkboxType");
        expect(ths[1]).toHaveClass("alignCenter");
        expect(ths[2]).toHaveClass("alignRight");
        expect(ths[3]).toHaveClass("alignLeft");
    });

    it("Should apply title and width to the th element", () => {
        const { container } = renderHeader([{ fieldKey: "id", label: "ID", title: "Идентификатор", width: "120px" }]);

        const th = container.querySelector("th") as HTMLTableCellElement;
        expect(th).toHaveAttribute("title", "Идентификатор");
        expect(th.style.width).toBe("120px");
        expect(th.style.minWidth).toBe("120px");
        expect(th.style.maxWidth).toBe("120px");
    });

    it("Should apply aria and data attributes of a column", () => {
        const { container } = renderHeader([
            {
                fieldKey: "id",
                label: "ID",
                // Ключи передаются без префиксов — их добавляют getAriaHTMLAttributes / getDataHTMLAttributes.
                ariaAttributes: { label: "Идентификатор" },
                dataAttributes: { "test-id": "id-column" },
            },
        ]);

        const thBlock = container.querySelector(".thBlock") as HTMLElement;
        expect(thBlock).toHaveAttribute("aria-label", "Идентификатор");
        expect(thBlock).toHaveAttribute("data-test-id", "id-column");
    });
});
