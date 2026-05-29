import React, { useState } from "react";
import { ChipSelect, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const options: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" },
    { id: "2", value: "option2", label: "Вторая опция" },
    { id: "3", value: "option3", label: "Третья опция" },
    { id: "4", value: "option4", label: "Четвертая опция" },
    { id: "5", value: "option5", label: "Пятая опция" },
    { id: "6", value: "option6", label: "Шестая опция" },
];

export interface PlaygroundArgs extends Pick<
    React.ComponentProps<typeof ChipSelect>,
    "type" | "size" | "label" | "displayedValue" | "disabled"
> {}

export const PlaygroundExample = (args: PlaygroundArgs) => {
    const [selectedOption, setSelectedOption] = useState<ISelectFieldOption | undefined>(undefined);

    return (
        <ChipSelect
            {...args}
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            clearSelected={() => setSelectedOption(undefined)}
        />
    );
};
