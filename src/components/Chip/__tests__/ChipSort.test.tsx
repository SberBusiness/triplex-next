import { render, screen } from "@testing-library/react";
import { ChipSort } from "@sberbusiness/triplex-next/components/Chip/ChipSort";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("ChipSort", () => {
    const options = [
        { id: "chip-sort-1", label: "По дате", value: "i1" },
        { id: "chip-sort-2", label: "По времени", value: "i2" },
        { id: "chip-sort-3", label: "По названию", value: "i3" },
    ];

    const handleChange = vi.fn();

    test("Should render with default props", () => {
        render(<ChipSort options={options} size={EComponentSize.MD} onChange={handleChange} data-testid="chip-sort" />);

        const chipSort = screen.getByTestId("chip-sort");
        expect(chipSort).toBeInTheDocument();
        expect(chipSort).toHaveClass("chipGroupItem");
    });
});
