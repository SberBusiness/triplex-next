import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "@sberbusiness/triplex-next/components";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const getCheckbox = () => screen.getByRole("checkbox");
const getLabel = () => screen.getByRole("checkbox").closest("label");
/** Иконка галочки кодирует свой тип атрибутом name на svg. */
const getCheckmarkIconName = () => getLabel()?.querySelector("svg")?.getAttribute("name");

describe("Checkbox", () => {
    it("Should render with label", () => {
        render(<Checkbox>Checkbox label</Checkbox>);
        const checkbox = getCheckbox();
        const label = getLabel();

        expect(checkbox).toBeInTheDocument();
        expect(label).toHaveTextContent("Checkbox label");
        expect(label).toHaveClass("nonempty");
    });

    it("Should not apply nonempty class without children", () => {
        render(<Checkbox />);

        expect(getLabel()).not.toHaveClass("nonempty");
    });

    it("Should apply size classes to label only", () => {
        const { rerender } = render(<Checkbox size={EComponentSize.SM} />);
        const label = getLabel();
        expect(label).toHaveClass("sm");

        rerender(<Checkbox size={EComponentSize.MD} />);
        expect(label).toHaveClass("md");

        rerender(<Checkbox size={EComponentSize.LG} />);
        expect(label).toHaveClass("lg");

        // Размерные правила в LESS написаны как .sm & — класс размера нужен на label, внутренние элементы берут его как потомки.
        expect(getCheckbox()).not.toHaveClass("sm", "md", "lg");
    });

    it("Should apply md size class by default", () => {
        render(<Checkbox />);

        expect(getLabel()).toHaveClass("md");
    });

    it.each([
        [EComponentSize.SM, "b4"],
        [EComponentSize.MD, "b3"],
        [EComponentSize.LG, "b2"],
    ])("Should render label text of matching size for %s", (size, textSizeClassName) => {
        render(<Checkbox size={size}>Checkbox label</Checkbox>);

        expect(screen.getByText("Checkbox label")).toHaveClass(textSizeClassName);
    });

    it("Should pass className to root label", () => {
        render(<Checkbox className="customClassName" />);
        const label = getLabel();
        const checkbox = getCheckbox();

        expect(label).toHaveClass("customClassName");
        expect(checkbox).not.toHaveClass("customClassName");
    });

    it("Should merge className with labelAttributes className", () => {
        render(<Checkbox className="customClassName" labelAttributes={{ className: "labelClassName" }} />);
        const label = getLabel();

        expect(label).toHaveClass("label", "customClassName", "labelClassName");
    });

    it("Should pass labelAttributes to root label", () => {
        const handleFocus = vi.fn();
        render(<Checkbox labelAttributes={{ id: "labelId", onFocus: handleFocus }} />);
        const label = getLabel();

        expect(label).toHaveAttribute("id", "labelId");

        fireEvent.focus(getCheckbox());
        expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("Should pass rest props to input", () => {
        render(<Checkbox name="agreement" aria-label="Agreement" />);
        const checkbox = getCheckbox();

        expect(checkbox).toHaveAttribute("type", "checkbox");
        expect(checkbox).toHaveAttribute("name", "agreement");
        expect(screen.getByRole("checkbox", { name: "Agreement" })).toBe(checkbox);
        expect(getLabel()).not.toHaveAttribute("name");
    });

    it("Should apply checked state", () => {
        render(<Checkbox checked readOnly />);
        const checkbox = getCheckbox();
        expect(checkbox).toBeChecked();
    });

    it("Should render tick icon by default", () => {
        render(<Checkbox />);

        expect(getCheckmarkIconName()).toBe("CheckboxtickStrokeSrvIcon24");
    });

    it("Should render bulk icon in bulk mode", () => {
        render(<Checkbox bulk />);

        expect(getCheckmarkIconName()).toBe("CheckboxbulkStrokeSrvIcon24");
    });

    it("Should not pass bulk to input", () => {
        render(<Checkbox bulk />);

        expect(getCheckbox()).not.toHaveAttribute("bulk");
    });

    it("Should apply disabled state and class", () => {
        render(<Checkbox disabled />);
        const checkbox = getCheckbox();
        const label = getLabel();

        expect(checkbox).toBeDisabled();
        expect(label).toHaveClass("disabled");
    });

    it("Should handle click events", () => {
        const handleClick = vi.fn();
        render(<Checkbox onClick={handleClick} />);
        const checkbox = getCheckbox();

        fireEvent.click(checkbox);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("Should not handle click events when disabled", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        const handleChange = vi.fn();
        render(<Checkbox disabled onClick={handleClick} onChange={handleChange} />);
        const checkbox = getCheckbox();

        await user.click(checkbox);

        expect(handleClick).not.toHaveBeenCalled();
        expect(handleChange).not.toHaveBeenCalled();
        expect(checkbox).not.toBeChecked();
    });

    it("Should call onChange with checked target", () => {
        const handleChange = vi.fn();
        render(<Checkbox onChange={handleChange} />);
        const checkbox = getCheckbox();

        fireEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: checkbox }));
        expect(checkbox).toBeChecked();
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Checkbox ref={ref} />);
        const checkbox = getCheckbox();

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toBe(checkbox);
    });
});
