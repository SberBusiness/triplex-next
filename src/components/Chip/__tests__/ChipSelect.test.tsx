import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ChipSelect } from "@sberbusiness/triplex-next/components/Chip/ChipSelect/ChipSelect";
import { ISelectFieldOption } from "@sberbusiness/triplex-next/components/SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EChipType } from "../enums";

describe("ChipSelect", () => {
    const options: ISelectFieldOption[] = [
        { id: "1", value: "option1", label: "Первая опция" },
        { id: "2", value: "option2", label: "Вторая опция" },
    ];

    test("renders label and role button when value not selected", () => {
        const clearSelected = () => {};
        const onChange = () => {};

        render(
            <ChipSelect
                options={options}
                onChange={onChange}
                clearSelected={clearSelected}
                size={EComponentSize.MD}
                label="Выберите опцию"
            />,
        );

        const chip = screen.getByRole("button");
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveTextContent("Выберите опцию");
    });

    test("renders selected value when value is provided", () => {
        const clearSelected = () => {};
        const onChange = () => {};
        const value = options[0];

        render(
            <ChipSelect
                options={options}
                onChange={onChange}
                clearSelected={clearSelected}
                size={EComponentSize.MD}
                value={value}
            />,
        );

        const chip = screen.getByText(String(value.label));
        expect(chip).toBeInTheDocument();
    });

    test("renders displayedValue instead of value label when provided", () => {
        const clearSelected = () => {};
        const onChange = () => {};
        const value = options[0];

        render(
            <ChipSelect
                options={options}
                onChange={onChange}
                clearSelected={clearSelected}
                size={EComponentSize.MD}
                value={value}
                displayedValue="Custom Display"
            />,
        );

        const chip = screen.getByText("Custom Display");
        expect(chip).toBeInTheDocument();
    });

    test("ignores displayedValue until an option is selected", () => {
        render(
            <ChipSelect
                options={options}
                onChange={() => {}}
                clearSelected={() => {}}
                size={EComponentSize.MD}
                label="Выберите опцию"
                displayedValue="Custom Display"
            />,
        );

        expect(screen.getByRole("button")).toHaveTextContent("Выберите опцию");
        expect(screen.queryByText("Custom Display")).not.toBeInTheDocument();
    });

    test.each([0, ""])("preserves displayedValue=%j for a selected option", (displayedValue) => {
        render(
            <ChipSelect
                options={options}
                onChange={() => {}}
                clearSelected={() => {}}
                size={EComponentSize.MD}
                value={options[0]}
                displayedValue={displayedValue}
                data-testid="select"
            />,
        );

        expect(screen.getByTestId("select").textContent).toBe(String(displayedValue));
        expect(screen.queryByText(String(options[0].label))).not.toBeInTheDocument();
    });

    test("forwards ref, className and HTML attributes to the outer div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <ChipSelect
                options={options}
                onChange={() => {}}
                clearSelected={() => {}}
                size={EComponentSize.MD}
                label="Выберите опцию"
                ref={ref}
                className="custom-class"
                data-testid="select"
                aria-describedby="description"
            />,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("select"));
        expect(ref.current).toHaveClass("chipGroupItem", "custom-class");
        expect(ref.current).toHaveAttribute("aria-describedby", "description");
        expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
    });

    test.each([
        [EChipType.TYPE_1, "type1"],
        [EChipType.TYPE_2, "type2"],
    ])("passes type %s to the chip target", (type, expectedClass) => {
        render(
            <ChipSelect
                options={options}
                onChange={() => {}}
                clearSelected={() => {}}
                size={EComponentSize.MD}
                type={type}
                label="Выберите опцию"
            />,
        );

        expect(screen.getByRole("button")).toHaveClass(expectedClass);
    });

    test.each(Object.values(EComponentSize))("passes size %s to the chip target", (size) => {
        render(
            <ChipSelect
                options={options}
                onChange={() => {}}
                clearSelected={() => {}}
                size={size}
                label="Выберите опцию"
            />,
        );

        expect(screen.getByRole("button")).toHaveClass(size);
    });

    test("passes disabled styling and tab order to the chip target", () => {
        render(
            <ChipSelect
                options={options}
                onChange={() => {}}
                clearSelected={() => {}}
                size={EComponentSize.MD}
                label="Выберите опцию"
                disabled
            />,
        );

        expect(screen.getByRole("button")).toHaveClass("disabled");
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
    });

    test("clears the controlled selection without calling onChange or opening the list", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const clearSelected = vi.fn();
        const onOpen = vi.fn();
        const { rerender } = render(
            <ChipSelect
                options={options}
                value={options[0]}
                onChange={onChange}
                clearSelected={clearSelected}
                size={EComponentSize.MD}
                label="Выберите опцию"
                onOpen={onOpen}
            />,
        );

        // У вложенной кнопки сброса пока нет доступного имени (TRI-139).
        await user.click(screen.getByRole("button", { name: "" }));

        expect(clearSelected).toHaveBeenCalledExactlyOnceWith();
        expect(onChange).not.toHaveBeenCalled();
        expect(onOpen).not.toHaveBeenCalled();
        expect(screen.getByRole("button", { name: "Первая опция" })).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByText("Первая опция")).toBeInTheDocument();

        rerender(
            <ChipSelect
                options={options}
                onChange={onChange}
                clearSelected={clearSelected}
                size={EComponentSize.MD}
                label="Выберите опцию"
            />,
        );

        expect(screen.getByRole("button")).toHaveTextContent("Выберите опцию");
        expect(screen.getByRole("button")).not.toHaveClass("selected");
    });

    test("calls onChange with the option object and closes the list after selection", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onOpen = vi.fn();
        const onClose = vi.fn();
        render(
            <ChipSelect
                options={options}
                onChange={onChange}
                clearSelected={() => {}}
                size={EComponentSize.MD}
                label="Выберите опцию"
                onOpen={onOpen}
                onClose={onClose}
            />,
        );

        expect(onOpen).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Выберите опцию" }));
        await user.click(await screen.findByRole("option", { name: "Вторая опция" }));

        expect(onChange).toHaveBeenCalledExactlyOnceWith(options[1]);
        expect(onOpen).toHaveBeenCalledExactlyOnceWith();
        expect(onClose).toHaveBeenCalledExactlyOnceWith();
        expect(screen.getByRole("button", { name: "Выберите опцию" })).toHaveAttribute("aria-expanded", "false");
    });

    test.each(["Enter", "Space"])("opens on %s and closes on Tab from the target", (code) => {
        render(
            <ChipSelect
                options={options}
                onChange={() => {}}
                clearSelected={() => {}}
                size={EComponentSize.MD}
                label="Выберите опцию"
            />,
        );
        const chip = screen.getByRole("button", { name: "Выберите опцию" });

        fireEvent.keyDown(chip, { code });
        expect(chip).toHaveAttribute("aria-expanded", "true");

        fireEvent.keyDown(chip, { code: "Tab" });
        expect(chip).toHaveAttribute("aria-expanded", "false");
    });
});
