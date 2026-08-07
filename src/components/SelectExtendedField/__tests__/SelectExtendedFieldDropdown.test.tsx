import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SelectExtendedFieldDropdown } from "../index";
import { DropdownList } from "../../Dropdown/desktop/DropdownList";

describe("SelectExtendedFieldDropdown", () => {
    const mockTargetRef = React.createRef<HTMLDivElement>();
    const mockDropdownRef = React.createRef<HTMLDivElement>();
    const mockSetOpened = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should not render content when closed", () => {
        render(
            <SelectExtendedFieldDropdown
                forwardedRef={mockDropdownRef}
                targetRef={mockTargetRef}
                opened={false}
                setOpened={mockSetOpened}
            >
                <div data-testid="dropdown-content">Dropdown content</div>
            </SelectExtendedFieldDropdown>,
        );

        expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
    });

    it("Should render children through Portal when opened", () => {
        const { container } = render(
            <SelectExtendedFieldDropdown
                forwardedRef={mockDropdownRef}
                targetRef={mockTargetRef}
                opened
                setOpened={mockSetOpened}
            >
                <div data-testid="dropdown-content">Dropdown content</div>
            </SelectExtendedFieldDropdown>,
        );

        const content = screen.getByTestId("dropdown-content");

        expect(content).toBeInTheDocument();
        // Dropdown рендерится через Portal в document.body, вне контейнера рендера.
        expect(container).not.toContainElement(content);
    });

    it("Should assign forwardedRef to dropdown container when opened", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SelectExtendedFieldDropdown forwardedRef={ref} targetRef={mockTargetRef} opened setOpened={mockSetOpened}>
                <div data-testid="dropdown-content">Dropdown content</div>
            </SelectExtendedFieldDropdown>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toContainElement(screen.getByTestId("dropdown-content"));
    });

    it("Should pass through additional props", () => {
        render(
            <SelectExtendedFieldDropdown
                forwardedRef={mockDropdownRef}
                targetRef={mockTargetRef}
                opened
                setOpened={mockSetOpened}
                className="custom-dropdown-class"
                data-testid="custom-dropdown"
            >
                <div>Content</div>
            </SelectExtendedFieldDropdown>,
        );

        expect(screen.getByTestId("custom-dropdown")).toHaveClass("custom-dropdown-class");
    });

    it("Should expose DropdownList as the List static property", () => {
        expect(SelectExtendedFieldDropdown.List).toBe(DropdownList);
    });

    it("Should have displayName", () => {
        expect(SelectExtendedFieldDropdown.displayName).toBe("SelectExtendedFieldDropdown");
    });
});
