import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "../Radio";
import { RadioYGroup } from "../RadioYGroup";

describe("RadioYGroup", () => {
    it("renders radio children inside a div with the radiogroup role", () => {
        render(
            <RadioYGroup>
                <Radio name="choice" value="first">
                    First
                </Radio>
                <Radio name="choice" value="second">
                    Second
                </Radio>
            </RadioYGroup>,
        );

        const group = screen.getByRole("radiogroup");

        expect(group).toBeInstanceOf(HTMLDivElement);
        expect(within(group).getAllByRole("radio")).toHaveLength(2);
    });

    it("renders without children", () => {
        render(<RadioYGroup />);

        expect(screen.getByRole("radiogroup")).toBeEmptyDOMElement();
    });

    it("merges className into the root element", () => {
        render(<RadioYGroup className="custom-group" />);

        expect(screen.getByRole("radiogroup")).toHaveClass("radioYGroup", "custom-group");
    });

    it("passes HTML and accessibility attributes to the root element", () => {
        render(
            <RadioYGroup
                id="choice-group"
                aria-label="Choices"
                data-choice="group"
                title="Choose an option"
                tabIndex={0}
            />,
        );

        const group = screen.getByRole("radiogroup", { name: "Choices" });

        expect(group).toHaveAttribute("id", "choice-group");
        expect(group).toHaveAttribute("data-choice", "group");
        expect(group).toHaveAttribute("title", "Choose an option");
        expect(group).toHaveAttribute("tabindex", "0");
    });

    it("allows the default role to be overridden", () => {
        render(<RadioYGroup role="group" aria-label="Choices" />);

        expect(screen.getByRole("group", { name: "Choices" })).toBeInstanceOf(HTMLDivElement);
        expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
    });

    it("forwards an object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<RadioYGroup ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByRole("radiogroup"));
    });

    it("forwards a callback ref and clears it on unmount", () => {
        const refCallback = vi.fn();
        const { unmount } = render(<RadioYGroup ref={refCallback} />);

        expect(refCallback).toHaveBeenCalledWith(screen.getByRole("radiogroup"));

        unmount();

        expect(refCallback).toHaveBeenLastCalledWith(null);
    });

    it("passes click events to the root handler", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<RadioYGroup onClick={onClick} />);

        const group = screen.getByRole("radiogroup");
        await user.click(group);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", target: group }));
    });

    it("passes a child radio change event to the group handler", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <RadioYGroup onChange={onChange}>
                <Radio name="choice" value="first">
                    First
                </Radio>
            </RadioYGroup>,
        );

        const radio = screen.getByRole("radio", { name: "First" });
        await user.click(radio);

        expect(radio).toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({ type: "change", target: expect.objectContaining({ value: "first" }) }),
        );
    });
});
