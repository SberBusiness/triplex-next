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

export const StatesExample = () => {
    const [selectedWithValue, setSelectedWithValue] = useState<ISelectFieldOption | undefined>(demoOptions[0]);
    const [selectedDisabled, setSelectedDisabled] = useState<ISelectFieldOption | undefined>(demoOptions[1]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Selected</div>
                <ChipSelect
                    label="Select label"
                    options={demoOptions}
                    value={selectedWithValue}
                    onChange={setSelectedWithValue}
                    clearSelected={() => setSelectedWithValue(undefined)}
                    size={EComponentSize.MD}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
                <ChipSelect
                    label="Select label"
                    options={demoOptions}
                    value={selectedDisabled}
                    onChange={setSelectedDisabled}
                    clearSelected={() => setSelectedDisabled(undefined)}
                    disabled
                    size={EComponentSize.MD}
                />
            </div>
        </div>
    );
};
