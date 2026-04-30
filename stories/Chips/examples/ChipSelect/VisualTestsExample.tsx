import React, { useState } from "react";
import { ChipSelect, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const options: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" },
    { id: "2", value: "option2", label: "Вторая опция", showNotificationIcon: true },
    { id: "3", value: "option3", label: "Третья опция" },
    { id: "4", value: "option4", label: "Четвертая опция" },
];

export const VisualTestsExample = () => {
    const [selectedSM, setSelectedSM] = useState<ISelectFieldOption | undefined>(options[0]);
    const [selectedMD, setSelectedMD] = useState<ISelectFieldOption | undefined>(options[0]);
    const [selectedLG, setSelectedLG] = useState<ISelectFieldOption | undefined>(options[0]);

    const [unselectedMD, setUnselectedMD] = useState<ISelectFieldOption | undefined>();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", maxWidth: 600, alignItems: "flex-start", justifyContent: "space-between" }}>
                <ChipSelect
                    options={options}
                    value={selectedSM}
                    onChange={setSelectedSM}
                    clearSelected={() => setSelectedSM(undefined)}
                    size={EComponentSize.SM}
                    label="Select label"
                />
                <ChipSelect
                    options={options}
                    value={selectedMD}
                    onChange={setSelectedMD}
                    clearSelected={() => setSelectedMD(undefined)}
                    size={EComponentSize.MD}
                    label="Select label"
                />
                <ChipSelect
                    options={options}
                    value={selectedLG}
                    onChange={setSelectedLG}
                    clearSelected={() => setSelectedLG(undefined)}
                    size={EComponentSize.LG}
                    label="Select label"
                />
            </div>
            <ChipSelect
                size={EComponentSize.MD}
                label="Select label"
                options={options}
                value={unselectedMD}
                onChange={setUnselectedMD}
                clearSelected={() => setUnselectedMD(undefined)}
            />
        </div>
    );
};
