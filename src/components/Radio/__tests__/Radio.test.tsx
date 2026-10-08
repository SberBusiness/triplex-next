import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "@sberbusiness/triplex-next/components/Radio";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const getRadio = () => screen.getByRole("radio");
const getLabel = () => screen.getByRole("radio").closest("label");

describe("Radio", () => {
    it("Should render with default props", () => {
        render(<Radio>Radio text</Radio>);

        const radio = getRadio();
        const label = getLabel();

        expect(radio).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(radio).toHaveAttribute("type", "radio");
        expect(radio).toHaveClass("md");
        expect(label).toHaveClass("md", "nonempty");
        expect(screen.getByRole("radio", { name: "Radio text" })).toBe(radio);
        expect(radio).not.toBeChecked();
        expect(radio).not.toBeDisabled();
    });

    it.each([EComponentSize.SM, EComponentSize.MD, EComponentSize.LG])("Should apply size classes for %s", (size) => {
        render(<Radio size={size}>Radio text</Radio>);

        expect(getLabel()).toHaveClass(size);
        expect(getRadio()).toHaveClass(size);
    });

    it.each([
        [EComponentSize.SM, "b4"],
        [EComponentSize.MD, "b3"],
        [EComponentSize.LG, "b2"],
    ])("Should render label text of matching size for %s", (size, textSizeClassName) => {
        render(<Radio size={size}>Radio text</Radio>);

        expect(screen.getByText("Radio text")).toHaveClass(textSizeClassName);
    });

    it("Should render with custom className", () => {
        render(<Radio className="custom-radio">Radio text</Radio>);

        const radio = getRadio();
        expect(radio).toHaveClass("custom-radio");
        expect(getLabel()).not.toHaveClass("custom-radio");
    });

    it("Should handle checked state", () => {
        render(
            <Radio checked readOnly>
                Checked radio
            </Radio>,
        );

        const radio = getRadio();
        expect(radio).toBeChecked();
    });

    it("Should handle disabled state", () => {
        render(<Radio disabled>Disabled radio</Radio>);

        const radio = getRadio();

        expect(radio).toBeDisabled();
        expect(getLabel()).toHaveClass("disabled");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Radio ref={ref}>Radio text</Radio>);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toHaveAttribute("type", "radio");
    });

    it("Should handle function ref correctly", () => {
        const refCallback = vi.fn();
        render(<Radio ref={refCallback}>Radio text</Radio>);

        expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it("Should render radio icon", () => {
        render(<Radio>Radio text</Radio>);

        const radioIcon = document.querySelector(".radioIcon");
        expect(radioIcon).toBeInTheDocument();
    });

    it("Should apply labelAttributes separately from input attributes", () => {
        render(
            <Radio
                id="radio-input"
                className="custom-radio"
                labelAttributes={{ id: "radio-label", className: "custom-label", title: "Radio label" }}
            >
                Radio text
            </Radio>,
        );

        expect(getLabel()).toHaveAttribute("id", "radio-label");
        expect(getLabel()).toHaveAttribute("title", "Radio label");
        expect(getLabel()).toHaveClass("label", "custom-label");
        expect(getLabel()).not.toHaveClass("custom-radio");
        expect(getRadio()).toHaveAttribute("id", "radio-input");
        expect(getRadio()).toHaveClass("radio", "custom-radio");
        expect(getRadio()).not.toHaveClass("custom-label");
        expect(getRadio()).not.toHaveAttribute("title");
    });

    it("Should pass native input attributes to input", () => {
        render(<Radio name="delivery" value="courier" aria-label="Courier delivery" required />);

        const radio = screen.getByRole("radio", { name: "Courier delivery" });
        expect(radio).toHaveAttribute("name", "delivery");
        expect(radio).toHaveAttribute("value", "courier");
        expect(radio).toBeRequired();
        expect(getLabel()).not.toHaveAttribute("name");
        expect(getLabel()).not.toHaveAttribute("value");
        expect(getLabel()).not.toHaveAttribute("aria-label");
    });

    it("Should preserve native selection within a shared name", async () => {
        const user = userEvent.setup();
        render(
            <>
                <Radio name="delivery" value="courier">
                    Courier
                </Radio>
                <Radio name="delivery" value="pickup" defaultChecked>
                    Pickup
                </Radio>
            </>,
        );
        const courier = screen.getByRole("radio", { name: "Courier" });
        const pickup = screen.getByRole("radio", { name: "Pickup" });

        expect(courier).not.toBeChecked();
        expect(pickup).toBeChecked();

        await user.click(courier);

        expect(courier).toBeChecked();
        expect(pickup).not.toBeChecked();
    });

    it("Should call onChange with the selected input and value", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        render(
            <Radio name="delivery" value="courier" onChange={handleChange}>
                Courier
            </Radio>,
        );
        const radio = getRadio();

        await user.click(screen.getByText("Courier"));

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "change",
                target: expect.objectContaining({ checked: true, name: "delivery", value: "courier" }),
            }),
        );
        expect(radio).toBeChecked();

        await user.click(radio);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(radio).toBeChecked();
    });

    it("Should keep controlled checked state until props change", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        const { rerender } = render(
            <Radio checked={false} onChange={handleChange}>
                Radio text
            </Radio>,
        );
        const radio = getRadio();

        await user.click(radio);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: radio }));
        expect(radio).not.toBeChecked();

        rerender(
            <Radio checked onChange={handleChange}>
                Radio text
            </Radio>,
        );

        expect(radio).toBeChecked();
    });

    it("Should not handle click or change events when disabled", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        const handleChange = vi.fn();
        render(
            <Radio disabled onClick={handleClick} onChange={handleChange}>
                Disabled radio
            </Radio>,
        );

        await user.click(getRadio());
        await user.click(screen.getByText("Disabled radio"));

        expect(handleClick).not.toHaveBeenCalled();
        expect(handleChange).not.toHaveBeenCalled();
        expect(getRadio()).not.toBeChecked();
    });

    it("Should support keyboard focus and selection", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        render(<Radio onChange={handleChange}>Radio text</Radio>);
        const radio = getRadio();

        await user.tab();

        expect(radio).toHaveFocus();

        await user.keyboard(" ");

        expect(radio).toBeChecked();
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: radio }));
    });

    it("Should render without a nonempty label state when children are omitted", () => {
        render(<Radio aria-label="Radio option" />);

        expect(getLabel()).not.toHaveClass("nonempty");
        expect(getLabel()).toHaveTextContent("");
        expect(screen.getByRole("radio", { name: "Radio option" })).toBeInTheDocument();
    });
});
