import React, { useState } from "react";
import { ChipDatePicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");
    return (
        <ChipDatePicker
            value={value}
            label="Date label"
            onChange={setValue}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.MD}
            status="default"
        />
    );
};
