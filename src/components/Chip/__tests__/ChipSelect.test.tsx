import { render, screen } from "@testing-library/react";
import { ChipSelect } from "@sberbusiness/triplex-next/components/Chip/ChipSelect";
import { ISelectFieldOption } from "@sberbusiness/triplex-next/components/SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("ChipSelect", () => {
    const options: ISelectFieldOption[] = [
        { id: "1", value: "option1", label: "Первая опция" },
        { id: "2", value: "option2", label: "Вторая опция" },
    ];

    test("renders label and role combobox when value not selected", () => {
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

        const chip = screen.getByRole("combobox");
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

        const chip = screen.getByRole("combobox");
        expect(chip).toHaveTextContent(String(value.label));
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

        const chip = screen.getByRole("combobox");
        expect(chip).toHaveTextContent("Custom Display");
    });
});
