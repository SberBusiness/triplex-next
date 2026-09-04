import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChipSort } from "@sberbusiness/triplex-next/components/Chip/ChipSort";
import { EChipType } from "@sberbusiness/triplex-next/components/Chip/enums";
import { ISelectFieldOption } from "@sberbusiness/triplex-next/components/SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("ChipSort", () => {
    const options: ISelectFieldOption[] = [
        { id: "chip-sort-1", label: "По дате", value: "i1" },
        { id: "chip-sort-2", label: "По времени", value: "i2" },
        { id: "chip-sort-3", label: "По названию", value: "i3" },
    ];

    const handleChange = vi.fn();

    const renderChipSort = (props: Partial<React.ComponentProps<typeof ChipSort>> = {}) =>
        render(
            <ChipSort
                options={options}
                size={EComponentSize.MD}
                onChange={handleChange}
                data-testid="chip-sort"
                {...props}
            />,
        );

    /** Target — это Chip с role="combobox", role="button" из Chip перекрывается. */
    const getTarget = () => screen.getByRole("combobox");

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Should render with default props", () => {
        renderChipSort();

        const chipSort = screen.getByTestId("chip-sort");
        expect(chipSort).toBeInTheDocument();
        expect(chipSort).toHaveClass("chipGroupItem");
    });

    test("Should merge custom className into root element", () => {
        renderChipSort({ className: "custom-class" });

        const chipSort = screen.getByTestId("chip-sort");
        expect(chipSort).toHaveClass("chipGroupItem");
        expect(chipSort).toHaveClass("custom-class");
    });

    test("Should forward ref to target chip", () => {
        const ref = React.createRef<HTMLDivElement>();
        renderChipSort({ ref });

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(getTarget());
    });

    test("Should apply size and type props to target chip", () => {
        const { rerender } = renderChipSort({ size: EComponentSize.SM, type: EChipType.TYPE_2 });

        expect(getTarget()).toHaveClass("sm");
        expect(getTarget()).toHaveClass("type2");

        rerender(
            <ChipSort
                options={options}
                size={EComponentSize.LG}
                type={EChipType.TYPE_1}
                onChange={handleChange}
                data-testid="chip-sort"
            />,
        );

        expect(getTarget()).toHaveClass("lg");
        expect(getTarget()).toHaveClass("type1");
    });

    test("Should mark target as disabled when disabled prop is set", () => {
        renderChipSort({ disabled: true });

        expect(getTarget()).toHaveClass("disabled");
        expect(getTarget()).toHaveAttribute("tabindex", "-1");
    });

    describe("selected state", () => {
        test("Should not be selected when value is not set", () => {
            renderChipSort({ defaultValue: options[0] });

            expect(getTarget()).not.toHaveClass("selected");
        });

        test("Should not be selected when value deeply equals defaultValue", () => {
            renderChipSort({ defaultValue: { ...options[0] }, value: { ...options[0] } });

            expect(getTarget()).not.toHaveClass("selected");
        });

        test("Should be selected when value differs from defaultValue", () => {
            renderChipSort({ defaultValue: options[0], value: options[1] });

            expect(getTarget()).toHaveClass("selected");
        });

        test("Should be selected when value is set without defaultValue", () => {
            renderChipSort({ value: options[0] });

            expect(getTarget()).toHaveClass("selected");
        });
    });

    describe("accessibility", () => {
        test("Should render target as collapsed combobox", () => {
            renderChipSort();

            const target = getTarget();
            expect(target).toHaveAttribute("aria-expanded", "false");
            expect(target).toHaveAttribute("aria-controls");
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        test("Should link target with dropdown list through aria-controls", () => {
            renderChipSort();

            const target = getTarget();
            fireEvent.click(target);

            expect(target).toHaveAttribute("aria-expanded", "true");
            expect(screen.getByRole("listbox")).toHaveAttribute("id", target.getAttribute("aria-controls"));
        });

        test("Should give unique list id to every instance", () => {
            render(
                <>
                    <ChipSort options={options} size={EComponentSize.MD} onChange={handleChange} />
                    <ChipSort options={options} size={EComponentSize.MD} onChange={handleChange} />
                </>,
            );

            const [first, second] = screen.getAllByRole("combobox");

            expect(first.getAttribute("aria-controls")).toBeTruthy();
            expect(first.getAttribute("aria-controls")).not.toBe(second.getAttribute("aria-controls"));
        });
    });

    describe("keyboard", () => {
        test.each([
            ["Enter", "Enter"],
            ["Space", "Space"],
        ])("Should open dropdown on %s and prevent default", (_name, code) => {
            renderChipSort();

            const target = getTarget();
            const notPrevented = fireEvent.keyDown(target, { code });

            expect(notPrevented).toBe(false);
            expect(target).toHaveAttribute("aria-expanded", "true");
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        test("Should not close opened dropdown on Enter", () => {
            renderChipSort();

            const target = getTarget();
            fireEvent.click(target);
            expect(target).toHaveAttribute("aria-expanded", "true");

            fireEvent.keyDown(target, { code: "Enter" });

            expect(target).toHaveAttribute("aria-expanded", "true");
        });

        test("Should ignore other keys", () => {
            renderChipSort();

            const target = getTarget();
            fireEvent.keyDown(target, { code: "ArrowDown" });

            expect(target).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });
    });

    describe("dropdown", () => {
        test("Should toggle dropdown on target click", () => {
            renderChipSort();

            const target = getTarget();

            fireEvent.click(target);
            expect(screen.getByRole("listbox")).toBeInTheDocument();

            fireEvent.click(target);
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        test("Should call onChange with selected option and close dropdown", () => {
            renderChipSort({ value: options[0] });

            fireEvent.click(getTarget());
            fireEvent.click(screen.getByRole("option", { name: "По времени" }));

            expect(handleChange).toHaveBeenCalledTimes(1);
            expect(handleChange).toHaveBeenCalledWith(options[1]);
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        test("Should mark current value as selected option", () => {
            renderChipSort({ value: options[2] });

            fireEvent.click(getTarget());

            expect(screen.getByRole("option", { name: "По названию", selected: true })).toBeInTheDocument();
        });
    });
});
