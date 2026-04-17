import React, { useState } from "react";
import { ChipSelect, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const demoOptions: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" },
    { id: "2", value: "option2", label: "Вторая опция" },
    { id: "3", value: "option3", label: "Третья опция" },
    { id: "4", value: "option4", label: "Четвертая опция" },
    { id: "5", value: "option5", label: "Пятая опция" },
    { id: "6", value: "option6", label: "Шестая опция" },
];

export const DefaultExample = () => {
    const [selected, setSelected] = useState<ISelectFieldOption | undefined>();
    return (
        <ChipSelect
            label="Select label"
            size={EComponentSize.MD}
            options={demoOptions}
            value={selected}
            onChange={setSelected}
            clearSelected={() => setSelected(undefined)}
        />
    );
};
