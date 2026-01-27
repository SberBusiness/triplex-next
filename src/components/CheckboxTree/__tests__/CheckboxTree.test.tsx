import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CheckboxTree } from "../CheckboxTree";
import { ICheckboxTreeCheckboxData } from "../types";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const getCheckboxes = () => screen.getAllByRole("checkbox");

describe("CheckboxTree", () => {
    const getMockCheckboxes = (): ICheckboxTreeCheckboxData[] => [
        {
            id: "1",
            label: "Parent 1",
            checked: false,
            children: [
                {
                    id: "1-1",
                    label: "Child 1-1",
                    checked: false,
                },
                {
                    id: "1-2",
                    label: "Child 1-2",
                    checked: false,
                },
            ],
        },
        {
            id: "2",
            label: "Parent 2",
            checked: false,
        },
    ];

    it("Should render correctly", () => {
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} />);

        expect(screen.getByText("Parent 1")).toBeInTheDocument();
        expect(screen.getByText("Parent 2")).toBeInTheDocument();
        expect(screen.getByText("Child 1-1")).toBeInTheDocument();
        expect(screen.getByText("Child 1-2")).toBeInTheDocument();

        const checkboxes = getCheckboxes();

        checkboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked();
        });
    });

    it("Should render checkboxes with checked state", () => {
        const checkedCheckboxes: ICheckboxTreeCheckboxData[] = [
            {
                id: "1",
                label: "Checked Parent",
                checked: true,
            },
        ];

        render(<CheckboxTree checkboxes={checkedCheckboxes} onChange={vi.fn()} />);

        const checkbox = getCheckboxes()[0];
        expect(checkbox).toBeChecked();
    });

    it("Should apply size prop correctly", () => {
        const { rerender } = render(
            <CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} size={EComponentSize.SM} />,
        );

        const checkboxes = getCheckboxes();
        checkboxes.forEach((checkbox) => {
            const label = checkbox.closest("label");
            expect(label).toHaveClass("sm");
        });

        rerender(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={vi.fn()} size={EComponentSize.LG} />);

        checkboxes.forEach((checkbox) => {
            const label = checkbox.closest("label");
            expect(label).toHaveClass("lg");
        });
    });

    it("Should call onChange when checkbox is clicked", () => {
        const handleChange = vi.fn();
        render(<CheckboxTree checkboxes={getMockCheckboxes()} onChange={handleChange} />);

        const firstCheckbox = getCheckboxes()[0];
        fireEvent.click(firstCheckbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ id: "1" })]));
    });
});
