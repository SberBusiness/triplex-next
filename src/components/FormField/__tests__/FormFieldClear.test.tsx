import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormFieldClear } from "@sberbusiness/triplex-next/components";

describe("FormFieldClear", () => {
    it("renders a button", () => {
        render(<FormFieldClear aria-label="Clear" />);

        const button = screen.getByRole("button", { name: "Clear" });

        expect(button).toHaveClass("formFieldClear");
        expect(button).toHaveAttribute("type", "button");
    });

    it("prevents focus on mousedown", () => {
        render(<FormFieldClear aria-label="Clear" />);

        const prevented = !fireEvent.mouseDown(screen.getByRole("button"));

        expect(prevented).toBe(true);
    });

    it("calls onMouseDown with the event", () => {
        const handleMouseDown = vi.fn();

        render(<FormFieldClear aria-label="Clear" onMouseDown={handleMouseDown} />);

        const button = screen.getByRole("button");
        fireEvent.mouseDown(button);

        expect(handleMouseDown).toHaveBeenCalledTimes(1);
        expect(handleMouseDown).toHaveBeenCalledWith(expect.objectContaining({ target: button, type: "mousedown" }));
    });

    it("calls onClick", () => {
        const handleClick = vi.fn();

        render(<FormFieldClear aria-label="Clear" onClick={handleClick} />);

        fireEvent.click(screen.getByRole("button"));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call handlers when disabled", () => {
        const handleClick = vi.fn();

        render(<FormFieldClear aria-label="Clear" disabled onClick={handleClick} />);

        const button = screen.getByRole("button");

        expect(button).toBeDisabled();

        fireEvent.click(button);

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("merges custom className into the root element", () => {
        render(<FormFieldClear aria-label="Clear" className="custom-clear" />);

        const button = screen.getByRole("button");

        expect(button).toHaveClass("custom-clear");
        expect(button).toHaveClass("formFieldClear");
    });

    it("forwards ref to the button element", () => {
        const ref = React.createRef<HTMLButtonElement>();

        render(<FormFieldClear aria-label="Clear" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button"));
    });
});
