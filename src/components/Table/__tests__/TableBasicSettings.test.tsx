import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TableBasicSettings } from "../TableBasicSettings/TableBasicSettings";
import { TableBasicSettingsBody } from "../TableBasicSettings/components/TableBasicSettingsBody";
import { ColumnSettings } from "../TableBasicSettings/components/ColumnSettings";
import { TableBasicSettingsFooter } from "../TableBasicSettings/components/TableBasicSettingsFooter";
import { TableBasicSettingsHeader } from "../TableBasicSettings/components/TableBasicSettingsHeader";

const getRoot = () => screen.getByTestId("table-basic-settings");
const getTrigger = () => screen.getByRole("link", { name: "Настройки" });

describe("TableBasicSettings", () => {
    it("Should render the trigger link with own class on the root", () => {
        render(<TableBasicSettings linkTitle="Настройки" data-testid="table-basic-settings" />);

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("tableSettingsLink");
        expect(getTrigger()).toBeInTheDocument();
    });

    it("Should merge custom className with own class", () => {
        render(
            <TableBasicSettings linkTitle="Настройки" className="custom-class" data-testid="table-basic-settings" />,
        );

        expect(getRoot()).toHaveClass("tableSettingsLink");
        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props to the root div", () => {
        render(<TableBasicSettings linkTitle="Настройки" data-testid="table-basic-settings" id="settings" />);

        expect(getRoot()).toHaveAttribute("id", "settings");
    });

    it("Should mark the trigger as a listbox control", () => {
        render(<TableBasicSettings linkTitle="Настройки" data-testid="table-basic-settings" />);

        const trigger = getTrigger();
        expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
        expect(trigger).toHaveAttribute("aria-controls", "button-dropdown-extended-list");
        expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("Should open the dropdown on trigger click", async () => {
        const user = userEvent.setup();
        render(
            <TableBasicSettings linkTitle="Настройки" data-testid="table-basic-settings">
                Содержимое настроек
            </TableBasicSettings>,
        );

        await user.click(getTrigger());

        expect(getTrigger()).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByText("Содержимое настроек")).toBeInTheDocument();
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<TableBasicSettings linkTitle="Настройки" ref={ref} data-testid="table-basic-settings" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<TableBasicSettings linkTitle="Настройки" ref={ref} data-testid="table-basic-settings" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should keep statics identity", () => {
        expect(TableBasicSettings.Body).toBe(TableBasicSettingsBody);
        expect(TableBasicSettings.ColumnSettings).toBe(ColumnSettings);
        expect(TableBasicSettings.Footer).toBe(TableBasicSettingsFooter);
        expect(TableBasicSettings.Header).toBe(TableBasicSettingsHeader);
    });

    it("Should have displayName", () => {
        expect(TableBasicSettings.displayName).toBe("TableBasicSettings");
    });
});
