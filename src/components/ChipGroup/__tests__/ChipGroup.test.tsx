import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "../../../enums/EComponentSize";
import { ChipGroup, IChipGroupProps } from "../ChipGroup";

const renderChipGroup = (props: IChipGroupProps = {}) => {
    render(<ChipGroup data-testid="chipGroup" {...props} />);

    return screen.getByTestId("chipGroup");
};

describe("ChipGroup", () => {
    it("Should render children inside root element", () => {
        const root = renderChipGroup({
            children: (
                <>
                    <span>First</span>
                    <span>Second</span>
                </>
            ),
        });

        expect(root.tagName).toBe("DIV");
        expect(root).toContainElement(screen.getByText("First"));
        expect(root).toContainElement(screen.getByText("Second"));
    });

    it("Should apply base class", () => {
        expect(renderChipGroup()).toHaveClass("chipGroup");
    });

    it("Should apply md size class by default", () => {
        const root = renderChipGroup();

        expect(root).toHaveClass("md");
        expect(root).not.toHaveClass("sm");
        expect(root).not.toHaveClass("lg");
    });

    it.each(Object.values(EComponentSize))("Should apply size class for %s", (size) => {
        expect(renderChipGroup({ size })).toHaveClass(size);
    });

    it("Should apply multiLine class by default", () => {
        const root = renderChipGroup();

        expect(root).toHaveClass("multiLine");
        expect(root).not.toHaveClass("oneLine");
    });

    it("Should apply oneLine class instead of multiLine when oneLine is set", () => {
        const root = renderChipGroup({ oneLine: true });

        expect(root).toHaveClass("oneLine");
        expect(root).not.toHaveClass("multiLine");
    });

    it("Should apply multiLine class when oneLine is false", () => {
        const root = renderChipGroup({ oneLine: false });

        expect(root).toHaveClass("multiLine");
        expect(root).not.toHaveClass("oneLine");
    });

    it("Should merge className into root element", () => {
        expect(renderChipGroup({ className: "customClassName" })).toHaveClass(
            "chipGroup",
            "md",
            "multiLine",
            "customClassName",
        );
    });

    it("Should not pass own props to root element as attributes", () => {
        const root = renderChipGroup({ size: EComponentSize.LG, oneLine: true });

        expect(root).not.toHaveAttribute("size");
        expect(root).not.toHaveAttribute("oneLine");
    });

    it("Should pass rest props to root element", () => {
        const handleClick = vi.fn();
        const root = renderChipGroup({ id: "chipGroupId", "aria-label": "Chips", onClick: handleClick });

        expect(root).toHaveAttribute("id", "chipGroupId");
        expect(root).toHaveAttribute("aria-label", "Chips");

        fireEvent.click(root);
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: root }));
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ChipGroup data-testid="chipGroup" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("chipGroup"));
    });
});
