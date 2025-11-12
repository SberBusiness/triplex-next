import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TabsLine, ITabsLineProps } from "../TabsLine";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ITabsLineItemProps } from "../components/TabsLineItem";

describe("TabsLine", () => {
    const mockTabs: ITabsLineItemProps[] = [
        { id: "tab-1", label: "Tab 1", "data-test-id": "tab-1" },
        { id: "tab-2", label: "Tab 2", "data-test-id": "tab-2" },
        { id: "tab-3", label: "Tab 3", "data-test-id": "tab-3" },
    ];

    const defaultProps: ITabsLineProps = {
        tabs: mockTabs,
        selectedId: "tab-1",
        onChangeTab: vi.fn(),
    };

    const getTabsLine = () => screen.getByRole("tablist");
    const getTab = () => screen.getAllByRole("tab")[0];

    it("Should render with default props", () => {
        render(<TabsLine {...defaultProps} data-testid="tabs-line" />);

        const tabsLineWrapper = getTabsLine();
        const tab1 = getTab();

        expect(tabsLineWrapper).toBeInTheDocument();
        expect(tab1).toHaveClass("md");
    });

    it("Should apply paddingX 0", () => {
        render(<TabsLine {...defaultProps} paddingX={0} />);

        const tabsLine = getTabsLine();
        expect(tabsLine).toHaveAttribute("data-paddingx-size", "0");
    });

    it("Should apply paddingX 8", () => {
        render(<TabsLine {...defaultProps} paddingX={8} />);

        const tabsLine = getTabsLine();
        expect(tabsLine).toHaveAttribute("data-paddingx-size", "8");
    });

    it("Should apply paddingX 16", () => {
        render(<TabsLine {...defaultProps} paddingX={16} />);

        const tabsLine = getTabsLine();
        expect(tabsLine).toHaveAttribute("data-paddingx-size", "16");
    });

    it("Should apply paddingX 24", () => {
        render(<TabsLine {...defaultProps} paddingX={24} />);

        const tabsLine = getTabsLine();
        expect(tabsLine).toHaveAttribute("data-paddingx-size", "24");
    });

    it("Should render with size SM", () => {
        render(<TabsLine {...defaultProps} size={EComponentSize.SM} />);

        const tabsLineWrapper = getTabsLine();
        const tabsLine = tabsLineWrapper.firstChild;
        const tab1 = getTab();

        expect(tabsLine).toHaveAttribute("data-size", "sm");
        expect(tab1).toHaveClass("sm");
    });

    it("Should render with size LG", () => {
        render(<TabsLine {...defaultProps} size={EComponentSize.LG} />);

        const tabsLineWrapper = getTabsLine();
        const tabsLine = tabsLineWrapper.firstChild;
        const tab1 = getTab();

        expect(tabsLine).toHaveAttribute("data-size", "lg");
        expect(tab1).toHaveClass("lg");
    });

    it("Should render notification icon when showNotificationIcon is true", () => {
        const tabsWithNotification: ITabsLineItemProps[] = [
            { id: "tab-1", label: "Tab 1", showNotificationIcon: true },
            { id: "tab-2", label: "Tab 2" },
        ];

        render(<TabsLine {...defaultProps} tabs={tabsWithNotification} />);

        const tab1 = getTab();
        const notificationIcon = tab1.querySelector("span[class*='notificationIcon']");
        expect(notificationIcon).toBeInTheDocument();
    });
});
