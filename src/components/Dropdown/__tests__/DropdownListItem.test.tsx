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

    it("does not handle keyboard on its own even when active", () => {
        const onSelect = vi.fn();

        render(
            <DropdownListItem id="item-1" active onSelect={onSelect}>
                Option 1
            </DropdownListItem>,
        );

        const prevented = !fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });
        fireEvent.keyDown(screen.getByRole("option"), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(prevented).toBe(false);
        expect(onSelect).not.toHaveBeenCalled();
    });

    it("does not pass keyCodesForSelection to the DOM", () => {
        render(
            <DropdownListItem id="item-1" keyCodesForSelection={[EVENT_KEY_CODES.ENTER]}>
                Option 1
            </DropdownListItem>,
        );

        expect(screen.getByRole("option")).not.toHaveAttribute("keycodesforselection");
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
