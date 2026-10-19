import React, { createRef, useState } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SkinProvider, TSkin } from "../index";
import { Stepper, StepperExtended, EStepperStepType } from "../../Stepper";

afterEach(cleanup);

describe("SkinProvider — stepper", () => {
    it("inherits the skin, follows selection from the keyboard and skips unavailable steps", async () => {
        const user = userEvent.setup();
        const ref = createRef<HTMLOListElement>();
        const onSelect = vi.fn();
        const Example = ({ skin }: { skin: TSkin }) => {
            const [selected, setSelected] = useState("review");
            return (
                <SkinProvider skin={skin}>
                    <Stepper
                        forwardedRef={ref}
                        aria-label="Payment steps"
                        className="consumerCarousel"
                        selectedStepId={selected}
                        onSelectStep={(id) => {
                            onSelect(id);
                            setSelected(id);
                        }}
                        steps={[
                            { id: "details", label: "Details", type: EStepperStepType.NEUTRAL },
                            { id: "review", label: "Review", type: EStepperStepType.NEUTRAL },
                            { id: "sign", label: "Sign", type: EStepperStepType.NEUTRAL, disabled: true },
                        ]}
                    />
                    <button>After steps</button>
                </SkinProvider>
            );
        };
        const { rerender } = render(<Example skin="wordart" />);
        const list = screen.getByRole("tablist", { name: "Payment steps" });
        const details = screen.getByRole("button", { name: "Details" });
        const review = screen.getByRole("button", { name: "Review" });
        const sign = screen.getByRole("button", { name: "Sign" });
        expect(ref.current).toBe(list);
        expect(list).toHaveClass("wordArtStepper");
        expect(details).toHaveClass("wordArtStepCompleted");
        expect(review).toHaveAttribute("aria-current", "true");
        expect(sign).toHaveAttribute("aria-disabled", "true");
        expect(sign).toHaveAttribute("tabindex", "-1");

        await user.tab();
        expect(details).toHaveFocus();
        expect(details).toHaveClass("wordArtStepFocusVisible");
        await user.keyboard("{Enter}");
        expect(onSelect).toHaveBeenLastCalledWith("details");
        expect(details).toHaveAttribute("aria-current", "true");
        expect(details).not.toHaveClass("wordArtStepCompleted");
        expect(review).toHaveClass("inactive");
        await user.tab();
        await user.keyboard(" ");
        expect(onSelect).toHaveBeenLastCalledWith("review");
        expect(details).toHaveClass("wordArtStepCompleted");
        await user.tab();
        expect(screen.getByRole("button", { name: "After steps" })).toHaveFocus();
        onSelect.mockClear();
        fireEvent.click(sign);
        fireEvent.keyDown(sign, { key: "Enter", code: "Enter" });
        expect(onSelect).not.toHaveBeenCalled();

        rerender(<Example skin={null} />);
        expect(ref.current).toBe(list);
        expect(list).not.toHaveClass("wordArtStepper");
        expect(details).toHaveClass("completed");
        expect(details).not.toHaveClass("wordArtStep", "wordArtStepCompleted");
        expect(review).toHaveAttribute("aria-current", "true");
        expect(list.closest(".consumerCarousel")).toBeInTheDocument();
    });

    it("supports manual StepperExtended composition, nested opt-out, refs and semantic states", () => {
        const listRef = createRef<HTMLOListElement>();
        const legacyRef = createRef<HTMLOListElement>();
        const stepRef = createRef<HTMLLIElement>();
        const Example = ({ skin }: { skin: TSkin }) => (
            <SkinProvider skin={skin}>
                <StepperExtended ref={listRef} forwardedRef={legacyRef} selectedStepId="error" onSelectStep={vi.fn()}>
                    <StepperExtended.Step
                        id="error"
                        type={EStepperStepType.ERROR}
                        className="consumerStep"
                        forwardedRef={stepRef}
                    >
                        Error
                    </StepperExtended.Step>
                    <StepperExtended.Step id="warning" type={EStepperStepType.WARNING} isInActiveStep>
                        Warning
                    </StepperExtended.Step>
                    <SkinProvider skin={null}>
                        <StepperExtended.Step id="native" type={EStepperStepType.NEUTRAL} isInActiveStep>
                            Native step
                        </StepperExtended.Step>
                    </SkinProvider>
                </StepperExtended>
            </SkinProvider>
        );
        const { rerender } = render(<Example skin="wordart" />);
        const error = screen.getByRole("button", { name: "Error" });
        const warning = screen.getByRole("button", { name: "Warning" });
        expect(listRef.current).toBe(legacyRef.current);
        expect(stepRef.current).toBe(error);
        expect(error).toHaveClass("consumerStep", "error", "wordArtStepError");
        expect(warning).toHaveClass("warning", "wordArtStepWarning");
        expect(error).not.toHaveClass("wordArtStepNeutral");
        expect(warning).not.toHaveClass("wordArtStepNeutral");
        expect(screen.getByRole("button", { name: "Native step" })).not.toHaveClass("wordArtStep");
        rerender(<Example skin={null} />);
        expect(stepRef.current).toBe(error);
        expect(error).toHaveClass("consumerStep", "error", "active");
        expect(error).not.toHaveClass("wordArtStepError");
        expect(warning).toHaveClass("warning", "inactive");
    });

    it("keeps the current stage identifiable when the completed form locks all steps", () => {
        const onSelect = vi.fn();
        render(
            <SkinProvider skin="wordart">
                <Stepper
                    selectedStepId="done"
                    onSelectStep={onSelect}
                    steps={[
                        { id: "details", label: "Details", type: EStepperStepType.NEUTRAL, disabled: true },
                        { id: "done", label: "Done", type: EStepperStepType.NEUTRAL, disabled: true },
                    ]}
                />
            </SkinProvider>,
        );
        const done = within(screen.getByRole("tablist")).getByRole("button", { name: "Done" });
        expect(done).toHaveAttribute("aria-current", "true");
        expect(done).toHaveAttribute("aria-disabled", "true");
        expect(done).toHaveClass("wordArtStep", "wordArtStepNeutral");
        fireEvent.click(done);
        expect(onSelect).not.toHaveBeenCalled();
    });
});
