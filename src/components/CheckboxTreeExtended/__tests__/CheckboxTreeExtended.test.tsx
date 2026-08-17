import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { CheckboxTreeExtended } from "../CheckboxTreeExtended";
import { EComponentSize } from "../../../enums/EComponentSize";

/** Подменяет matchMedia, чтобы useMobileView вернул мобильное или десктопное представление. */
const setMobileView = (matches: boolean) => {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
            ({
                matches,
                media: query,
                onchange: null,
                addEventListener: () => {},
                removeEventListener: () => {},
                addListener: () => {},
                removeListener: () => {},
                dispatchEvent: () => false,
            }) as unknown as MediaQueryList,
    );
};

const renderTree = (props: Partial<React.ComponentProps<typeof CheckboxTreeExtended>> = {}) =>
    render(
        <CheckboxTreeExtended {...props}>
            <CheckboxTreeExtended.Node
                id="1"
                checkbox={(checkboxProps) => (
                    <CheckboxTreeExtended.Checkbox {...checkboxProps}>Группа 1</CheckboxTreeExtended.Checkbox>
                )}
            >
                <CheckboxTreeExtended.Node
                    id="1-1"
                    checkbox={(checkboxProps) => (
                        <CheckboxTreeExtended.Checkbox {...checkboxProps}>Значение 1-1</CheckboxTreeExtended.Checkbox>
                    )}
                />
            </CheckboxTreeExtended.Node>
        </CheckboxTreeExtended>,
    );

describe("CheckboxTreeExtended", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders tree with nested nodes", () => {
        renderTree();

        expect(screen.getByRole("tree")).toBeInTheDocument();
        expect(screen.getByLabelText("Группа 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Значение 1-1")).toBeInTheDocument();
    });

    it("applies own class and merges className into root element", () => {
        renderTree({ className: "custom-class" });

        expect(screen.getByRole("tree")).toHaveClass("checkboxTreeExtended", "custom-class");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("passes size %s to checkboxes through context", (size, expectedClass) => {
        renderTree({ size });

        expect(screen.getByLabelText("Группа 1")).toHaveClass(expectedClass);
        expect(screen.getByLabelText("Значение 1-1")).toHaveClass(expectedClass);
    });

    it("uses MD size by default", () => {
        renderTree();

        expect(screen.getByLabelText("Группа 1")).toHaveClass("md");
    });

    it("forces MD size in mobile view", () => {
        setMobileView(true);
        renderTree({ size: EComponentSize.SM });

        expect(screen.getByLabelText("Группа 1")).toHaveClass("md");
        expect(screen.getByLabelText("Группа 1")).not.toHaveClass("sm");
    });

    it("keeps requested size when view is not mobile", () => {
        setMobileView(false);
        renderTree({ size: EComponentSize.SM });

        expect(screen.getByLabelText("Группа 1")).toHaveClass("sm");
    });

    it("exposes compound parts", () => {
        expect(CheckboxTreeExtended.Node.displayName).toBe("CheckboxTreeExtendedNode");
        expect(CheckboxTreeExtended.Checkbox.displayName).toBe("CheckboxTreeExtendedCheckbox");
    });
});
