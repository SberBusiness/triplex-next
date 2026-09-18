import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TabsLineItem } from "../components/TabsLineItem";

describe("TabsLineItem", () => {
    const renderItem = (props: Partial<React.ComponentProps<typeof TabsLineItem>> = {}) =>
        render(<TabsLineItem id="tab-1" label="Tab 1" {...props} />);

    const getTab = () => screen.getByRole("tab");

    it("Should render a button with the tab role and the label", () => {
        renderItem();

        const tab = getTab();

        expect(tab).toBeInTheDocument();
        expect(tab).toHaveAttribute("type", "button");
        expect(tab).toHaveTextContent("Tab 1");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should apply the class of size %s", (size, className) => {
        renderItem({ size });

        expect(getTab()).toHaveClass(className);
    });

    it("Should use size MD by default", () => {
        renderItem();

        expect(getTab()).toHaveClass("md");
    });

    it("Should mark the tab as selected", () => {
        renderItem({ selected: true });

        const tab = getTab();

        expect(tab).toHaveAttribute("aria-selected", "true");
        expect(tab).toHaveClass("active");
    });

    it("Should not mark the tab as selected by default", () => {
        renderItem();

        expect(getTab()).not.toHaveClass("active");
    });

    it("Should render the notification icon when showNotificationIcon is true", () => {
        renderItem({ showNotificationIcon: true });

        expect(getTab().querySelector("span[class*='notificationIcon']")).toBeInTheDocument();
    });

    it("Should not render the notification icon by default", () => {
        renderItem();

        expect(getTab().querySelector("span[class*='notificationIcon']")).not.toBeInTheDocument();
    });

    it("Should not put the tab id into the DOM", () => {
        renderItem();

        expect(getTab()).not.toHaveAttribute("id");
    });

    it("Should merge the custom className into the root element", () => {
        renderItem({ className: "custom-class" });

        const tab = getTab();

        expect(tab).toHaveClass("custom-class");
        expect(tab).toHaveClass("tab");
    });

    it("Should forward ref to the button element", () => {
        const ref = React.createRef<HTMLButtonElement>();

        renderItem({ ref });

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(getTab());
    });

    it("Should call onClick with the click event", async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();

        renderItem({ onClick });
        await user.click(getTab());

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", target: getTab() }));
    });

    it("Should call onFocus and onBlur passed by the consumer", async () => {
        const onFocus = vi.fn();
        const onBlur = vi.fn();
        const user = userEvent.setup();

        renderItem({ onFocus, onBlur });

        await user.click(getTab());
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ type: "focus" }));

        await user.tab();
        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: "blur" }));
    });

    it("Should call onMouseEnter and onMouseLeave passed by the consumer", async () => {
        const onMouseEnter = vi.fn();
        const onMouseLeave = vi.fn();
        const user = userEvent.setup();

        renderItem({ onMouseEnter, onMouseLeave });

        await user.hover(getTab());
        expect(onMouseEnter).toHaveBeenCalledTimes(1);
        expect(onMouseEnter).toHaveBeenCalledWith(expect.objectContaining({ type: "mouseenter" }));

        await user.unhover(getTab());
        expect(onMouseLeave).toHaveBeenCalledTimes(1);
        expect(onMouseLeave).toHaveBeenCalledWith(expect.objectContaining({ type: "mouseleave" }));
    });

    it("Should have correct displayName", () => {
        expect(TabsLineItem.displayName).toBe("TabsLineItem");
    });
});
