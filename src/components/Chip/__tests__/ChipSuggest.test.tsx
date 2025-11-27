import { render, screen } from "@testing-library/react";
import { ChipSuggest } from "@sberbusiness/triplex-next/components/Chip/ChipSuggest/ChipSuggest";
import { ISuggestOption } from "@sberbusiness/triplex-next/components/Suggest/types";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("ChipSuggest", () => {
    const options: ISuggestOption[] = [
        { id: "1", label: "Первая опция" },
        { id: "2", label: "Вторая опция" },
    ];

    test("renders label and role button when value not selected", () => {
        render(
            <ChipSuggest
                value={undefined}
                options={options}
                size={EComponentSize.MD}
                onSelect={() => {}}
                onFilter={() => {}}
                label="Выберите опцию"
                targetProps={{ clearSelected: () => {}, "data-testid": "chip-suggest" }}
            />,
        );

        const chip = screen.getByTestId("chip-suggest");
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveTextContent("Выберите опцию");
    });

    test("renders selected value when value is provided", () => {
        render(
            <ChipSuggest
                value={options[0]}
                options={options}
                size={EComponentSize.MD}
                onSelect={() => {}}
                onFilter={() => {}}
                label="Выберите опцию"
                targetProps={{ clearSelected: () => {}, "data-testid": "chip-suggest" }}
            />,
        );

        const chip = screen.getByTestId("chip-suggest");
        expect(chip).toHaveTextContent(options[0].label);
    });

    test("renders displayedValue instead of value label when provided", () => {
        render(
            <ChipSuggest
                value={options[0]}
                displayedValue="Custom Display"
                options={options}
                size={EComponentSize.MD}
                onSelect={() => {}}
                onFilter={() => {}}
                label="Выберите опцию"
                targetProps={{ clearSelected: () => {}, "data-testid": "chip-suggest" }}
            />,
        );

        const chip = screen.getByTestId("chip-suggest");
        expect(chip).toHaveTextContent("Custom Display");
    });
});
