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

export const SizesExample = () => {
    const [selectedSM, setSelectedSM] = useState<ISelectFieldOption | undefined>();
    const [selectedMD, setSelectedMD] = useState<ISelectFieldOption | undefined>();
    const [selectedLG, setSelectedLG] = useState<ISelectFieldOption | undefined>();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipSelect
                    options={demoOptions}
                    value={selectedSM}
                    onChange={setSelectedSM}
                    clearSelected={() => setSelectedSM(undefined)}
                    size={EComponentSize.SM}
                    label="Select label"
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipSelect
                    options={demoOptions}
                    value={selectedMD}
                    onChange={setSelectedMD}
                    clearSelected={() => setSelectedMD(undefined)}
                    size={EComponentSize.MD}
                    label="Select label"
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipSelect
                    options={demoOptions}
                    value={selectedLG}
                    onChange={setSelectedLG}
                    clearSelected={() => setSelectedLG(undefined)}
                    size={EComponentSize.LG}
                    label="Select label"
                />
            </div>
        </div>
    );
};
