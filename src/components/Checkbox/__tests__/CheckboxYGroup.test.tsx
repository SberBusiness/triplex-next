import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "../Checkbox";
import { CheckboxYGroup } from "../CheckboxYGroup";

const getGroup = () => screen.getByRole("group");

describe("CheckboxYGroup", () => {
    it("Should render children inside group", () => {
        render(
            <CheckboxYGroup>
                <Checkbox>First</Checkbox>
                <Checkbox>Second</Checkbox>
            </CheckboxYGroup>,
        );
        const group = getGroup();

        expect(group).toBeInTheDocument();
        expect(group.tagName).toBe("DIV");
        expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });

    it("Should render without children", () => {
        render(<CheckboxYGroup />);

        expect(getGroup()).toBeEmptyDOMElement();
    });

    it("Should apply base class", () => {
        render(<CheckboxYGroup />);

        expect(getGroup()).toHaveClass("checkboxYGroup");
    });

    it("Should merge className into root element", () => {
        render(<CheckboxYGroup className="customClassName" />);

        expect(getGroup()).toHaveClass("checkboxYGroup", "customClassName");
    });

    it("Should pass rest props to root element", () => {
        const handleClick = vi.fn();
        render(<CheckboxYGroup id="groupId" aria-label="Group label" data-test-id="group" onClick={handleClick} />);
        const group = getGroup();

        expect(group).toHaveAttribute("id", "groupId");
        expect(group).toHaveAttribute("data-test-id", "group");
        expect(screen.getByRole("group", { name: "Group label" })).toBe(group);

        fireEvent.click(group);
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: group }));
    });

    it("Should keep group role when role comes with rest props", () => {
        const rest: React.HTMLAttributes<HTMLDivElement> = { role: "list" };
        render(<CheckboxYGroup {...rest} />);

        expect(getGroup()).toBeInTheDocument();
        expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<CheckboxYGroup ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getGroup());
    });
});
