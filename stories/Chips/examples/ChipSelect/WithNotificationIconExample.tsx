import React, { useState } from "react";
import { ChipSelect, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const options: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" },
    { id: "2", value: "option2", label: "Вторая опция", showNotificationIcon: true },
    { id: "3", value: "option3", label: "Третья опция" },
    { id: "4", value: "option4", label: "Четвертая опция" },
];

export const WithNotificationIconExample = () => {
    const [selected, setSelected] = useState<ISelectFieldOption | undefined>();

    return (
        <ChipSelect
            size={EComponentSize.MD}
            label="Select label"
            options={options}
            value={selected}
            onChange={setSelected}
            clearSelected={() => setSelected(undefined)}
        />
    );
};
