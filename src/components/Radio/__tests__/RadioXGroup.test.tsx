import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TIndentSize } from "../../../consts/IndentConst";
import { Radio } from "../Radio";
import { RadioXGroup } from "../RadioXGroup";

const INDENTS = [12, 16, 20, 24, 28, 32] satisfies TIndentSize[];

describe("RadioXGroup", () => {
    it("renders its children in a radio group with the default indent", () => {
        render(
            <RadioXGroup aria-label="Способ оплаты">
                <Radio name="payment" value="card">
                    Картой
                </Radio>
                <Radio name="payment" value="cash">
                    Наличными
                </Radio>
            </RadioXGroup>,
        );

        const group = screen.getByRole("radiogroup", { name: "Способ оплаты" });

        expect(group).toHaveClass("radioXGroup", "indent-12");
        expect(within(group).getAllByRole("radio")).toHaveLength(2);
        expect(within(group).getByRole("radio", { name: "Картой" })).toHaveAttribute("value", "card");
        expect(within(group).getByRole("radio", { name: "Наличными" })).toHaveAttribute("value", "cash");
    });

    it.each(INDENTS)("applies indent %i", (indent) => {
        render(<RadioXGroup indent={indent} />);

        expect(screen.getByRole("radiogroup")).toHaveClass(`indent-${indent}`);
    });

    it("updates the indent when the prop changes", () => {
        const { rerender } = render(<RadioXGroup indent={16} />);
        const group = screen.getByRole("radiogroup");

        rerender(<RadioXGroup indent={32} />);

        expect(group).toHaveClass("indent-32");
        expect(group).not.toHaveClass("indent-16");
    });

    it("merges className and forwards HTML and ARIA attributes to the root", () => {
        render(
            <>
                <span id="payment-label">Способ оплаты</span>
                <RadioXGroup className="custom-group" id="payment-group" aria-labelledby="payment-label" tabIndex={0} />
            </>,
        );

        const group = screen.getByRole("radiogroup", { name: "Способ оплаты" });

        expect(group).toHaveClass("radioXGroup", "custom-group");
        expect(group).toHaveAttribute("id", "payment-group");
        expect(group).toHaveAttribute("aria-labelledby", "payment-label");
        expect(group).toHaveAttribute("tabindex", "0");
    });

    it("preserves the caller's role override", () => {
        render(<RadioXGroup role="group" aria-label="Варианты" />);

        expect(screen.getByRole("group", { name: "Варианты" })).toHaveClass("radioXGroup");
        expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
    });

    it("forwards an object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<RadioXGroup ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByRole("radiogroup"));
    });

    it("forwards a callback ref and clears it on unmount", () => {
        const ref = vi.fn();
        const { unmount } = render(<RadioXGroup ref={ref} />);

        expect(ref).toHaveBeenCalledWith(screen.getByRole("radiogroup"));

        unmount();

        expect(ref).toHaveBeenLastCalledWith(null);
    });

    it("allows native radio selection and bubbles onChange from enabled radios", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <RadioXGroup onChange={onChange}>
                <Radio name="payment" value="card" defaultChecked>
                    Картой
                </Radio>
                <Radio name="payment" value="cash">
                    Наличными
                </Radio>
                <Radio name="payment" value="transfer" disabled>
                    Переводом
                </Radio>
            </RadioXGroup>,
        );

        const card = screen.getByRole("radio", { name: "Картой" });
        const cash = screen.getByRole("radio", { name: "Наличными" });
        const transfer = screen.getByRole("radio", { name: "Переводом" });

        await user.click(cash);

        expect(cash).toBeChecked();
        expect(card).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ type: "change", target: cash }));

        await user.click(transfer);

        expect(transfer).toBeDisabled();
        expect(transfer).not.toBeChecked();
        expect(cash).toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
