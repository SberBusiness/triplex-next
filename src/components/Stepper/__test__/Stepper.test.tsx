import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Stepper, StepperExtended } from "@sberbusiness/triplex-next/components/Stepper";
import { EStepperSize, EStepperStepType, EStepperStepIconType } from "../enums";
import { StepperStepIcon } from "../StepperStepIcon";

describe("Stepper Component", () => {
    const mockOnSelectStep = vi.fn();
    const mockSteps = [
        {
            id: "step1",
            label: "Step 1",
            disabled: false,
            type: EStepperStepType.NEUTRAL,
            icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
        },
        {
            id: "step2",
            label: "Step 2",
            disabled: false,
            type: EStepperStepType.NEUTRAL,
            icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
        },
        {
            id: "step3",
            label: "Step 3",
            disabled: false,
            type: EStepperStepType.NEUTRAL,
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders stepper with multiple steps", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step2" onSelectStep={mockOnSelectStep} />);

        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
        expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("renders with small size by default", () => {
        const { container } = render(
            <Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />,
        );

        const stepper = container.querySelector('[role="tablist"]');
        expect(stepper).toBeInTheDocument();
    });

    it("renders with medium size", () => {
        const { container } = render(
            <Stepper steps={mockSteps} size={EStepperSize.MD} selectedStepId="step1" onSelectStep={mockOnSelectStep} />,
        );

        const stepper = container.querySelector('[role="tablist"]');
        expect(stepper).toBeInTheDocument();
    });

    it("renders with large size", () => {
        const { container } = render(
            <Stepper steps={mockSteps} size={EStepperSize.LG} selectedStepId="step1" onSelectStep={mockOnSelectStep} />,
        );

        const stepper = container.querySelector('[role="tablist"]');
        expect(stepper).toBeInTheDocument();
    });

    it("calls onSelectStep when a step is clicked", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step2 = screen.getByText("Step 2").closest("li");
        fireEvent.click(step2!);

        expect(mockOnSelectStep).toHaveBeenCalledWith("step2");
    });

    it("calls onSelectStep when Enter key is pressed on a step", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step3 = screen.getByText("Step 3").closest("li");
        step3?.focus();
        fireEvent.keyDown(step3!, { key: "Enter", code: "Enter" });

        expect(mockOnSelectStep).toHaveBeenCalledWith("step3");
    });

    it("calls onSelectStep when Space key is pressed on a step", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step2 = screen.getByText("Step 2").closest("li");
        step2?.focus();
        fireEvent.keyDown(step2!, { key: " ", code: "Space" });

        expect(mockOnSelectStep).toHaveBeenCalledWith("step2");
    });

    it("does not call onSelectStep when clicking disabled step", () => {
        const stepsWithDisabled = [
            ...mockSteps,
            {
                id: "step4",
                label: "Step 4 Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
        ];

        render(<Stepper steps={stepsWithDisabled} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const disabledStep = screen.getByText("Step 4 Disabled").closest("li");
        fireEvent.click(disabledStep!);

        expect(mockOnSelectStep).not.toHaveBeenCalled();
    });

    it("marks the selected step with aria-current", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step2" onSelectStep={mockOnSelectStep} />);

        const step2 = screen.getByText("Step 2").closest("li");
        expect(step2).toHaveAttribute("aria-current", "true");
    });

    it("renders steps with error type", () => {
        const errorSteps = [
            {
                id: "error1",
                label: "Error Step",
                disabled: false,
                type: EStepperStepType.ERROR,
                icon: <StepperStepIcon type={EStepperStepIconType.ERROR} />,
            },
        ];

        render(<Stepper steps={errorSteps} selectedStepId="error1" onSelectStep={mockOnSelectStep} />);

        expect(screen.getByText("Error Step")).toBeInTheDocument();
    });

    it("renders steps with warning type", () => {
        const warningSteps = [
            {
                id: "warning1",
                label: "Warning Step",
                disabled: false,
                type: EStepperStepType.WARNING,
                icon: <StepperStepIcon type={EStepperStepIconType.WARNING} />,
            },
        ];

        render(<Stepper steps={warningSteps} selectedStepId="warning1" onSelectStep={mockOnSelectStep} />);

        expect(screen.getByText("Warning Step")).toBeInTheDocument();
    });

    it("renders steps with neutral type", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
        expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("applies custom className to stepper", () => {
        const { container } = render(
            <Stepper
                steps={mockSteps}
                selectedStepId="step1"
                onSelectStep={mockOnSelectStep}
                className="custom-class"
            />,
        );

        const stepper = container.querySelector(".custom-class");
        expect(stepper).toBeInTheDocument();
    });

    it("renders empty steps array without error", () => {
        render(<Stepper steps={[]} selectedStepId="" onSelectStep={mockOnSelectStep} />);

        const container = screen.queryByRole("tablist");
        expect(container).toBeInTheDocument();
    });

    it("handles undefined selectedStepId gracefully", () => {
        render(<Stepper steps={mockSteps} onSelectStep={mockOnSelectStep} />);

        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
        expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("renders steps without labels", () => {
        const stepsWithoutLabels = [
            {
                id: "step1",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step2",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
        ];

        render(<Stepper steps={stepsWithoutLabels} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const container = screen.queryByRole("tablist");
        expect(container).toBeInTheDocument();
    });

    it("renders steps with icons", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step1 = screen.getByText("Step 1").closest("li");
        expect(step1).toBeInTheDocument();
    });

    it("calls onSelectStep when clicking already selected step", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step1 = screen.getByText("Step 1").closest("li");
        fireEvent.click(step1!);

        expect(mockOnSelectStep).toHaveBeenCalledWith("step1");
    });

    it("handles rapid clicks on different steps", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step2 = screen.getByText("Step 2").closest("li");
        const step3 = screen.getByText("Step 3").closest("li");

        fireEvent.click(step2!);
        fireEvent.click(step3!);

        expect(mockOnSelectStep).toHaveBeenCalledWith("step2");
        expect(mockOnSelectStep).toHaveBeenCalledWith("step3");
    });

    it("renders with wrapper component", () => {
        render(
            <Stepper.Wrapper>
                <Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />
            </Stepper.Wrapper>,
        );

        expect(screen.getByText("Step 1")).toBeInTheDocument();
    });
});

describe("StepperExtended Component", () => {
    const mockOnSelectStep = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders StepperExtended with children", () => {
        render(
            <StepperExtended selectedStepId="step1" onSelectStep={mockOnSelectStep}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
                <StepperExtended.Step id="step2" type={EStepperStepType.NEUTRAL}>
                    Step 2
                </StepperExtended.Step>
            </StepperExtended>,
        );

        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
    });

    it("renders with default small size", () => {
        const { container } = render(
            <StepperExtended selectedStepId="step1" onSelectStep={mockOnSelectStep}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
            </StepperExtended>,
        );

        const stepper = container.querySelector('[role="tablist"]');
        expect(stepper).toBeInTheDocument();
    });

    it("calls onSelectStep when a step is clicked", () => {
        render(
            <StepperExtended selectedStepId="step1" onSelectStep={mockOnSelectStep}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
                <StepperExtended.Step id="step2" type={EStepperStepType.NEUTRAL}>
                    Step 2
                </StepperExtended.Step>
            </StepperExtended>,
        );

        const step2 = screen.getByText("Step 2").closest("li");
        fireEvent.click(step2!);

        expect(mockOnSelectStep).toHaveBeenCalledWith("step2");
    });

    it("marks the selected step with aria-current", () => {
        render(
            <StepperExtended selectedStepId="step2" onSelectStep={mockOnSelectStep}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
                <StepperExtended.Step id="step2" type={EStepperStepType.NEUTRAL}>
                    Step 2
                </StepperExtended.Step>
            </StepperExtended>,
        );

        const step2 = screen.getByText("Step 2").closest("li");
        expect(step2).toHaveAttribute("aria-current", "true");
    });

    it("forwards ref to ol element", () => {
        const ref = React.createRef<HTMLOListElement>();
        render(
            <StepperExtended forwardedRef={ref} selectedStepId="step1" onSelectStep={mockOnSelectStep}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
            </StepperExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLOListElement);
    });

    it("renders step with disabled state", () => {
        render(
            <StepperExtended selectedStepId="step1" onSelectStep={mockOnSelectStep}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL} disabled>
                    Disabled Step
                </StepperExtended.Step>
            </StepperExtended>,
        );

        const disabledStep = screen.getByText("Disabled Step").closest("li");
        expect(disabledStep).toHaveAttribute("aria-disabled", "true");
        expect(disabledStep).toHaveAttribute("tabindex", "-1");
    });
});

describe("Stepper and StepperExtended Integration", () => {
    it("Stepper.Wrapper wraps content correctly", () => {
        const { container } = render(
            <Stepper.Wrapper data-testid="wrapper">
                <div>Content</div>
            </Stepper.Wrapper>,
        );

        const wrapper = container.querySelector('[data-testid="wrapper"]');
        expect(wrapper).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("StepperExtended.Wrapper wraps content correctly", () => {
        const { container } = render(
            <StepperExtended.Wrapper data-testid="wrapper">
                <div>Content</div>
            </StepperExtended.Wrapper>,
        );

        const wrapper = container.querySelector('[data-testid="wrapper"]');
        expect(wrapper).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });
});
