import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropdownListItem } from "../desktop/DropdownListItem";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

describe("DropdownListItem", () => {
    it("renders children and required attributes", () => {
        render(<DropdownListItem id="item-1">Option 1</DropdownListItem>);

        const item = screen.getByRole("option");

        expect(item).toHaveTextContent("Option 1");
        expect(item).toHaveAttribute("id", "item-1");
        expect(item).toHaveClass("dropdownDesktopListItem");
    });

    it("sets title only for string children", () => {
        const { rerender } = render(<DropdownListItem id="item-1">Option 1</DropdownListItem>);

        expect(screen.getByRole("option")).toHaveAttribute("title", "Option 1");

        rerender(
            <DropdownListItem id="item-1">
                <span>Option 1</span>
            </DropdownListItem>,
        );

        expect(screen.getByRole("option")).not.toHaveAttribute("title");
    });

    it("reflects selected state in class and aria-selected", () => {
        const { rerender } = render(<DropdownListItem id="item-1">Option 1</DropdownListItem>);

        expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "false");
        expect(screen.getByRole("option")).not.toHaveClass("selected");

        rerender(
            <DropdownListItem id="item-1" selected>
                Option 1
            </DropdownListItem>,
        );

        expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("option")).toHaveClass("selected");
    });

    it("reflects active state in class", () => {
        const { rerender } = render(<DropdownListItem id="item-1">Option 1</DropdownListItem>);

        expect(screen.getByRole("option")).not.toHaveClass("active");

        rerender(
            <DropdownListItem id="item-1" active>
                Option 1
            </DropdownListItem>,
        );

        expect(screen.getByRole("option")).toHaveClass("active");
    });

    it("merges custom className into the root element", () => {
        render(
            <DropdownListItem id="item-1" className="custom-class">
                Option 1
            </DropdownListItem>,
        );

        expect(screen.getByRole("option")).toHaveClass("dropdownDesktopListItem", "custom-class");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <DropdownListItem id="item-1" ref={ref}>
                Option 1
            </DropdownListItem>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByRole("option"));
    });

    it("calls onSelect and onClick on click", () => {
        const onSelect = vi.fn();
        const onClick = vi.fn();

        render(
            <DropdownListItem id="item-1" onSelect={onSelect} onClick={onClick}>
                Option 1
            </DropdownListItem>,
        );

        fireEvent.click(screen.getByRole("option"));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    it("calls onSelect on Enter and Space while active", () => {
        const onSelect = vi.fn();

        render(
            <DropdownListItem id="item-1" active onSelect={onSelect}>
                Option 1
            </DropdownListItem>,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.SPACE });

        expect(onSelect).toHaveBeenCalledTimes(2);
    });

    it("does not call onSelect on keyboard while inactive", () => {
        const onSelect = vi.fn();

        render(
            <DropdownListItem id="item-1" onSelect={onSelect}>
                Option 1
            </DropdownListItem>,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });

        expect(onSelect).not.toHaveBeenCalled();
    });

    it("prevents default browser behaviour for selection keys", () => {
        render(
            <DropdownListItem id="item-1" active onSelect={vi.fn()}>
                Option 1
            </DropdownListItem>,
        );

        const prevented = !fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.SPACE });

        expect(prevented).toBe(true);
    });

    it("respects a custom keyCodesForSelection list", () => {
        const onSelect = vi.fn();

        render(
            <DropdownListItem id="item-1" active onSelect={onSelect} keyCodesForSelection={[EVENT_KEY_CODES.ENTER]}>
                Option 1
            </DropdownListItem>,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.SPACE });
        expect(onSelect).not.toHaveBeenCalled();

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("uses the latest onSelect after rerender", () => {
        const firstOnSelect = vi.fn();
        const secondOnSelect = vi.fn();

        const { rerender } = render(
            <DropdownListItem id="item-1" active onSelect={firstOnSelect}>
                Option 1
            </DropdownListItem>,
        );

        rerender(
            <DropdownListItem id="item-1" active onSelect={secondOnSelect}>
                Option 1
            </DropdownListItem>,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });

        expect(firstOnSelect).not.toHaveBeenCalled();
        expect(secondOnSelect).toHaveBeenCalledTimes(1);
    });

    it("unsubscribes from keyboard on unmount", () => {
        const onSelect = vi.fn();

        const { unmount } = render(
            <DropdownListItem id="item-1" active onSelect={onSelect}>
                Option 1
            </DropdownListItem>,
        );

        unmount();
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });

        expect(onSelect).not.toHaveBeenCalled();
    });

    it("renders notification icon only with showNotificationIcon", () => {
        const { container, rerender } = render(
            <DropdownListItem id="item-1" size={EComponentSize.MD}>
                Option 1
            </DropdownListItem>,
        );

        expect(container.querySelector(".notificationIcon")).toBeNull();

        rerender(
            <DropdownListItem id="item-1" size={EComponentSize.MD} showNotificationIcon>
                Option 1
            </DropdownListItem>,
        );

        expect(container.querySelector(".notificationIcon")).not.toBeNull();
    });
});
