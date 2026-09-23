import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { StepperExtended } from "../StepperExtended";
import { StepperStep } from "../StepperStep";
import { EStepperStepType } from "../enums";
import { EComponentSize } from "../../../enums";

/** Рендер степпера с тремя шагами: выбранный, обычный и переданный отдельными props. */
const renderStepper = (props: Partial<React.ComponentProps<typeof StepperExtended>> = {}) => {
    const { onSelectStep = vi.fn(), selectedStepId = "step1", children, ...restProps } = props;

    const result = render(
        <StepperExtended selectedStepId={selectedStepId} onSelectStep={onSelectStep} {...restProps}>
            {children ?? (
                <>
                    <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                        Step 1
                    </StepperExtended.Step>
                    <StepperExtended.Step id="step2" type={EStepperStepType.NEUTRAL}>
                        Step 2
                    </StepperExtended.Step>
                    <StepperExtended.Step id="step3" type={EStepperStepType.NEUTRAL} disabled>
                        Step 3
                    </StepperExtended.Step>
                </>
            )}
        </StepperExtended>,
    );

    return { ...result, onSelectStep };
};

/** Элемент li, содержащий переданный текст. */
const getStep = (label: string): HTMLLIElement => {
    const step = screen.getByText(label).closest("li");

    expect(step).not.toBeNull();

    return step as HTMLLIElement;
};

describe("StepperExtended", () => {
    it("renders children inside ol with tablist role", () => {
        renderStepper();

        const list = screen.getByRole("tablist");

        expect(list.tagName).toBe("OL");
        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
        expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("renders empty list without children", () => {
        render(<StepperExtended onSelectStep={vi.fn()} />);

        expect(screen.getByRole("tablist")).toBeEmptyDOMElement();
    });

    it("merges custom className into root element", () => {
        renderStepper({ className: "custom-class" });

        const list = screen.getByRole("tablist");

        expect(list).toHaveClass("stepperExtended");
        expect(list).toHaveClass("custom-class");
    });

    it("spreads rest props onto root element", () => {
        renderStepper({ id: "stepper-id", "aria-label": "Steps" });

        const list = screen.getByRole("tablist");

        expect(list).toHaveAttribute("id", "stepper-id");
        expect(list).toHaveAttribute("aria-label", "Steps");
    });

    it("allows overriding role through rest props", () => {
        renderStepper({ role: "list" });

        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("forwards ref to ol element", () => {
        const ref = React.createRef<HTMLOListElement>();

        render(
            <StepperExtended ref={ref} selectedStepId="step1" onSelectStep={vi.fn()}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
            </StepperExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLOListElement);
        expect(ref.current).toBe(screen.getByRole("tablist"));
    });

    it("fills legacy forwardedRef prop alongside ref", () => {
        const ref = React.createRef<HTMLOListElement>();
        const forwardedRef = React.createRef<HTMLOListElement>();

        render(
            <StepperExtended ref={ref} forwardedRef={forwardedRef} selectedStepId="step1" onSelectStep={vi.fn()}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
            </StepperExtended>,
        );

        expect(forwardedRef.current).toBe(screen.getByRole("tablist"));
        expect(ref.current).toBe(forwardedRef.current);
    });

    it("supports callback forwardedRef", () => {
        const forwardedRef = vi.fn();

        render(
            <StepperExtended forwardedRef={forwardedRef} selectedStepId="step1" onSelectStep={vi.fn()}>
                <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                    Step 1
                </StepperExtended.Step>
            </StepperExtended>,
        );

        expect(forwardedRef).toHaveBeenCalledWith(screen.getByRole("tablist"));
    });

    it("exposes StepperStep as static Step property", () => {
        expect(StepperExtended.Step).toBe(StepperStep);
    });

    it("has displayName", () => {
        expect(StepperExtended.displayName).toBe("StepperExtended");
    });

    describe("context", () => {
        it("passes default size LG to steps", () => {
            renderStepper();

            expect(getStep("Step 1")).toHaveClass("lg");
        });

        it.each([
            [EComponentSize.SM, "sm"],
            [EComponentSize.MD, "md"],
            [EComponentSize.LG, "lg"],
        ])("passes size %s to steps", (size, expectedClassName) => {
            renderStepper({ size });

            expect(getStep("Step 1")).toHaveClass(expectedClassName);
        });

        it("marks only the selected step with aria-current and active class", () => {
            renderStepper({ selectedStepId: "step2" });

            expect(getStep("Step 2")).toHaveAttribute("aria-current", "true");
            expect(getStep("Step 2")).toHaveClass("active");
            expect(getStep("Step 1")).not.toHaveAttribute("aria-current");
            expect(getStep("Step 1")).toHaveClass("completed");
        });

        it("marks no step as selected when selectedStepId is not passed", () => {
            render(
                <StepperExtended onSelectStep={vi.fn()}>
                    <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                        Step 1
                    </StepperExtended.Step>
                    <StepperExtended.Step id="step2" type={EStepperStepType.NEUTRAL}>
                        Step 2
                    </StepperExtended.Step>
                </StepperExtended>,
            );

            expect(getStep("Step 1")).not.toHaveAttribute("aria-current");
            expect(getStep("Step 2")).not.toHaveAttribute("aria-current");
        });

        it("updates selected step when selectedStepId changes", () => {
            const { rerender } = renderStepper({ selectedStepId: "step1" });

            expect(getStep("Step 1")).toHaveAttribute("aria-current", "true");

            rerender(
                <StepperExtended selectedStepId="step2" onSelectStep={vi.fn()}>
                    <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                        Step 1
                    </StepperExtended.Step>
                    <StepperExtended.Step id="step2" type={EStepperStepType.NEUTRAL}>
                        Step 2
                    </StepperExtended.Step>
                </StepperExtended>,
            );

            expect(getStep("Step 1")).not.toHaveAttribute("aria-current");
            expect(getStep("Step 2")).toHaveAttribute("aria-current", "true");
        });
    });

    describe("onSelectStep", () => {
        it("is called with step id on click", async () => {
            const user = userEvent.setup();
            const { onSelectStep } = renderStepper();

            await user.click(getStep("Step 2"));

            expect(onSelectStep).toHaveBeenCalledWith("step2");
        });

        it("is called with step id on Enter", async () => {
            const user = userEvent.setup();
            const { onSelectStep } = renderStepper();

            await user.tab();
            await user.tab();
            expect(getStep("Step 2")).toHaveFocus();

            await user.keyboard("{Enter}");

            expect(onSelectStep).toHaveBeenCalledWith("step2");
        });

        it("is called with step id on Space", async () => {
            const user = userEvent.setup();
            const { onSelectStep } = renderStepper();

            await user.tab();
            await user.tab();
            await user.keyboard(" ");

            expect(onSelectStep).toHaveBeenCalledWith("step2");
        });

        it("skips disabled steps in keyboard tab order", async () => {
            const user = userEvent.setup();

            renderStepper();

            await user.tab();
            await user.tab();
            await user.tab();

            expect(getStep("Step 3")).not.toHaveFocus();
        });

        it("is called when the already selected step is clicked", async () => {
            const user = userEvent.setup();
            const { onSelectStep } = renderStepper({ selectedStepId: "step1" });

            await user.click(getStep("Step 1"));

            expect(onSelectStep).toHaveBeenCalledWith("step1");
        });

        it("is not called for a disabled step", async () => {
            const user = userEvent.setup();
            const { onSelectStep } = renderStepper();

            await user.click(getStep("Step 3"));

            expect(onSelectStep).not.toHaveBeenCalled();
        });

        it("reaches steps through the latest handler after rerender", async () => {
            const user = userEvent.setup();
            const nextOnSelectStep = vi.fn();
            const { rerender } = renderStepper();

            rerender(
                <StepperExtended selectedStepId="step1" onSelectStep={nextOnSelectStep}>
                    <StepperExtended.Step id="step1" type={EStepperStepType.NEUTRAL}>
                        Step 1
                    </StepperExtended.Step>
                    <StepperExtended.Step id="step2" type={EStepperStepType.NEUTRAL}>
                        Step 2
                    </StepperExtended.Step>
                </StepperExtended>,
            );

            await user.click(getStep("Step 2"));

            expect(nextOnSelectStep).toHaveBeenCalledWith("step2");
        });
    });
});
