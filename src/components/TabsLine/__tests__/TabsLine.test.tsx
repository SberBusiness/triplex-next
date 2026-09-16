import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
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

    // Снимаем моки здесь, а не в теле теста: иначе упавший ассерт оставил бы подменённый matchMedia следующим тестам.
    afterEach(() => {
        vi.restoreAllMocks();
    });

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

    it("Should render the separator when withSeparator is true", () => {
        render(<TabsLine {...defaultProps} withSeparator />);

        expect(getTabsLine()).toHaveClass("withSeparator");
    });

    it("Should not render the separator by default", () => {
        render(<TabsLine {...defaultProps} />);

        expect(getTabsLine()).not.toHaveClass("withSeparator");
    });

    it("Should merge the custom className into the root element", () => {
        render(<TabsLine {...defaultProps} className="custom-class" />);

        const tabsLine = getTabsLine();

        expect(tabsLine).toHaveClass("custom-class");
        expect(tabsLine).toHaveClass("tabsLineWrapper");
    });

    it("Should spread unknown html attributes onto the root element", () => {
        render(<TabsLine {...defaultProps} data-test-id="tabs-line" />);

        expect(getTabsLine()).toHaveAttribute("data-test-id", "tabs-line");
    });

    it("Should forward ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<TabsLine {...defaultProps} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getTabsLine());
    });

    it("Should call onChangeTab with the id of the clicked tab", async () => {
        const onChangeTab = vi.fn();
        const user = userEvent.setup();

        render(<TabsLine {...defaultProps} onChangeTab={onChangeTab} />);
        await user.click(screen.getByRole("tab", { name: "Tab 2" }));

        expect(onChangeTab).toHaveBeenCalledTimes(1);
        expect(onChangeTab).toHaveBeenCalledWith("tab-2");
    });

    it("Should move the tabs that do not fit into maxVisible to the dropdown", () => {
        render(<TabsLine {...defaultProps} maxVisible={2} />);

        const tabs = screen.getAllByRole("tab");

        expect(tabs.map((tab) => tab.textContent)).toEqual(["Tab 1", "Tab 2"]);
        expect(tabs[1]).toHaveAttribute("aria-haspopup", "menu");
    });

    it("Should render the mobile variant on a mobile screen width", () => {
        vi.spyOn(window, "matchMedia").mockImplementation(
            (query) =>
                ({
                    matches: true,
                    media: query,
                    addEventListener: () => {},
                    removeEventListener: () => {},
                }) as unknown as MediaQueryList,
        );

        render(<TabsLine {...defaultProps} maxVisible={2} />);

        // Мобильный вариант дропдаун не строит: все табы остаются в строке.
        expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Tab 1", "Tab 2", "Tab 3"]);
    });

    it("Should have correct displayName", () => {
        expect(TabsLine.displayName).toBe("TabsLine");
    });
});
