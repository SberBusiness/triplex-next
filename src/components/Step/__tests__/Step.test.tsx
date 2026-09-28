import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Step, calcPosition } from "../Step";
import { ETooltipAlign } from "../../Tooltip/enums";
import { ITooltipProps } from "../../Tooltip/types";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EStepPosition, EStepStatus } from "../enums";

/*
 * alignTip не попадает в разметку (десктопная подсказка использует его только для расчёта координат),
 * поэтому соответствие position -> alignTip проверяется на props, с которыми Step вызывает Tooltip.
 * Оригинальный Tooltip при этом продолжает рендериться — остальные тесты работают с настоящим поведением.
 */
const { tooltipCalls } = vi.hoisted(() => ({ tooltipCalls: [] as ITooltipProps[] }));

vi.mock("../../Tooltip/Tooltip", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../Tooltip/Tooltip")>();
    const OriginalTooltip = actual.Tooltip;

    const TooltipSpy = (props: ITooltipProps) => {
        tooltipCalls.push(props);

        return <OriginalTooltip {...props} />;
    };

    return {
        ...actual,
        Tooltip: Object.assign(TooltipSpy, {
            Target: OriginalTooltip.Target,
            Body: OriginalTooltip.Body,
            Link: OriginalTooltip.Link,
            XButton: OriginalTooltip.XButton,
            MobileHeader: OriginalTooltip.MobileHeader,
        }),
    };
});

const getStep = () => screen.getByTestId("step");

describe("Step", () => {
    beforeEach(() => {
        tooltipCalls.length = 0;
    });

    it("Should render step number with default props", () => {
        render(<Step step={1} status={EStepStatus.DEFAULT} data-testid="step" />);

        const step = getStep();

        expect(step).toBeInTheDocument();
        expect(step).toHaveClass("step");
        // size не передан — применяется EComponentSize.MD.
        expect(step).toHaveClass("md");
        expect(step).toHaveTextContent("1");
    });

    it.each([
        [EStepStatus.DEFAULT, "default"],
        [EStepStatus.DONE, "done"],
        [EStepStatus.ACTIVE, "active"],
        [EStepStatus.ERROR, "error"],
        [EStepStatus.WARNING, "warning"],
        [EStepStatus.DISABLED, "disabled"],
    ])("Should apply class for status %s", (status, className) => {
        render(<Step step={2} status={status} data-testid="step" />);

        expect(getStep()).toHaveClass(className);
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should apply class for size %s", (size, className) => {
        render(<Step step={3} status={EStepStatus.DEFAULT} size={size} data-testid="step" />);

        expect(getStep()).toHaveClass(className);
    });

    it("Should merge custom className into the root element", () => {
        render(<Step step={4} status={EStepStatus.ACTIVE} className="custom-class" data-testid="step" />);

        const step = getStep();

        expect(step).toHaveClass("custom-class");
        expect(step).toHaveClass("step");
        expect(step).toHaveClass("active");
    });

    it("Should spread rest props onto the root element", () => {
        const onClick = vi.fn();

        render(
            <Step
                step={5}
                status={EStepStatus.DEFAULT}
                id="step-id"
                aria-label="Шаг 5"
                onClick={onClick}
                data-testid="step"
            />,
        );

        const step = getStep();

        expect(step).toHaveAttribute("id", "step-id");
        expect(step).toHaveAttribute("aria-label", "Шаг 5");

        fireEvent.click(step);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0]).toMatchObject({ type: "click" });
    });

    it("Should forward ref to the root element", () => {
        const ref = createRef<HTMLDivElement>();

        render(<Step ref={ref} step={6} status={EStepStatus.DONE} data-testid="step" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getStep());
    });

    it("Should forward ref to the root element when tooltip content is rendered", () => {
        const ref = createRef<HTMLDivElement>();

        render(
            <Step ref={ref} step={7} status={EStepStatus.DONE} data-testid="step">
                Описание шага
            </Step>,
        );

        expect(ref.current).toBe(getStep());
    });

    it("Should call callback ref with the node and with null on unmount", () => {
        const setRef = vi.fn();

        const { unmount } = render(<Step ref={setRef} step={8} status={EStepStatus.DEFAULT} data-testid="step" />);

        expect(setRef).toHaveBeenCalledWith(getStep());

        unmount();

        expect(setRef).toHaveBeenLastCalledWith(null);
    });

    it("Should not render tooltip when children are not passed", () => {
        render(<Step step={9} status={EStepStatus.DEFAULT} data-testid="step" />);

        expect(tooltipCalls).toHaveLength(0);
    });

    it("Should show tooltip content on hover when children are passed", () => {
        render(
            <Step step={10} status={EStepStatus.ACTIVE} data-testid="step">
                Описание шага
            </Step>,
        );

        expect(tooltipCalls).toHaveLength(1);
        expect(screen.queryByText("Описание шага")).not.toBeInTheDocument();

        fireEvent.mouseEnter(getStep());

        expect(screen.getByText("Описание шага")).toBeInTheDocument();
    });

    it.each([
        [EStepPosition.XFirst, ETooltipAlign.START],
        [EStepPosition.Default, ETooltipAlign.CENTER],
        [EStepPosition.XLast, ETooltipAlign.END],
    ])("Should align tooltip tip for position %s", (position, alignTip) => {
        render(
            <Step step={11} status={EStepStatus.DEFAULT} position={position} data-testid="step">
                Описание шага
            </Step>,
        );

        expect(tooltipCalls[0].alignTip).toBe(alignTip);
    });

    it("Should center tooltip tip when position is not passed", () => {
        render(
            <Step step={12} status={EStepStatus.DEFAULT} data-testid="step">
                Описание шага
            </Step>,
        );

        expect(tooltipCalls[0].alignTip).toBe(ETooltipAlign.CENTER);
    });

    it("Should pass the root element as tooltip target", () => {
        render(
            <Step step={13} status={EStepStatus.DEFAULT} data-testid="step">
                Описание шага
            </Step>,
        );

        expect(tooltipCalls[0].targetRef.current).toBe(getStep());
    });
});

describe("calcPosition", () => {
    it.each([
        ["первый шаг", 3, 0, EStepPosition.XFirst],
        ["средний шаг", 3, 1, EStepPosition.Default],
        ["последний шаг", 3, 2, EStepPosition.XLast],
        ["единственный шаг", 1, 0, EStepPosition.XFirst],
        ["первый из двух", 2, 0, EStepPosition.XFirst],
        ["второй из двух", 2, 1, EStepPosition.XLast],
    ])("Should return position for %s", (_name, stepCount, index, expected) => {
        expect(calcPosition(stepCount, index)).toBe(expected);
    });
});
