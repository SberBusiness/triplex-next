import React from "react";
import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { IListSortableProps } from "../../List/ListSortable";
import { ColumnSettings } from "../TableBasicSettings/components/ColumnSettings";
import { ColumnSettingsSortableListItem } from "../TableBasicSettings/components/ColumnSettingsSortableListItem";
import { ITableBasicColumn, ITableBasicExtendedColumn } from "../TableBasic/types";

const { captureListProps } = vi.hoisted(() => ({
    captureListProps: vi.fn<(props: IListSortableProps<ITableBasicExtendedColumn>) => void>(),
}));

// Проверяем адаптер колонок на границе ListSortable, сохраняя настоящий List для DOM и ref.
vi.mock("../../List/ListSortable", async () => {
    const React = await import("react");
    const { List } = await import("../../List/List");

    return {
        ListSortable: React.forwardRef<HTMLUListElement, IListSortableProps<ITableBasicExtendedColumn>>(
            function ListSortableBoundary({ items, onItemsChange, ...props }, ref) {
                captureListProps({ items, onItemsChange, ...props });
                return <List {...props} ref={ref} />;
            },
        ),
    };
});

const getColumns = (): ITableBasicColumn[] => [
    {
        fieldKey: "amount",
        label: <span>Сумма</span>,
        title: "Сумма платежа",
        width: 0,
        hidden: false,
        renderCell: (value: unknown) => String(value),
        dataAttributes: { "column-id": "amount" },
        ariaAttributes: { label: "Сумма" },
    },
    { fieldKey: "status", label: "Статус", hidden: true, width: "30%" },
];

const getListProps = () => captureListProps.mock.calls[captureListProps.mock.calls.length - 1][0];

describe("ColumnSettings.SortableList", () => {
    beforeEach(() => {
        captureListProps.mockClear();
    });

    it("adds fieldKey as sortable id without changing the input columns", () => {
        const columns = getColumns();
        columns.forEach(Object.freeze);
        Object.freeze(columns);

        render(<ColumnSettings.SortableList columns={columns} onColumnsChange={vi.fn()} />);

        expect(getListProps().items).toEqual([
            { id: "amount", ...columns[0] },
            { id: "status", ...columns[1] },
        ]);
        expect(getListProps().items[0]).not.toBe(columns[0]);
        expect(columns[0]).not.toHaveProperty("id");
        expect(columns[1]).not.toHaveProperty("id");
    });

    it("returns the full reordered columns without sortable ids or input mutation", () => {
        const columns = getColumns();
        const onColumnsChange = vi.fn();
        render(<ColumnSettings.SortableList columns={columns} onColumnsChange={onColumnsChange} />);

        const items = getListProps().items;
        const reorderedItems = [items[1], items[0]];
        reorderedItems.forEach(Object.freeze);
        Object.freeze(reorderedItems);

        getListProps().onItemsChange(reorderedItems);

        expect(onColumnsChange).toHaveBeenCalledTimes(1);
        expect(onColumnsChange).toHaveBeenCalledWith([columns[1], columns[0]]);
        expect(reorderedItems[0]).toHaveProperty("id", "status");
        expect(reorderedItems[1]).toHaveProperty("id", "amount");
    });

    it("accepts and returns an empty columns array", () => {
        const onColumnsChange = vi.fn();
        render(<ColumnSettings.SortableList columns={[]} onColumnsChange={onColumnsChange} />);

        expect(getListProps().items).toEqual([]);
        expect(screen.getByRole("list")).toBeEmptyDOMElement();

        getListProps().onItemsChange([]);

        expect(onColumnsChange).toHaveBeenCalledTimes(1);
        expect(onColumnsChange).toHaveBeenCalledWith([]);
    });

    it("uses updated columns and the latest callback after rerender", () => {
        const onColumnsChange = vi.fn();
        const nextOnColumnsChange = vi.fn();
        const { rerender } = render(
            <ColumnSettings.SortableList columns={getColumns()} onColumnsChange={onColumnsChange} />,
        );
        const nextColumns: ITableBasicColumn[] = [{ fieldKey: "date", label: "Дата", hidden: false }];

        rerender(<ColumnSettings.SortableList columns={nextColumns} onColumnsChange={nextOnColumnsChange} />);

        expect(getListProps().items).toEqual([{ id: "date", ...nextColumns[0] }]);

        getListProps().onItemsChange(getListProps().items);

        expect(nextOnColumnsChange).toHaveBeenCalledTimes(1);
        expect(nextOnColumnsChange).toHaveBeenCalledWith(nextColumns);
        expect(onColumnsChange).not.toHaveBeenCalled();
    });

    it("forwards ref, className, HTML, ARIA, data attributes and children to the list", () => {
        const ref = React.createRef<HTMLUListElement>();
        render(
            <ColumnSettings.SortableList
                columns={getColumns()}
                onColumnsChange={vi.fn()}
                ref={ref}
                className="custom-sortable-list"
                id="column-settings-list"
                aria-label="Колонки"
                data-settings="columns"
            >
                <li>Сумма</li>
                <li>Статус</li>
            </ColumnSettings.SortableList>,
        );

        const list = screen.getByRole("list", { name: "Колонки" });
        expect(ref.current).toBeInstanceOf(HTMLUListElement);
        expect(ref.current).toBe(list);
        expect(list).toHaveClass("list", "custom-sortable-list");
        expect(list).toHaveAttribute("id", "column-settings-list");
        expect(list).toHaveAttribute("data-settings", "columns");
        expect(
            within(list)
                .getAllByRole("listitem")
                .map((item) => item.textContent),
        ).toEqual(["Сумма", "Статус"]);
    });

    it("keeps Item identity and displayName on the public composition", () => {
        expect(ColumnSettings.SortableList.Item).toBe(ColumnSettingsSortableListItem);
        expect(ColumnSettings.SortableList.displayName).toBe("ColumnSettingsSortableList");
    });
});
