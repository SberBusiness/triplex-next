import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TabsExtended, ITabsExtendedProps } from "../TabsExtended";
import { TabsExtendedContent } from "../components/TabsExtendedContent";
import { ETabsExtendedType } from "../enums";

const TABS = [
    { id: "tab-1", label: "Tab 1" },
    { id: "tab-2", label: "Tab 2" },
];

/**
 * Табы рендерятся без TabsWrapper: он дублирует разметку в скрытом контейнере для замеров,
 * из-за чего в дереве появляется по две кнопки на таб. Замеры проверяются отдельно,
 * в TabsExtendedTabsWrapper.test.tsx.
 */
type TRenderTabsProps = Partial<ITabsExtendedProps> & { ref?: React.Ref<HTMLDivElement> };

const renderTabs = (props: TRenderTabsProps = {}) =>
    render(
        <TabsExtended selectedId="tab-1" onSelectTab={() => {}} data-testid="tabs-extended" {...props}>
            <TabsExtended.Content>
                {TABS.map(({ id, label }) => (
                    <TabsExtended.Content.Tab key={id} id={id}>
                        {({ selected }) => (
                            <TabsExtended.Content.TabButton selected={selected}>{label}</TabsExtended.Content.TabButton>
                        )}
                    </TabsExtended.Content.Tab>
                ))}
            </TabsExtended.Content>
        </TabsExtended>,
    );

describe("TabsExtended", () => {
    it("Should render tablist with default type", () => {
        renderTabs();

        const tabs = screen.getByRole("tablist");

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("tabsExtended", "type1");
    });

    it("Should apply class for type TYPE_2", () => {
        renderTabs({ type: ETabsExtendedType.TYPE_2 });

        expect(screen.getByRole("tablist")).toHaveClass("type2");
    });

    it("Should merge custom className into root element", () => {
        renderTabs({ className: "custom-class" });

        expect(screen.getByRole("tablist")).toHaveClass("tabsExtended", "custom-class");
    });

    it("Should pass rest props to root element", () => {
        renderTabs({ "aria-label": "Разделы" });

        expect(screen.getByRole("tablist")).toHaveAttribute("aria-label", "Разделы");
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        renderTabs({ ref });

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByRole("tablist"));
    });

    it("Should call onSelectTab with id of clicked tab", async () => {
        const user = userEvent.setup();
        const onSelectTab = vi.fn();

        renderTabs({ onSelectTab });

        await user.click(screen.getAllByRole("tab")[1]);

        expect(onSelectTab).toHaveBeenCalledTimes(1);
        expect(onSelectTab).toHaveBeenCalledWith("tab-2");
    });

    it("Should not call onSelectTab when already selected tab is clicked", async () => {
        const user = userEvent.setup();
        const onSelectTab = vi.fn();

        renderTabs({ onSelectTab, selectedId: "tab-1" });

        await user.click(screen.getAllByRole("tab")[0]);

        expect(onSelectTab).not.toHaveBeenCalled();
    });

    it("Should mark selected tab via render prop", () => {
        renderTabs({ selectedId: "tab-2" });

        const [firstTab, secondTab] = screen.getAllByRole("tab");

        expect(firstTab).toHaveAttribute("aria-selected", "false");
        expect(secondTab).toHaveAttribute("aria-selected", "true");
    });

    it("Should expose Content as static member", () => {
        expect(TabsExtended.Content).toBe(TabsExtendedContent);
    });
});
