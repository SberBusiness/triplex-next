import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MasterTable } from "../MasterTable";
import { MasterTableContext } from "../MasterTableContext";
import { TableBasic } from "../TableBasic/TableBasic";
import { ITableBasicColumn } from "../TableBasic/types";
import { ColumnSettings } from "../TableBasicSettings/components/ColumnSettings";
import { ColumnSettingsSortableList } from "../TableBasicSettings/components/ColumnSettingsSortableList";
import { ColumnSettingsStaticList } from "../TableBasicSettings/components/ColumnSettingsStaticList";

const COLUMNS: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", width: 100 },
    { fieldKey: "status", label: "Статус", hidden: true },
];

const UPDATED_COLUMNS: ITableBasicColumn[] = [{ fieldKey: "amount", label: "Сумма" }, COLUMNS[0]];

const getRoot = () => screen.getByTestId("column-settings");

const renderColumnKeys = ({ columns }: { columns: ITableBasicColumn[] }) =>
    columns.map(({ fieldKey }) => fieldKey).join(", ");

describe("ColumnSettings", () => {
    it("renders static children", () => {
        render(
            <ColumnSettings>
                <span>Настройки колонок</span>
            </ColumnSettings>,
        );

        expect(screen.getByText("Настройки колонок")).toBeInTheDocument();
    });

    it("passes all context columns to children, including hidden columns", () => {
        const children = vi.fn(renderColumnKeys);
        const setColumns = vi.fn();
        render(
            <MasterTableContext.Provider value={{ columns: COLUMNS, loading: false, setColumns }}>
                <ColumnSettings data-testid="column-settings">{children}</ColumnSettings>
            </MasterTableContext.Provider>,
        );

        expect(children).toHaveBeenLastCalledWith({ columns: COLUMNS });
        expect(getRoot()).toHaveTextContent("number, status");
        expect(setColumns).not.toHaveBeenCalled();
    });

    it("updates children when columns change in context", () => {
        const children = vi.fn(renderColumnKeys);
        const setColumns = vi.fn();
        const ui = (columns: ITableBasicColumn[]) => (
            <MasterTableContext.Provider value={{ columns, loading: false, setColumns }}>
                <ColumnSettings data-testid="column-settings">{children}</ColumnSettings>
            </MasterTableContext.Provider>
        );
        const { rerender } = render(ui(COLUMNS));

        rerender(ui(UPDATED_COLUMNS));

        expect(children).toHaveBeenLastCalledWith({ columns: UPDATED_COLUMNS });
        expect(getRoot()).toHaveTextContent("amount, number");
    });

    it("passes an empty columns array outside MasterTable", () => {
        const children = vi.fn(renderColumnKeys);

        render(<ColumnSettings data-testid="column-settings">{children}</ColumnSettings>);

        expect(children).toHaveBeenCalledWith({ columns: [] });
        expect(getRoot()).toBeEmptyDOMElement();
    });

    it("reads columns published by TableBasic within the same MasterTable", () => {
        const ui = (columns: ITableBasicColumn[]) => (
            <MasterTable>
                <ColumnSettings data-testid="column-settings">{renderColumnKeys}</ColumnSettings>
                <TableBasic columns={columns} data={[]} renderNoData={() => <span>Нет данных</span>} />
            </MasterTable>
        );
        const { rerender } = render(ui(COLUMNS));

        expect(getRoot()).toHaveTextContent("number, status");

        rerender(ui(UPDATED_COLUMNS));

        expect(getRoot()).toHaveTextContent("amount, number");
    });

    it("forwards an object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<ColumnSettings data-testid="column-settings" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("forwards a callback ref to the root div", () => {
        const ref = vi.fn();

        render(<ColumnSettings data-testid="column-settings" ref={ref} />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("forwards className, HTML attributes and click events to the root div", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <ColumnSettings
                data-testid="column-settings"
                className="custom-settings"
                id="settings"
                aria-label="Настройки"
                onClick={onClick}
            />,
        );

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("custom-settings");
        expect(root).toHaveAttribute("id", "settings");
        expect(root).toHaveAttribute("aria-label", "Настройки");

        await user.click(root);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", target: root }));
    });

    it("preserves the compound components", () => {
        expect(ColumnSettings.SortableList).toBe(ColumnSettingsSortableList);
        expect(ColumnSettings.StaticList).toBe(ColumnSettingsStaticList);
    });
});
