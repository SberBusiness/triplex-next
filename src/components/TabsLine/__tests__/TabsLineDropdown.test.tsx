import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ITabsLineItemProps } from "../components/TabsLineItem";
import { TabsLineDropdown } from "../components/TabsLineDropdown";

describe("TabsLineDropdown", () => {
    const tabs: ITabsLineItemProps[] = [
        { id: "tab-3", label: "Tab 3" },
        { id: "tab-4", label: "Tab 4" },
        { id: "tab-5", label: "Tab 5" },
    ];

    const renderDropdown = (props: Partial<React.ComponentProps<typeof TabsLineDropdown>> = {}) =>
        render(<TabsLineDropdown tabs={tabs} active={false} label="Tab 3" onClickTab={vi.fn()} {...props} />);

    const getTarget = () => screen.getByRole("tab");
    const queryList = () => screen.queryByRole("listbox");

    describe("target", () => {
        it("Should render the target as a closed menu button", () => {
            renderDropdown();

            const target = getTarget();

            expect(target).toHaveTextContent("Tab 3");
            expect(target).toHaveAttribute("type", "button");
            expect(target).toHaveAttribute("aria-haspopup", "menu");
            expect(target).toHaveAttribute("aria-expanded", "false");
            expect(queryList()).not.toBeInTheDocument();
        });

        it("Should point aria-controls at the list it opens", async () => {
            const user = userEvent.setup();

            renderDropdown();
            await user.click(getTarget());

            expect(queryList()).toHaveAttribute("id", getTarget().getAttribute("aria-controls"));
        });

        it("Should mark the target as active when the selected tab is hidden in the dropdown", () => {
            renderDropdown({ active: true });

            expect(getTarget()).toHaveClass("active");
        });

        it.each([
            [EComponentSize.SM, "sm"],
            [EComponentSize.MD, "md"],
            [EComponentSize.LG, "lg"],
        ])("Should apply the class of size %s to the target", (size, className) => {
            renderDropdown({ size });

            expect(getTarget()).toHaveClass(className);
        });

        it("Should pass targetHtmlAttributes through to the target button", () => {
            renderDropdown({ targetHtmlAttributes: { "data-test-id": "dropdown-target" } });

            expect(getTarget()).toHaveAttribute("data-test-id", "dropdown-target");
        });

        it("Should call the focus and hover handlers from targetHtmlAttributes", async () => {
            const onFocus = vi.fn();
            const onMouseEnter = vi.fn();
            const user = userEvent.setup();

            renderDropdown({ targetHtmlAttributes: { onFocus, onMouseEnter } });

            await user.hover(getTarget());
            expect(onMouseEnter).toHaveBeenCalledTimes(1);
            expect(onMouseEnter).toHaveBeenCalledWith(expect.objectContaining({ type: "mouseenter" }));

            await user.click(getTarget());
            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ type: "focus" }));
        });
    });

    describe("opening and closing", () => {
        it("Should toggle the list on target click", async () => {
            const user = userEvent.setup();

            renderDropdown();

            await user.click(getTarget());
            expect(queryList()).toBeInTheDocument();
            expect(getTarget()).toHaveAttribute("aria-expanded", "true");

            await user.click(getTarget());
            expect(queryList()).not.toBeInTheDocument();
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        });

        it.each(["{ArrowDown}", "{ArrowUp}"])("Should open the list on %s", async (key) => {
            const user = userEvent.setup();

            renderDropdown();
            await user.tab();
            expect(getTarget()).toHaveFocus();

            await user.keyboard(key);

            expect(queryList()).toBeInTheDocument();
        });

        it("Should close the list on Escape", async () => {
            const user = userEvent.setup();

            renderDropdown();
            await user.click(getTarget());
            expect(queryList()).toBeInTheDocument();

            await user.keyboard("{Escape}");

            expect(queryList()).not.toBeInTheDocument();
        });

        it("Should close the list on click outside", async () => {
            const user = userEvent.setup();

            renderDropdown();
            await user.click(getTarget());
            expect(queryList()).toBeInTheDocument();

            await user.click(document.body);

            expect(queryList()).not.toBeInTheDocument();
        });
    });

    describe("list", () => {
        it("Should render an option per tab", async () => {
            const user = userEvent.setup();

            renderDropdown();
            await user.click(getTarget());

            expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
                "Tab 3",
                "Tab 4",
                "Tab 5",
            ]);
        });

        it("Should mark the selected tab in the list", async () => {
            const user = userEvent.setup();

            renderDropdown({ active: true, selected: tabs[1] });
            await user.click(getTarget());

            expect(screen.getByRole("option", { name: "Tab 4" })).toHaveAttribute("aria-selected", "true");
            expect(screen.getByRole("option", { name: "Tab 3" })).toHaveAttribute("aria-selected", "false");
        });

        it("Should call onClickTab with the selected tab and close the list", async () => {
            const onClickTab = vi.fn();
            const user = userEvent.setup();

            renderDropdown({ onClickTab });
            await user.click(getTarget());
            await user.click(screen.getByRole("option", { name: "Tab 5" }));

            expect(onClickTab).toHaveBeenCalledTimes(1);
            expect(onClickTab).toHaveBeenCalledWith(tabs[2]);
            expect(queryList()).not.toBeInTheDocument();
        });

        it("Should keep option ids unique across instances with the same tab ids", async () => {
            const user = userEvent.setup();

            render(
                <>
                    <TabsLineDropdown tabs={tabs} active={false} label="First" onClickTab={vi.fn()} />
                    <TabsLineDropdown tabs={tabs} active={false} label="Second" onClickTab={vi.fn()} />
                </>,
            );

            const [firstTarget, secondTarget] = screen.getAllByRole("tab");
            const getOptionIds = () => screen.getAllByRole("option").map((option) => option.id);

            // Списки открываются по очереди: клик по второму таргету закрывает первый список.
            await user.click(firstTarget);
            const firstIds = getOptionIds();

            await user.click(secondTarget);
            const secondIds = getOptionIds();

            // DOM id пункта больше не равен id таба — он выводится из идентификатора экземпляра.
            expect(firstIds).not.toContain("tab-3");
            expect(new Set([...firstIds, ...secondIds]).size).toBe(firstIds.length + secondIds.length);
        });
    });

    it("Should merge the className from targetHtmlAttributes into the target", () => {
        renderDropdown({ targetHtmlAttributes: { className: "custom-target" } });

        expect(getTarget()).toHaveClass("custom-target");
        expect(getTarget()).toHaveClass("dropdownTarget");
    });

    it("Should call the onClick from targetHtmlAttributes along with opening the list", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        renderDropdown({ targetHtmlAttributes: { onClick } });
        await user.click(getTarget());

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(queryList()).toBeInTheDocument();
    });

    it("Should call the onKeyDown from targetHtmlAttributes along with the internal handler", async () => {
        const user = userEvent.setup();
        const onKeyDown = vi.fn();

        renderDropdown({ targetHtmlAttributes: { onKeyDown } });
        await user.tab();
        expect(getTarget()).toHaveFocus();
        await user.keyboard("{ArrowDown}");

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(queryList()).toBeInTheDocument();
    });

    it("Should merge the custom className into the root element and forward ref", () => {
        const ref = React.createRef<HTMLDivElement>();

        const { container } = renderDropdown({ className: "custom-class", ref });

        expect(container.firstChild).toHaveClass("custom-class");
        expect(container.firstChild).toHaveClass("tabsLineDropdown");
        expect(ref.current).toBe(container.firstChild);
    });

    it("Should have correct displayName", () => {
        expect(TabsLineDropdown.displayName).toBe("TabsLineDropdown");
    });
});
