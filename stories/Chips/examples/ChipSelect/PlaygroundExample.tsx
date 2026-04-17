import React, { useState } from "react";
import { ChipSelect, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const demoOptions: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" },
    { id: "2", value: "option2", label: "Вторая опция" },
    { id: "3", value: "option3", label: "Третья опция" },
    { id: "4", value: "option4", label: "Четвертая опция" },
    { id: "5", value: "option5", label: "Пятая опция" },
    { id: "6", value: "option6", label: "Шестая опция" },
];

interface IChipSelectPlaygroundProps extends Omit<
    React.ComponentProps<typeof ChipSelect>,
    "onChange" | "clearSelected" | "value" | "options"
> {
    selectedValueId?: string;
}

export const PlaygroundExample = (args: IChipSelectPlaygroundProps) => {
    const [selectedOption, setSelectedOption] = useState<ISelectFieldOption | undefined>(
        args.selectedValueId ? demoOptions.find((opt) => opt.id === args.selectedValueId) : undefined,
    );

    return (
        <ChipSelect
            {...args}
            displayedValue={args.displayedValue || undefined}
            options={demoOptions}
            value={selectedOption}
            onChange={setSelectedOption}
            clearSelected={() => setSelectedOption(undefined)}
        />
    );
};
