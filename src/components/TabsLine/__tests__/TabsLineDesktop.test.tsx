import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TabsLineDesktop } from "../components/TabsLineDesktop";
import { ITabsLineItemProps } from "../components/TabsLineItem";

describe("TabsLineDesktop", () => {
    const tabs: ITabsLineItemProps[] = [
        { id: "tab-1", label: "Tab 1" },
        { id: "tab-2", label: "Tab 2" },
        { id: "tab-3", label: "Tab 3" },
        { id: "tab-4", label: "Tab 4" },
        { id: "tab-5", label: "Tab 5" },
    ];

    const renderDesktop = (props: Partial<React.ComponentProps<typeof TabsLineDesktop>> = {}) =>
        render(<TabsLineDesktop tabs={tabs} selectedId="tab-1" onChangeTab={vi.fn()} {...props} />);

    const getTabs = () => screen.getAllByRole("tab");
    const getTabNames = () => getTabs().map((tab) => tab.textContent);

    describe("rendering", () => {
        it("Should render every tab inline when maxVisible is not passed", () => {
            renderDesktop();

            expect(getTabNames()).toEqual(["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"]);
        });

        it("Should render nothing when there are no tabs", () => {
            const { container } = renderDesktop({ tabs: [] });

            expect(container).toBeEmptyDOMElement();
        });

        it("Should reserve the last visible slot for the dropdown target", () => {
            renderDesktop({ maxVisible: 3 });

            // Два таба в строке плюс кнопка дропдауна, подписанная первым скрытым табом.
            expect(getTabNames()).toEqual(["Tab 1", "Tab 2", "Tab 3"]);
            expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveAttribute("aria-haspopup", "menu");
        });

        it("Should label the dropdown target with the selected tab when it is hidden", () => {
            renderDesktop({ maxVisible: 3, selectedId: "tab-5" });

            const dropdownTarget = screen.getByRole("tab", { name: "Tab 5" });

            expect(dropdownTarget).toHaveAttribute("aria-haspopup", "menu");
            expect(dropdownTarget).toHaveClass("active");
        });

        it("Should mark the selected inline tab", () => {
            renderDesktop({ selectedId: "tab-2" });

            expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
        });

        it("Should put the size on the root element and on the tabs", () => {
            const { container } = renderDesktop({ size: EComponentSize.LG });

            expect(container.firstChild).toHaveAttribute("data-size", "lg");
            expect(getTabs()[0]).toHaveClass("lg");
        });

        it("Should let a tab override the size of the whole component", () => {
            renderDesktop({
                size: EComponentSize.LG,
                tabs: [
                    { id: "tab-1", label: "Tab 1" },
                    { id: "tab-2", label: "Tab 2", size: EComponentSize.SM },
                ],
            });

            expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveClass("lg");
            expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveClass("sm");
        });

        it("Should merge the custom className into the root element and forward ref", () => {
            const ref = React.createRef<HTMLDivElement>();

            const { container } = renderDesktop({ className: "custom-class", ref });

            expect(container.firstChild).toHaveClass("custom-class");
            expect(container.firstChild).toHaveClass("tabsLine");
            expect(ref.current).toBe(container.firstChild);
        });

        it("Should pass the dropdown target attributes through", () => {
            renderDesktop({ maxVisible: 3, dropdownTargetHtmlAttributes: { "data-test-id": "dropdown-target" } });

            expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveAttribute("data-test-id", "dropdown-target");
        });
    });

    describe("tab selection", () => {
        it("Should call onChangeTab with the id of the clicked tab", async () => {
            const onChangeTab = vi.fn();
            const user = userEvent.setup();

            renderDesktop({ onChangeTab });
            await user.click(screen.getByRole("tab", { name: "Tab 3" }));

            expect(onChangeTab).toHaveBeenCalledTimes(1);
            expect(onChangeTab).toHaveBeenCalledWith("tab-3");
        });

        it("Should call the onClick of the tab itself as well", async () => {
            const onClick = vi.fn();
            const onChangeTab = vi.fn();
            const user = userEvent.setup();

            renderDesktop({ onChangeTab, tabs: [{ id: "tab-1", label: "Tab 1", onClick }] });
            await user.click(screen.getByRole("tab", { name: "Tab 1" }));

            expect(onChangeTab).toHaveBeenCalledWith("tab-1");
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe("keyboard navigation", () => {
        it("Should move focus to the next tab on ArrowRight", async () => {
            const user = userEvent.setup();

            renderDesktop();
            await user.click(screen.getByRole("tab", { name: "Tab 1" }));
            await user.keyboard("{ArrowRight}");

            expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
        });

        it("Should move focus to the previous tab on ArrowLeft", async () => {
            const user = userEvent.setup();

            renderDesktop();
            await user.click(screen.getByRole("tab", { name: "Tab 3" }));
            await user.keyboard("{ArrowLeft}");

            expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
        });

        it("Should keep focus on the first tab on ArrowLeft", async () => {
            const user = userEvent.setup();

            renderDesktop();
            await user.click(screen.getByRole("tab", { name: "Tab 1" }));
            await user.keyboard("{ArrowLeft}");

            expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
        });

        it("Should not move focus from the last inline tab to the dropdown target on ArrowRight", async () => {
            const user = userEvent.setup();

            renderDesktop({ maxVisible: 3 });
            await user.click(screen.getByRole("tab", { name: "Tab 2" }));
            await user.keyboard("{ArrowRight}");

            expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
        });

        it("Should keep only the focused tab in the tab order", async () => {
            const user = userEvent.setup();

            renderDesktop();
            await user.click(screen.getByRole("tab", { name: "Tab 3" }));

            expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveAttribute("tabindex", "0");
            expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("tabindex", "-1");
        });

        it("Should take Tab from the first inline tab straight to the dropdown target", async () => {
            const user = userEvent.setup();

            renderDesktop({ maxVisible: 3 });

            await user.tab();
            expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();

            // Tab 2 выключен из порядка обхода, поэтому следующий Tab уходит на кнопку дропдауна.
            await user.tab();
            expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
            expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveAttribute("aria-haspopup", "menu");
        });

        it("Should return the tab order to the first tab on blur", async () => {
            const user = userEvent.setup();

            renderDesktop();
            await user.click(screen.getByRole("tab", { name: "Tab 3" }));
            await user.tab();

            expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("tabindex", "0");
            expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveAttribute("tabindex", "-1");
        });
    });

    it("Should keep a focusable tab when tabs shrink below the focused index", async () => {
        const user = userEvent.setup();

        const { rerender } = renderDesktop();

        await user.click(screen.getByRole("tab", { name: "Tab 5" }));
        expect(screen.getByRole("tab", { name: "Tab 5" })).toHaveAttribute("tabindex", "0");

        rerender(<TabsLineDesktop tabs={tabs.slice(0, 2)} selectedId="tab-1" onChangeTab={vi.fn()} />);

        // Сохранённый индекс (4) вышел за границы строки — иначе вся строка выпала бы из порядка обхода.
        expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("tabindex", "0");
    });

    it("Should have correct displayName", () => {
        expect(TabsLineDesktop.displayName).toBe("TabsLineDesktop");
    });
});
