import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { SliderExtended } from "../SliderExtended";
import { ISliderExtendedDotProps } from "../components/SliderExtendedDot/SliderExtendedDot";

interface IRenderParams {
    dotProps?: Partial<ISliderExtendedDotProps>;
    disabled?: boolean;
    reverse?: boolean;
    step?: number | number[];
    value?: number;
}

const renderDot = ({ dotProps, disabled, reverse, step = 1, value = 25 }: IRenderParams = {}) =>
    render(
        <SliderExtended min={0} max={100} step={step} size={EComponentSize.MD} disabled={disabled} reverse={reverse}>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={value} onChange={vi.fn()} {...dotProps} />
        </SliderExtended>,
    );

/** Рендерит слайдер с двумя ползунками. */
const renderTwoDots = (onChange = vi.fn()) =>
    render(
        <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={25} onChange={onChange} />
            <SliderExtended.Track />
            <SliderExtended.Dot value={75} onChange={onChange} />
        </SliderExtended>,
    );

describe("SliderExtendedDot", () => {
    it("renders slider role with aria values", () => {
        renderDot({ value: 25 });

        const dot = screen.getByRole("slider");

        expect(dot).toHaveAttribute("aria-valuemin", "0");
        expect(dot).toHaveAttribute("aria-valuenow", "25");
        expect(dot).toHaveAttribute("aria-valuemax", "100");
    });

    it("positions dot by value", () => {
        renderDot({ value: 25 });

        expect(screen.getByRole("slider")).toHaveStyle({ left: "25%" });
    });

    it("positions dot from the end in reverse slider", () => {
        renderDot({ reverse: true, value: 25 });

        expect(screen.getByRole("slider")).toHaveStyle({ left: "75%" });
    });

    it("renders children", () => {
        render(
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={25} onChange={vi.fn()}>
                    <SliderExtended.Tooltip value={25}>25</SliderExtended.Tooltip>
                </SliderExtended.Dot>
            </SliderExtended>,
        );

        expect(screen.getByText("25")).toBeInTheDocument();
    });

    it("merges className and style with own ones", () => {
        renderDot({ dotProps: { className: "custom-dot", style: { zIndex: 5 } }, value: 25 });

        const dot = screen.getByRole("slider");

        expect(dot).toHaveClass("sliderExtendedDot", "custom-dot");
        expect(dot).toHaveStyle({ left: "25%", zIndex: "5" });
    });

    it("forwards ref to the dot element", () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={25} onChange={vi.fn()} ref={ref} />
            </SliderExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toHaveClass("sliderExtendedDot");
    });

    it("is tabbable when it is the only dot", () => {
        renderDot();

        expect(screen.getByRole("slider")).toHaveAttribute("tabindex", "0");
    });

    it("is not tabbable when slider is disabled", () => {
        renderDot({ disabled: true });

        expect(screen.getByRole("slider")).toHaveAttribute("tabindex", "-1");
    });

    it("keeps only the dot with lower value tabbable until slider gets focus", () => {
        renderTwoDots();

        const [firstDot, secondDot] = screen.getAllByRole("slider");

        expect(firstDot).toHaveAttribute("tabindex", "0");
        expect(secondDot).toHaveAttribute("tabindex", "-1");
    });

    it("orders dots around the track when slider is focused", () => {
        renderTwoDots();

        const [firstDot, secondDot] = screen.getAllByRole("slider");

        fireEvent.focus(firstDot);

        expect(firstDot).toHaveAttribute("tabindex", "1");
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "2");
        expect(secondDot).toHaveAttribute("tabindex", "3");
    });

    it("calls onFocus and onBlur handlers of the consumer", () => {
        const onFocus = vi.fn();
        const onBlur = vi.fn();

        renderDot({ dotProps: { onBlur, onFocus } });

        const dot = screen.getByRole("slider");

        fireEvent.focus(dot);
        fireEvent.blur(dot);

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it.each([
        ["ArrowRight", EVENT_KEY_CODES.ARROW_RIGHT],
        ["ArrowUp", EVENT_KEY_CODES.ARROW_UP],
    ])("moves dot to the next step on %s", (_name, keyCode) => {
        const onChange = vi.fn();

        renderDot({ dotProps: { onChange }, step: 25, value: 25 });
        fireEvent.focus(screen.getByRole("slider"));
        fireEvent.keyDown(window, { keyCode });

        expect(onChange).toHaveBeenCalledWith(50);
    });

    it.each([
        ["ArrowLeft", EVENT_KEY_CODES.ARROW_LEFT],
        ["ArrowDown", EVENT_KEY_CODES.ARROW_DOWN],
    ])("moves dot to the previous step on %s", (_name, keyCode) => {
        const onChange = vi.fn();

        renderDot({ dotProps: { onChange }, step: 25, value: 25 });
        fireEvent.focus(screen.getByRole("slider"));
        fireEvent.keyDown(window, { keyCode });

        expect(onChange).toHaveBeenCalledWith(0);
    });

    it("moves dot along the custom step array", () => {
        const onChange = vi.fn();

        renderDot({ dotProps: { onChange }, step: [0, 10, 90, 100], value: 10 });
        fireEvent.focus(screen.getByRole("slider"));
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(onChange).toHaveBeenCalledWith(90);
    });

    it("prevents page scroll on arrow keys", () => {
        renderDot({ step: 25, value: 25 });
        fireEvent.focus(screen.getByRole("slider"));

        const notPrevented = fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(notPrevented).toBe(false);
    });

    it("does not move dot beyond the range bounds", () => {
        const onChange = vi.fn();

        renderDot({ dotProps: { onChange }, step: 25, value: 100 });
        fireEvent.focus(screen.getByRole("slider"));
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(onChange).not.toHaveBeenCalled();
    });

    it("does not listen to keyboard while dot is not focused", () => {
        const onChange = vi.fn();

        renderDot({ dotProps: { onChange }, step: 25, value: 25 });
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(onChange).not.toHaveBeenCalled();
    });
});
