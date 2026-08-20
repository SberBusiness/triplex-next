import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs, ITabsProps } from "../Tabs";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETabsExtendedType } from "@sberbusiness/triplex-next/components/TabsExtended";

const getTabs = () => screen.getByTestId("tabs");
const getTab = () => screen.getByRole("button");

describe("Tabs", () => {
    const mockTabs = [
        { id: "tab-1", label: "Tab 1" },
        { id: "tab-2", label: "Tab 2" },
        { id: "tab-3", label: "Tab 3" },
    ];

    const defaultProps: ITabsProps = {
        tabs: mockTabs,
        selectedId: "tab-1",
        onSelectTab: vi.fn(),
    };

    it("Should render with default props", () => {
        render(<Tabs {...defaultProps} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(tab1).toHaveClass("md");
    });

    it("Should render with size SM", () => {
        render(<Tabs {...defaultProps} size={EComponentSize.SM} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(tab1).toHaveClass("sm");
    });

    it("Should render with size LG", () => {
        render(<Tabs {...defaultProps} size={EComponentSize.LG} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(tab1).toHaveClass("lg");
    });

    it("Should render with type TYPE_2", () => {
        render(<Tabs {...defaultProps} type={ETabsExtendedType.TYPE_2} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type2");
        expect(tab1).toHaveClass("md");
    });

    it("Should highlight dropdown button of type TYPE_1 when selected tab is hidden in dropdown", () => {
        render(<Tabs {...defaultProps} data-testid="tabs" />);

        // В jsdom ширины равны нулю, поэтому все табы уезжают в dropdown вместе с выбранным.
        const dropdownButton = getTab();

        expect(dropdownButton).toHaveClass("type1");
        expect(dropdownButton).toHaveClass("selected");
    });

    it("Should highlight dropdown button of type TYPE_2 when selected tab is hidden in dropdown", () => {
        render(<Tabs {...defaultProps} type={ETabsExtendedType.TYPE_2} data-testid="tabs" />);

        const dropdownButton = getTab();

        expect(dropdownButton).toHaveClass("type2");
        expect(dropdownButton).toHaveClass("selected");
    });

    it("Should not highlight dropdown button when selected tab is not among dropdown items", () => {
        render(<Tabs {...defaultProps} selectedId="tab-outside-dropdown" data-testid="tabs" />);

        expect(getTab()).not.toHaveClass("selected");
    });

    it("Should keep className passed in buttonDropdownAttributes", () => {
        render(<Tabs {...defaultProps} buttonDropdownAttributes={{ className: "custom-class" }} data-testid="tabs" />);

        const dropdownButton = getTab();

        expect(dropdownButton).toHaveClass("custom-class");
        // Собственные классы кнопки не должны потеряться из-за пользовательского.
        expect(dropdownButton).toHaveClass("tabButtonDropdown");
        expect(dropdownButton).toHaveClass("selected");
    });
});
