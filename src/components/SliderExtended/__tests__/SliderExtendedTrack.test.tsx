import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { SliderExtended } from "../SliderExtended";
import { ISliderExtendedTrackProps } from "../components/SliderExtendedTrack/SliderExtendedTrack";

const renderSingleDotSlider = (trackProps?: Partial<ISliderExtendedTrackProps>) =>
    render(
        <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={25} onChange={vi.fn()} />
            <SliderExtended.Track {...trackProps} />
        </SliderExtended>,
    );

interface IRangeSliderParams {
    onChangeFirst?: () => void;
    onChangeSecond?: () => void;
    reverse?: boolean;
    trackProps?: Partial<ISliderExtendedTrackProps>;
}

const renderRangeSlider = ({
    onChangeFirst = vi.fn(),
    onChangeSecond = vi.fn(),
    reverse,
    trackProps,
}: IRangeSliderParams = {}) =>
    render(
        <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD} reverse={reverse}>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={25} onChange={onChangeFirst} />
            <SliderExtended.Track {...trackProps} />
            <SliderExtended.Dot value={50} onChange={onChangeSecond} />
        </SliderExtended>,
    );

describe("SliderExtendedTrack", () => {
    it("renders nothing until a dot is registered", () => {
        render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Track />
            </SliderExtended>,
        );

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("stretches from the rail start to the only dot", () => {
        renderSingleDotSlider();

        expect(screen.getByRole("button")).toHaveStyle({ left: "0%", right: "75%" });
    });

    it("stretches between two dots", () => {
        renderRangeSlider();

        expect(screen.getByRole("button")).toHaveStyle({ left: "25%", right: "50%" });
    });

    it("mirrors position in reverse slider", () => {
        renderRangeSlider({ reverse: true });

        expect(screen.getByRole("button")).toHaveStyle({ left: "50%", right: "25%" });
    });

    it("is static with a single dot", () => {
        renderSingleDotSlider();

        const track = screen.getByRole("button");

        expect(track).toHaveClass("staticSlider");
        expect(track).toHaveAttribute("tabindex", "-1");
    });

    it("is static when draggable is false", () => {
        renderRangeSlider({ trackProps: { draggable: false } });

        expect(screen.getByRole("button")).toHaveClass("staticSlider");
    });

    it("is not static with two dots", () => {
        renderRangeSlider();

        expect(screen.getByRole("button")).not.toHaveClass("staticSlider");
    });

    it("becomes tabbable between the dots when slider is focused", () => {
        renderRangeSlider();

        const track = screen.getByRole("button");

        expect(track).toHaveAttribute("tabindex", "-1");

        fireEvent.focus(track);

        expect(track).toHaveAttribute("tabindex", "2");
    });

    it("stays out of tab order when slider is disabled", () => {
        render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD} disabled>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={25} onChange={vi.fn()} />
                <SliderExtended.Track />
                <SliderExtended.Dot value={50} onChange={vi.fn()} />
            </SliderExtended>,
        );

        const track = screen.getByRole("button");

        fireEvent.focus(track);

        expect(track).toHaveAttribute("tabindex", "-1");
        expect(track).toHaveClass("disabled");
    });

    it("moves both dots to the next step on ArrowRight", () => {
        const onChangeFirst = vi.fn();
        const onChangeSecond = vi.fn();

        renderRangeSlider({ onChangeFirst, onChangeSecond });
        fireEvent.focus(screen.getByRole("button"));
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(onChangeFirst).toHaveBeenCalledWith(50);
        expect(onChangeSecond).toHaveBeenCalledWith(75);
    });

    it("moves both dots to the previous step on ArrowLeft", () => {
        const onChangeFirst = vi.fn();
        const onChangeSecond = vi.fn();

        renderRangeSlider({ onChangeFirst, onChangeSecond });
        fireEvent.focus(screen.getByRole("button"));
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });

        expect(onChangeFirst).toHaveBeenCalledWith(0);
        expect(onChangeSecond).toHaveBeenCalledWith(25);
    });

    it("highlights dots while the track is hovered", () => {
        renderRangeSlider();

        const track = screen.getByRole("button");

        fireEvent.mouseOver(track);

        expect(track).toHaveClass("hoverOrDragByMouse");
        screen.getAllByRole("slider").forEach((dot) => expect(dot).toHaveClass("dragByMouse"));

        fireEvent.mouseOut(track);

        expect(track).not.toHaveClass("hoverOrDragByMouse");
        screen.getAllByRole("slider").forEach((dot) => expect(dot).not.toHaveClass("dragByMouse"));
    });

    it("calls consumer handlers", () => {
        const onMouseOver = vi.fn();
        const onFocus = vi.fn();

        renderRangeSlider({ trackProps: { onFocus, onMouseOver } });

        const track = screen.getByRole("button");

        fireEvent.mouseOver(track);
        fireEvent.focus(track);

        expect(onMouseOver).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it("merges className and style, forwards ref", () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(
            <SliderExtended min={0} max={100} step={25} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={25} onChange={vi.fn()} />
                <SliderExtended.Track className="custom-track" style={{ opacity: 0.5 }} ref={ref} />
            </SliderExtended>,
        );

        const track = screen.getByRole("button");

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(track).toHaveClass("sliderExtendedTrack", "custom-track");
        expect(track).toHaveStyle({ left: "0%", opacity: "0.5" });
    });
});
