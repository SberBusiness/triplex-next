import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MultiselectField } from "../MultiselectField";
import { MultiselectFieldDropdown } from "../components/MultiselectFieldDropdown";
import { SelectExtendedFieldTarget } from "../../SelectExtendedField";

vi.mock("@sberbusiness/icons-next", () => ({
    CaretdownStrokeSrvIcon16: ({ className }: { className?: string }) => (
        <div data-testid="caret-icon-16" className={className}>
            Caret Icon 16
        </div>
    ),
    CaretdownStrokeSrvIcon20: ({ className }: { className?: string }) => (
        <div data-testid="caret-icon-20" className={className}>
            Caret Icon 20
        </div>
    ),
    CaretdownStrokeSrvIcon24: ({ className }: { className?: string }) => (
        <div data-testid="caret-icon-24" className={className}>
            Caret Icon 24
        </div>
    ),
    DotshorizontalStrokeSrvIcon20: ({ paletteIndex }: { paletteIndex?: number }) => (
        <div data-testid="dots-icon-20" data-palette-index={paletteIndex}>
            Dots Icon 20
        </div>
    ),
    DotshorizontalStrokeSrvIcon32: ({ paletteIndex }: { paletteIndex?: number }) => (
        <div data-testid="dots-icon-32" data-palette-index={paletteIndex}>
            Dots Icon 32
        </div>
    ),
}));

describe("MultiselectField", () => {
    const mockRenderTarget = vi.fn();
    const mockRenderDropdown = vi.fn();

    it("Should render with default props", () => {
        render(
            <MultiselectField renderTarget={mockRenderTarget} data-testid="multiselect-field">
                {mockRenderDropdown}
            </MultiselectField>,
        );

        expect(screen.getByTestId("multiselect-field")).toBeInTheDocument();
        expect(MultiselectField.Target).toBe(SelectExtendedFieldTarget);
        expect(MultiselectField.Dropdown).toBe(MultiselectFieldDropdown);
    });
});
