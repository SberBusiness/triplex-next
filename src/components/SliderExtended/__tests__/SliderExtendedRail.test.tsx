import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { SliderExtended } from "../SliderExtended";

/** Полоса шириной 100px, начинающаяся в нуле: позиция курсора в px совпадает с процентами. */
const mockRailSize = (railNode: Element) => {
    railNode.getBoundingClientRect = () => ({ left: 0 }) as DOMRect;
    Object.defineProperty(railNode, "offsetWidth", { value: 100, configurable: true });
};

const getRail = (container: HTMLElement) => {
    const rail = container.querySelector(".sliderExtendedRail");

    if (!rail) {
        throw new Error("Rail is not rendered");
    }

    mockRailSize(rail);

    return rail;
};

describe("SliderExtendedRail", () => {
    it("moves the only dot to the step nearest to the click", () => {
        const onChange = vi.fn();
        const { container } = render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={0} onChange={onChange} />
            </SliderExtended>,
        );

        fireEvent.click(getRail(container), { clientX: 60 });

        expect(onChange).toHaveBeenCalledWith(50);
    });

    it("moves the dot nearest to the clicked value", () => {
        const onChangeFirst = vi.fn();
        const onChangeSecond = vi.fn();
        const { container } = render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={0} onChange={onChangeFirst} />
                <SliderExtended.Track />
                <SliderExtended.Dot value={100} onChange={onChangeSecond} />
            </SliderExtended>,
        );

        fireEvent.click(getRail(container), { clientX: 80 });

        expect(onChangeSecond).toHaveBeenCalledWith(75);
        expect(onChangeFirst).not.toHaveBeenCalled();
    });

    it("counts click position from the end in reverse slider", () => {
        const onChange = vi.fn();
        const { container } = render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD} reverse>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={0} onChange={onChange} />
            </SliderExtended>,
        );

        fireEvent.click(getRail(container), { clientX: 20 });

        expect(onChange).toHaveBeenCalledWith(75);
    });

    it("calls onClick of the consumer", () => {
        const onClick = vi.fn();
        const { container } = render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail onClick={onClick} />
                <SliderExtended.Dot value={0} onChange={vi.fn()} />
            </SliderExtended>,
        );

        fireEvent.click(getRail(container), { clientX: 60 });

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not throw when there are no dots", () => {
        const { container } = render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail />
            </SliderExtended>,
        );

        expect(() => fireEvent.click(getRail(container), { clientX: 60 })).not.toThrow();
    });

    it("merges className and forwards ref", () => {
        const ref = React.createRef<HTMLDivElement>();
        const { container } = render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail className="custom-rail" ref={ref} />
                <SliderExtended.Dot value={0} onChange={vi.fn()} />
            </SliderExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(container.querySelector(".sliderExtendedRail")).toHaveClass("custom-rail");
        expect(ref.current).toHaveClass("sliderExtendedRail");
    });
});
