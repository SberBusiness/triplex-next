import React, { useState } from "react";
import { ChipDatePicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => {
    const [smSelected, setSmSelected] = useState("20260101");
    const [mdSelected, setMdSelected] = useState("20260101");
    const [lgSelected, setLgSelected] = useState("20260101");

    const [mdUnselected, setMdUnselected] = useState("");

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", maxWidth: 600, alignItems: "flex-start", justifyContent: "space-between" }}>
                <ChipDatePicker
                    value={smSelected}
                    label="Date label"
                    onChange={setSmSelected}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.SM}
                    status="default"
                />
                <ChipDatePicker
                    value={mdSelected}
                    label="Date label"
                    onChange={setMdSelected}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.MD}
                    status="default"
                />
                <ChipDatePicker
                    value={lgSelected}
                    label="Date label"
                    onChange={setLgSelected}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.LG}
                    status="default"
                />
            </div>
            <div style={{ display: "flex", maxWidth: 600, alignItems: "flex-start", justifyContent: "space-between" }}>
                <ChipDatePicker
                    pickedDate={"20260101"}
                    value={mdUnselected}
                    label="Date label"
                    onChange={setMdUnselected}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.MD}
                    status="default"
                />
            </div>
        </div>
    );
};
