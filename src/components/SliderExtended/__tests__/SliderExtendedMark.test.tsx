import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { SliderExtended } from "../SliderExtended";

interface IRenderParams {
    disabled?: boolean;
    onChange?: () => void;
    reverse?: boolean;
    value?: number;
}

const MARK_VALUES = [0, 25, 50, 75, 100];

const renderWithMarks = ({ disabled, onChange = vi.fn(), reverse, value = 50 }: IRenderParams = {}) =>
    render(
        <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD} disabled={disabled} reverse={reverse}>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={value} onChange={onChange} />
            <SliderExtended.Track />
            <SliderExtended.Marks>
                {MARK_VALUES.map((markValue) => (
                    <SliderExtended.Mark key={markValue} value={markValue}>
                        {markValue}
                    </SliderExtended.Mark>
                ))}
            </SliderExtended.Marks>
        </SliderExtended>,
    );

/** Возвращает корневой элемент метки с указанным текстом. */
const getMark = (label: string) => {
    const mark = screen.getByText(label).closest(".sliderExtendedMark");

    if (!mark) {
        throw new Error(`Mark ${label} is not rendered`);
    }

    return mark;
};

describe("SliderExtendedMark", () => {
    it("renders label of every mark", () => {
        renderWithMarks();

        MARK_VALUES.forEach((markValue) => expect(screen.getByText(String(markValue))).toBeInTheDocument());
    });

    it("positions mark by its value", () => {
        renderWithMarks();

        expect(getMark("25")).toHaveStyle({ left: "25%" });
    });

    it("pins the last mark to the rail end", () => {
        renderWithMarks();

        expect(getMark("100")).toHaveStyle({ right: "0px" });
    });

    it("mirrors mark position in reverse slider", () => {
        renderWithMarks({ reverse: true });

        expect(getMark("25")).toHaveClass("reverse");
        expect(getMark("25")).toHaveStyle({ left: "75%" });
    });

    it("marks the position of the dot as active", () => {
        renderWithMarks({ value: 50 });

        expect(getMark("50")).toHaveClass("active");
        expect(getMark("25")).not.toHaveClass("active");
    });

    it("does not mark active position in disabled slider", () => {
        renderWithMarks({ disabled: true, value: 50 });

        expect(getMark("50")).not.toHaveClass("active");
        expect(getMark("50")).toHaveClass("disabled");
    });

    it("highlights dots of the selected range", () => {
        renderWithMarks({ value: 50 });

        expect(getMark("25")?.querySelector(".sliderExtendedMarkDot")).toHaveClass("inSelectedRange");
        expect(getMark("75")?.querySelector(".sliderExtendedMarkDot")).not.toHaveClass("inSelectedRange");
    });

    it("moves the nearest dot on mark click", () => {
        const onChange = vi.fn();

        renderWithMarks({ onChange, value: 50 });
        fireEvent.click(screen.getByText("75"));

        expect(onChange).toHaveBeenCalledWith(75);
    });

    it("merges className and forwards ref", () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={50} onChange={vi.fn()} />
                <SliderExtended.Marks className="custom-marks">
                    <SliderExtended.Mark value={0} className="custom-mark" ref={ref}>
                        0
                    </SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toHaveClass("sliderExtendedMark", "custom-mark");
        expect(document.querySelector(".sliderExtendedMarks")).toHaveClass("custom-marks");
    });

    it("forwards ref of the marks container", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={50} onChange={vi.fn()} />
                <SliderExtended.Marks ref={ref} />
            </SliderExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("sliderExtendedMarks");
    });
});
