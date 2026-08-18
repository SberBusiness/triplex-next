import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "../Checkbox";
import { CheckboxXGroup } from "../CheckboxXGroup";
import type { TIndentSize } from "../../../consts/IndentConst";

const getGroup = () => screen.getByRole("group");

describe("CheckboxXGroup", () => {
    it("Should render children inside group", () => {
        render(
            <CheckboxXGroup>
                <Checkbox>First</Checkbox>
                <Checkbox>Second</Checkbox>
            </CheckboxXGroup>,
        );
        const group = getGroup();

        expect(group).toBeInTheDocument();
        expect(group.tagName).toBe("DIV");
        expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });

    it("Should apply base class", () => {
        render(<CheckboxXGroup />);

        expect(getGroup()).toHaveClass("checkboxXGroup");
    });

    it("Should apply indent 12 class by default", () => {
        render(<CheckboxXGroup />);

        expect(getGroup()).toHaveClass("indent-12");
    });

    it.each<TIndentSize>([12, 16, 20, 24, 28, 32])("Should apply indent class for %s", (indent) => {
        render(<CheckboxXGroup indent={indent} />);

        expect(getGroup()).toHaveClass(`indent-${indent}`);
    });

    it("Should not pass indent to root element as attribute", () => {
        render(<CheckboxXGroup indent={16} />);

        expect(getGroup()).not.toHaveAttribute("indent");
    });

    it("Should merge className into root element", () => {
        render(<CheckboxXGroup className="customClassName" />);

        expect(getGroup()).toHaveClass("checkboxXGroup", "indent-12", "customClassName");
    });

    it("Should pass rest props to root element", () => {
        const handleClick = vi.fn();
        render(<CheckboxXGroup id="groupId" aria-label="Group label" data-test-id="group" onClick={handleClick} />);
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
        render(<CheckboxXGroup {...rest} />);

        expect(getGroup()).toBeInTheDocument();
        expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<CheckboxXGroup ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getGroup());
    });
});
