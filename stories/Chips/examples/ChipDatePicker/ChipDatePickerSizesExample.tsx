import React, { useState } from "react";
import { ChipDatePicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const ChipDatePickerSizesExample = () => {
    const [sm, setSm] = useState("");
    const [md, setMd] = useState("");
    const [lg, setLg] = useState("");
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipDatePicker
                    value={sm}
                    label="Date label"
                    onChange={setSm}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.SM}
                    status="default"
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipDatePicker
                    value={md}
                    label="Date label"
                    onChange={setMd}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.MD}
                    status="default"
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipDatePicker
                    value={lg}
                    label="Date label"
                    onChange={setLg}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.LG}
                    status="default"
                />
            </div>
        </div>
    );
};
