import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
    SegmentedControl,
    ISegmentedControlSingleProps,
    ESegmentedControlType,
    ESegmentedControlTheme,
    ESegmentedControlSize,
} from "@sberbusiness/triplex-next/components/SegmentedControl";

const defaultSingleProps: ISegmentedControlSingleProps = {
    type: ESegmentedControlType.SINGLE,
    theme: ESegmentedControlTheme.GENERAL_1,
    size: ESegmentedControlSize.MD,
    value: "option1",
    onSelect: vi.fn(),
};

describe("SegmentedControlSegment", () => {
    it("forwards ref to the button element", () => {
        const ref = React.createRef<HTMLButtonElement>();

        render(
            <SegmentedControl {...defaultSingleProps}>
                <SegmentedControl.Segment value="option1" ref={ref}>
                    Option 1
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button"));
    });

    it("merges className with the base class", () => {
        render(
            <SegmentedControl {...defaultSingleProps}>
                <SegmentedControl.Segment value="option1" className="custom-class" data-testid="segment">
                    Option 1
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        const segment = screen.getByTestId("segment");

        expect(segment).toHaveClass("segmentedControlSegment");
        expect(segment).toHaveClass("custom-class");
    });

    it("applies selected class to the segment matching the control value", () => {
        render(
            <SegmentedControl {...defaultSingleProps} value="option2">
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(screen.getByTestId("segment-option1")).not.toHaveClass("selected");
        expect(screen.getByTestId("segment-option2")).toHaveClass("selected");
    });

    it("calls own onClick with the click event in addition to selection", () => {
        const onClick = vi.fn();
        const onSelect = vi.fn();

        render(
            <SegmentedControl {...defaultSingleProps} onSelect={onSelect}>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2" onClick={onClick}>
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        fireEvent.click(screen.getByTestId("segment-option2"));

        expect(onSelect).toHaveBeenCalledWith("option2");
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
    });

    it("does not set title when children are not a string", () => {
        render(
            <SegmentedControl {...defaultSingleProps}>
                <SegmentedControl.Segment value="option1" data-testid="segment" aria-label="option 1">
                    <span>Option 1</span>
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(screen.getByTestId("segment")).not.toHaveAttribute("title");
    });

    it("renders a button that is not selected outside of SegmentedControl", () => {
        render(
            <SegmentedControl.Segment value="option1" data-testid="segment">
                Option 1
            </SegmentedControl.Segment>,
        );

        const segment = screen.getByTestId("segment");

        expect(segment).toHaveAttribute("aria-pressed", "false");
        expect(segment).toBeEnabled();
        expect(segment).not.toHaveClass("selected");
    });
});
