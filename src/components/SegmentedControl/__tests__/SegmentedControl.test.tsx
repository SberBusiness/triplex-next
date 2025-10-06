import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
    SegmentedControl,
    ISegmentedControlSingleProps,
    ISegmentedControlMultipleProps,
    ESegmentedControlType,
    ESegmentedControlTheme,
    ESegmentedControlSize,
} from "@sberbusiness/triplex-next/components/SegmentedControl";

describe("SegmentedControl", () => {
    const defaultSingleProps: ISegmentedControlSingleProps = {
        type: ESegmentedControlType.SINGLE,
        theme: ESegmentedControlTheme.GENERAL_1,
        size: ESegmentedControlSize.MD,
        value: "option1",
        onSelect: vi.fn(),
    };

    const defaultMultipleProps: ISegmentedControlMultipleProps = {
        type: ESegmentedControlType.MULTIPLE,
        theme: ESegmentedControlTheme.GENERAL_1,
        size: ESegmentedControlSize.MD,
        value: ["option1"],
        onSelect: vi.fn(),
    };

    it("renders single selection control with segments", () => {
        render(
            <SegmentedControl {...defaultSingleProps}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(screen.getByTestId("segment-option1")).toBeInTheDocument();
        expect(screen.getByTestId("segment-option2")).toBeInTheDocument();
        expect(screen.getByTestId("segment-option1")).toHaveTextContent("Option 1");
        expect(screen.getByTestId("segment-option2")).toHaveTextContent("Option 2");
    });

    it("handles single selection when clicking on unselected segment", () => {
        const onSelect = vi.fn();
        render(
            <SegmentedControl {...defaultSingleProps} value="option1" onSelect={onSelect}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        fireEvent.click(screen.getByTestId("segment-option2"));
        expect(onSelect).toHaveBeenCalledWith("option2");
    });

    it("handles single selection when clicking on already selected segment", () => {
        const onSelect = vi.fn();
        render(
            <SegmentedControl {...defaultSingleProps} value="option1" onSelect={onSelect}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        fireEvent.click(screen.getByTestId("segment-option1"));
        expect(onSelect).toHaveBeenCalledWith("option1");
    });

    it("handles multiple selection - adding new option", () => {
        const onSelect = vi.fn();
        render(
            <SegmentedControl {...defaultMultipleProps} value={["option1"]} onSelect={onSelect}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        fireEvent.click(screen.getByTestId("segment-option2"));
        expect(onSelect).toHaveBeenCalledWith(["option1", "option2"]);
    });

    it("handles multiple selection - removing existing option", () => {
        const onSelect = vi.fn();
        render(
            <SegmentedControl {...defaultMultipleProps} value={["option1", "option2"]} onSelect={onSelect}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        fireEvent.click(screen.getByTestId("segment-option1"));
        expect(onSelect).toHaveBeenCalledWith(["option2"]);
    });

    it("prevents selection when control is disabled", () => {
        const onSelect = vi.fn();
        render(
            <SegmentedControl {...defaultSingleProps} disabled onSelect={onSelect}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        fireEvent.click(screen.getByTestId("segment-option2"));
        expect(onSelect).not.toHaveBeenCalled();
    });

    it("prevents selection when segment is disabled", () => {
        const onSelect = vi.fn();
        render(
            <SegmentedControl {...defaultSingleProps} onSelect={onSelect}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2" disabled>
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        fireEvent.click(screen.getByTestId("segment-option2"));
        expect(onSelect).not.toHaveBeenCalled();
    });

    it("applies correct aria-pressed attribute for selected state", () => {
        render(
            <SegmentedControl {...defaultSingleProps} value="option1">
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="option2" data-testid="segment-option2">
                    Option 2
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(screen.getByTestId("segment-option1")).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByTestId("segment-option2")).toHaveAttribute("aria-pressed", "false");
    });

    it("forwards ref to container div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <SegmentedControl {...defaultSingleProps} ref={ref}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("uses segment title prop when provided", () => {
        render(
            <SegmentedControl {...defaultSingleProps}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1" title="Custom Title">
                    Option 1
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(screen.getByTestId("segment-option1")).toHaveAttribute("title", "Custom Title");
    });

    it("uses children as title when title is not provided", () => {
        render(
            <SegmentedControl {...defaultSingleProps}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(screen.getByTestId("segment-option1")).toHaveAttribute("title", "Option 1");
    });

    it("handles additional HTML attributes on container", () => {
        render(
            <SegmentedControl {...defaultSingleProps} data-testid="segmented-control" className="custom-class">
                <SegmentedControl.Segment value="option1" data-testid="segment-option1">
                    Option 1
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        const control = screen.getByTestId("segmented-control");
        expect(control).toBeInTheDocument();
    });

    it("handles additional HTML attributes on segment", () => {
        render(
            <SegmentedControl {...defaultSingleProps}>
                <SegmentedControl.Segment value="option1" data-testid="segment-option1" data-custom-attr="custom-value">
                    Option 1
                </SegmentedControl.Segment>
            </SegmentedControl>,
        );

        expect(screen.getByTestId("segment-option1")).toHaveAttribute("data-custom-attr", "custom-value");
    });
});
